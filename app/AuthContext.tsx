'use client'

import { getCurrentUserInfo } from 'api/anilist'
import { UserInfo } from 'api/anilist/types'
import { useRouter } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type AuthInfo = {
  user: UserInfo
  token: string
  tokenExpires: number
}

export type AuthContextProps = {
  state: AuthInfo | null
  isLoggedIn: () => boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps>(null!)

const currentTimestamp = () => Math.round(Date.now() / 1000)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthInfo | null>(null)

  const router = useRouter()

  function loadSessionFromLocalStorage() {
    const lsItem = localStorage.getItem('authState')
    if (lsItem) {
      const previousState: AuthInfo = JSON.parse(lsItem)

      if (previousState.tokenExpires > currentTimestamp() + 60) {
        setState(previousState)
      }
    }
  }

  function tryLoginFromUrlHash() {
    if (location.hash.length > 0) {
      const params = new URLSearchParams(location.hash.substring(1))

      const token = params.get('access_token')
      if (token) {
        const tokenExpires =
          currentTimestamp() + Number(params.get('expires_in'))

        getCurrentUserInfo(token)
          .then((user) => {
            const loggedInState: AuthInfo = {
              token,
              tokenExpires,
              user,
            }

            setState(loggedInState)
            localStorage.setItem('authState', JSON.stringify(loggedInState))
            router.push('')
          })
          .catch(() =>
            console.log(
              "There was an error while trying to get the user's info"
            )
          )
      }
    }
  }

  useEffect(() => {
    loadSessionFromLocalStorage()
    tryLoginFromUrlHash()
  }, [])

  function isLoggedIn() {
    return !!state?.user
  }

  function login() {
    window.location.href = `https://anilist.co/api/v2/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID}&response_type=token`
  }

  function logout() {
    setState(null)
    localStorage.removeItem('authState')
  }

  return (
    <AuthContext.Provider value={{ state, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) throw Error("Don't use AuthContext outside of AuthProvider")
}

export { AuthContext, AuthProvider }

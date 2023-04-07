'use client'

import { AuthContext } from './AuthContext'
import Link from 'next/link'
import { useContext } from 'react'
import Avatar from './base-ui/Avatar'

export default function Navbar() {
  const { isLoggedIn, state, login, logout } = useContext(AuthContext)

  function onAvatarClick() {
    if (!isLoggedIn()) {
      login()
    } else {
      logout()
    }
  }

  return (
    <div className="select-none bg-bgSecondary px-5 py-3 text-textPrimary">
      <div className="grid grid-cols-3 items-center">
        <div className="mr-auto text-xl">Anime Apps</div>

        <div className="mx-auto flex gap-5">
          <Link href="/voice-actors">
            <span className="hover:text-primary">Voice Actors</span>
          </Link>
          <Link href="/date-fixer">
            <span className="hover:text-primary">Dates Fix</span>
          </Link>
        </div>

        <div className="ml-auto cursor-pointer">
          <Avatar
            faded={!isLoggedIn}
            imageUrl={state?.user.avatar.medium}
            onClick={onAvatarClick}
          />
        </div>
      </div>
    </div>
  )
}

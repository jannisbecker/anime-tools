'use client'

import { AuthContext } from './AuthContext'
import Link from 'next/link'
import { useContext } from 'react'
import Avatar from './base-ui/Avatar'

export default function Navbar() {
  const { loggedIn, userInfo, login, logout } = useContext(AuthContext)

  function onAvatarClick() {
    if (!loggedIn) {
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
          <Link href="/">
            <span className="hover:text-primary">Seiyuu Lookup</span>
          </Link>
          <Link href="/date-fixer">
            <span className="hover:text-primary">Date Fixer</span>
          </Link>
        </div>

        <div className="ml-auto cursor-pointer">
          <Avatar
            faded={!loggedIn}
            imageUrl={userInfo?.avatar.medium}
            onClick={onAvatarClick}
          />
        </div>
      </div>
    </div>
  )
}

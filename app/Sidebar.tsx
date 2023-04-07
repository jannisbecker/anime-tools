'use client'

import { AuthContext } from './AuthContext'
import Link from 'next/link'
import { useContext } from 'react'
import Avatar from './base-ui/Avatar'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
  const { isLoggedIn, state, login, logout } = useContext(AuthContext)

  function onAvatarClick() {
    if (!isLoggedIn()) {
      login()
    } else {
      logout()
    }
  }

  return (
    <div className="text-textPrimary select-none bg-slate-100 p-4 dark:bg-slate-800">
      <div className="mr-auto text-xl">Anime Apps</div>

      <div className="cursor-pointer">
        <Avatar
          faded={!isLoggedIn}
          imageUrl={state?.user.avatar.medium}
          onClick={onAvatarClick}
        />
      </div>

      <div className="flex flex-col gap-5">
        <SidebarItem title="Voice Actors" url="/voice-actors" />
        <SidebarItem title="Dates Fix" url="/date-fixer" />
      </div>
    </div>
  )
}

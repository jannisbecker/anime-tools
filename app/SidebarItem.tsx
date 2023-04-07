import Link from 'next/link'

type SidebarItemProps = {
  title: string
  url: string
}

export default function SidebarItem({ title, url }: SidebarItemProps) {
  return (
    <Link href={url}>
      <div className="bg-slate-800 p-4 hover:drop-shadow-sm">{title}</div>
    </Link>
  )
}

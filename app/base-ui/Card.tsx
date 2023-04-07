type Props = { children?: React.ReactNode }

export default function Card({ children }: Props) {
  return (
    <div className="rounded bg-slate-100 p-4 dark:bg-slate-800">{children}</div>
  )
}

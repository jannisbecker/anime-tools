type Props = {
  label: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, ...props }: Props) {
  return (
    <button
      className="rounded bg-blue-500 px-6 py-2 text-slate-50 disabled:bg-blue-200"
      {...props}
    >
      {label}
    </button>
  )
}

import classes from 'utils/classes'

export default function TextInput({ fullWidth = false, ...props }) {
  const styles: React.CSSProperties = {
    ...(fullWidth && {
      width: '100%',
    }),
  }

  return (
    <input
      className={classes(
        'text-textPrimary placeholder:text-textSecondary rounded bg-white px-2 py-2 outline-none dark:bg-slate-800',
        fullWidth && 'w-full'
      )}
      style={styles}
      {...props}
    />
  )
}

type Status = 'error' | 'warning' | 'success' | 'info'

type Props = {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
  type?: 'text' | 'email' | 'password'
  status?: Status
}

const borderStyles: Record<Status, string> = {
  error: 'border-red-400 focus:ring-red-400',
  warning: 'border-yellow-400 focus:ring-yellow-400',
  success: 'border-green-400 focus:ring-green-400',
  info: 'border-blue-400 focus:ring-blue-400',
}

export const Input = ({
  placeholder,
  value,
  onChange,
  required = false,
  type = 'text',
  status,
}: Props) => {
  const borderStyle = status ? borderStyles[status] : 'border-brand-100 focus:ring-brand-500'

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={`w-full px-4 py-2 border my-4 text-brand-900 placeholder:text-brand-500 focus:outline-none focus:ring-2 ${borderStyle}`}
    />
  )
}

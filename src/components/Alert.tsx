type AlertType = 'error' | 'success' | 'info' | 'warning'

type Props = {
  type: AlertType
  message: string
}

const styles: Record<AlertType, string> = {
  error: 'bg-red-50 text-red-800 border border-red-200',
  success: 'bg-green-50 text-green-800 border border-green-200',
  info: 'bg-blue-50 text-blue-800 border border-blue-200',
  warning: 'bg-yellow-50 text-yellow-800 border border-yellow-200'
}

export const Alert = ({ type, message }: Props) => {
  if (!message) return null

  return (
    <div className={`${styles[type]} px-4 py-3 rounded-xl text-body`}>
      {message}
    </div>
  )
}

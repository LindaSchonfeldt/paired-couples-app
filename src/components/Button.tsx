type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  onPress?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const sizes: Record<Size, string> = {
  sm: 'px-2 py-1 text-caption',
  md: 'px-4 py-2 text-body',
  lg: 'px-8 py-4 text-title'
}

const styles: Record<Variant, string> = {
  primary: 'bg-brand-900 text-white px-4 py-2 rounded-2xl',
  secondary: 'bg-brand-100 text-brand-900 px-4 py-2 rounded-2xl',
  ghost: 'text-brand-500 px-4 py-2',
  danger: 'bg-red-500 text-white px-4 py-2 rounded-2xl'
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
  type = 'button',
  disabled = false
}: Props) => {
  return (
    <button
      type={type}
      onClick={onPress}
      disabled={disabled}
      className={`${styles[variant]} ${sizes[size]} disabled:bg-gray-200 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

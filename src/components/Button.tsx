type Variant = 'primary' | 'secondary' | 'ghost'

type Props = {
  variant?: Variant
  children: React.ReactNode
  onPress?: () => void
  type?: 'button' | 'submit'
}

const styles: Record<Variant, string> = {
  primary: 'bg-brand-900 text-white px-4 py-2 rounded-2xl font-small',
  secondary: 'bg-brand-100 text-brand-900 px-4 py-2 rounded-2xl font-medium',
  ghost: 'text-brand-500 px-4 py-2 font-medium'
}

export const Button = ({
  variant = 'primary',
  children,
  onPress,
  type = 'button'
}: Props) => {
  return (
    <button type={type} onClick={onPress} className={styles[variant]}>
      {children}
    </button>
  )
}

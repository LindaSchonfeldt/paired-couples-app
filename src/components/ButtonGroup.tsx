type Props = {
  direction?: 'row' | 'column'
  children: React.ReactNode
}

export const ButtonGroup = ({ direction = 'row', children }: Props) => {
  const styles =
    direction === 'row' ? 'flex flex-row gap-3' : 'flex flex-col gap-3'

  return <div className={styles}>{children}</div>
}

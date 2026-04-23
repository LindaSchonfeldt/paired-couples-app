type Props = {
  title: string
  children: React.ReactNode
}

export const PageLayout = ({ title, children }: Props) => {
  return (
    <div className='flex flex-col flex-1 px-6 py-8 max-w-2xl mx-auto w-full gap-2'>
      <h1 className='text-2xl font-semibold mb-6'>{title}</h1>
      {children}
    </div>
  )
}

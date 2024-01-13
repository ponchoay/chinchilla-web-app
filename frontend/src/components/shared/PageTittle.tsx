type Props = {
  pageTitle: string
}

export const PageTitle = ({ pageTitle }: Props) => {
  return (
    <h1 className="text-center text-xl font-bold tracking-widest text-dark-blue sm:text-2xl">
      {pageTitle}
    </h1>
  )
}

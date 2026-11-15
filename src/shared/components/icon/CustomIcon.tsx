interface CustomIconProps {
  icone?: React.ReactNode
}

export function CustomIcon({ icone }: CustomIconProps) {
  return (
    <div className="flex max-w-fit items-center justify-center rounded-lg bg-linear-to-br from-primary from-45% to-secondary p-4">
      {icone}
    </div>
  )
}

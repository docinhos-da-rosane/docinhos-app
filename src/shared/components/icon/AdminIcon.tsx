import { UserRound } from "lucide-react"

interface AdminIconProps {
  size?: number
}

export function AdminIcon({ size = 26 }: AdminIconProps) {
  return (
    <div className="flex max-w-fit items-center justify-center rounded-lg bg-linear-to-br from-primary from-45% to-secondary p-4">
      <UserRound size={size} color="white" />
    </div>
  )
}

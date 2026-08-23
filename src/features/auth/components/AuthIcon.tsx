import { UserRound } from "lucide-react"

export function AuthIcon() {
  return (
    <div className="flex max-w-fit items-center justify-center rounded-lg bg-linear-to-br from-primary from-45% to-secondary p-4">
      <UserRound size={26} color="white" />
    </div>
  )
}

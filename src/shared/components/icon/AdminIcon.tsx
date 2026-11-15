import { UserRound } from "lucide-react"
import { CustomIcon } from "./CustomIcon"

export function AdminIcon({ size = 26 }: { size?: number }) {
  return <CustomIcon icone={<UserRound size={size} color="white" />} />
}

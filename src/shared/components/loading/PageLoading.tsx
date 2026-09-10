import { LoaderCircle } from "lucide-react"

export function PageLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-md">
      <LoaderCircle
        className="size-40 animate-spin text-primary lg:size-25"
        aria-hidden="true"
      />
    </div>
  )
}

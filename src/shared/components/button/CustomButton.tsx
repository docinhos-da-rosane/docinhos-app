import { cn } from "@/shared/lib/utils"
import { LoaderCircle } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type CustomButtonVariant =
  "primary" | "secondary" | "info" | "danger" | "outline-secondary"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomButtonVariant
  icone?: ReactNode
  loading?: boolean
}

const variants: Record<CustomButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  info: "bg-info text-white hover:bg-info/90",
  danger: "bg-danger text-white hover:bg-danger/90",
  "outline-secondary":
    "border border-secondary bg-transparent text-secondary hover:border-secondary/80 hover:text-secondary/80",
}

export function CustomButton({
  variant = "primary",
  type = "button",
  icone,
  loading = false,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={props.disabled || loading}
      className={cn(
        "disabled:pointer-events-nonedisabled:cursor-not-allowed flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl p-4 text-lg font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
    >
      {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : icone}
      {children}
    </button>
  )
}

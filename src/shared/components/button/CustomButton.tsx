import { cn } from "@/shared/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type CustomButtonVariant = "primary" | "secondary" | "info" | "danger"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomButtonVariant
  icone?: ReactNode
}

const variants: Record<CustomButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary/90",
  secondary: "bg-secondary text-white hover:bg-secondary/90",
  info: "bg-info text-white hover:bg-info/90",
  danger: "bg-danger text-white hover:bg-danger/90",
}

export function CustomButton({
  variant = "primary",
  type = "button",
  icone,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-4xl p-4 text-lg font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {icone}
      {children}
    </button>
  )
}

import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  Loader2Icon,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      {...props}
      className="toaster group"
      icons={{
        success: <CheckCircle className="h-5 w-5" />,
        error: <AlertCircle className="h-5 w-5" />,
        warning: <AlertTriangle className="h-5 w-5" />,
        info: <Info className="h-5 w-5" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      expand={true}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center gap-4 py-5 px-6 rounded-lg border-3 bg-card text-text-primary shadow-md",
          success: "border-success bg-success-light text-success",
          error: "border-danger bg-danger-light text-danger",
          warning: "border-warning bg-warning-light text-warning",
          info: "border-info bg-info-light text-info",
          title: "font-semibold",
          description: "text-text-secondary",
        },
      }}
    />
  )
}

export { Toaster }

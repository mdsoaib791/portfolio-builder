import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-accent hover:text-accent-foreground rounded-full",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 rounded-full",
        outline:
          "border-1-primary bg-foreground-background shadow-sm hover:bg-accent hover:text-accent-foreground rounded-full",
        secondary:
          "bg-accent text-accent-foreground shadow-sm hover:bg-primary hover:text-primary-foreground rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-full",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-8 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  hoverIcon?: React.ReactNode
  hoverBehavior?: "replace" | "append"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      startIcon,
      endIcon,
      hoverIcon,
      hoverBehavior = "append",
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          "relative", // for absolute hover icon positioning
          buttonVariants({ variant, size, fullWidth }),
          className
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Spinner if loading */}
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}

        {/* Start icon (if not loading) */}
        {!loading && startIcon && (
          <span className="mr-2 flex items-center">{startIcon}</span>
        )}

        {/* Replace Mode */}
        {!loading && hoverIcon && hoverBehavior === "replace" ? (
          <>
            <span className="transition-all duration-200 ease-in-out group-hover:opacity-0 group-hover:scale-95">
              {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
              {hoverIcon}
            </span>
          </>
        ) : (
          <>
            {/* Regular content */}
            <span className="flex items-center">
              {children}
              {/* Append Mode */}
              {hoverIcon && hoverBehavior === "append" && (
                <span className="ml-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out">
                  {hoverIcon}
                </span>
              )}
            </span>
          </>
        )}

        {/* End icon (if not loading) */}
        {!loading && endIcon && (
          <span className="ml-2 flex items-center">{endIcon}</span>
        )}
      </Comp>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }


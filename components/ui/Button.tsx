'use client'

import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brass' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'brass', size = 'md', icon, children, ...props }, ref) => {
    const base =
      'inline-flex items-center gap-2 font-heading uppercase tracking-widest rounded-full transition-all duration-200 cursor-pointer select-none'

    const variants = {
      brass:
        'bg-[var(--brass)] text-black hover:bg-[var(--brass-light)] hover:scale-[1.03] active:scale-100',
      outline:
        'border border-[var(--card-border)] text-[var(--text-primary)] hover:border-[var(--brass)] hover:text-[var(--brass-light)]',
      ghost: 'text-[var(--brass)] hover:text-[var(--brass-light)]',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs',
      md: 'px-7 py-3 text-sm',
      lg: 'px-9 py-4 text-base',
    }

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
        {icon && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full border border-current transition-transform duration-300 group-hover:rotate-45">
            {icon}
          </span>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

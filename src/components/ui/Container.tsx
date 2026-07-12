import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeStyles = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
} as const

export function Container({
  children,
  className,
  size = 'lg',
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

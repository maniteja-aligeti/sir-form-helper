import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'
import { cn } from '@/utils/cn'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-surface-200 bg-white/80 backdrop-blur-md safe-area-top',
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
            <FileText className="size-5" aria-hidden="true" />
          </div>
          <span className="text-base font-semibold text-surface-900 sm:text-lg">
            {APP_NAME}
          </span>
        </Link>
      </div>
    </header>
  )
}

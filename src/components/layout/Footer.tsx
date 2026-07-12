import { getAppVersion } from '@/services/appService'
import { APP_NAME } from '@/utils/constants'
import { cn } from '@/utils/cn'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'mt-auto border-t border-surface-200 bg-white safe-area-bottom',
        className,
      )}
    >
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-xs text-surface-500 sm:text-sm">
          &copy; {year} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-xs text-surface-400">v{getAppVersion()}</p>
      </div>
    </footer>
  )
}

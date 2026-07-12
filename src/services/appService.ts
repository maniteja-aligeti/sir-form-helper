import type { AppMetadata } from '@/types'
import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME } from '@/utils/constants'

export const appMetadata: AppMetadata = {
  name: APP_NAME,
  shortName: APP_SHORT_NAME,
  description: APP_DESCRIPTION,
  version: '0.1.0',
}

export function getAppVersion(): string {
  return appMetadata.version
}

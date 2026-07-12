export type NavItem = {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

export type FeatureItem = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export type AppMetadata = {
  name: string
  shortName: string
  description: string
  version: string
}

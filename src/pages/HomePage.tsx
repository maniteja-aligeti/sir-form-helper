import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import {
  FileSearch,
  Shield,
  Smartphone,
  Upload,
  Zap,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { APP_DESCRIPTION, APP_NAME, ROUTES } from '@/utils/constants'
import type { FeatureItem } from '@/types'

const features: FeatureItem[] = [
  {
    title: 'Upload Documents',
    description:
      'Drag and drop your SIR forms for quick, seamless processing.',
    icon: Upload,
  },
  {
    title: 'Smart Extraction',
    description:
      'Automated field detection to reduce manual data entry.',
    icon: FileSearch,
  },
  {
    title: 'Mobile Ready',
    description:
      'Works offline as a PWA — capture forms anywhere, anytime.',
    icon: Smartphone,
  },
  {
    title: 'Fast Processing',
    description:
      'Optimized pipeline designed for speed and accuracy.',
    icon: Zap,
  },
  {
    title: 'Secure & Private',
    description:
      'Your documents stay on-device until you choose to export.',
    icon: Shield,
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' as const },
  }),
}

export function HomePage() {
  return (
    <div className="pb-12 pt-8 sm:pb-16 sm:pt-12">
      <Container>
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 ring-1 ring-primary-200">
            Progressive Web App
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl lg:text-5xl">
            {APP_NAME}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-surface-600 sm:text-lg">
            {APP_DESCRIPTION}
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link to={ROUTES.FORM6_OCR}>
              <Button size="lg">Get Started</Button>
            </Link>
            <Button variant="outline" size="lg" onClick={() => toast('Learn more coming soon.')}>
              Learn More
            </Button>
          </div>
        </motion.section>

        {/* Features */}
        <section className="mt-16 sm:mt-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-surface-900 sm:text-3xl">
              Built for Efficiency
            </h2>
            <p className="mt-2 text-sm text-surface-500 sm:text-base">
              Everything you need to streamline SIR form workflows.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                >
                  <Card className="h-full transition-shadow hover:shadow-md">
                    <CardHeader className="mb-0">
                      <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-16 sm:mt-20"
        >
          <Card className="bg-primary-600 text-white" padding="lg">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-xl font-bold sm:text-2xl">
                Ready to simplify your workflow?
              </h2>
              <p className="mt-2 text-sm text-primary-100 sm:text-base">
                Install the app on your device for offline access and a native-like experience.
              </p>
              <Link to={ROUTES.FORM6_OCR}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-6 bg-white text-primary-700 hover:bg-primary-50"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </Card>
        </motion.section>
      </Container>
    </div>
  )
}

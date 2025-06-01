import News from '@/features/news'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/news/')({
  component: News,
})

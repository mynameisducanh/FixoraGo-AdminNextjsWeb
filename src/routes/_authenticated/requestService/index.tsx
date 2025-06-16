import RequestService from '@/features/requestService'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/requestService/')({
  component: RequestService,
})

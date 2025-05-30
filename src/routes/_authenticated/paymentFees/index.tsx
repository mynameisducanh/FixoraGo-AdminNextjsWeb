import { createFileRoute } from '@tanstack/react-router'
import PaymentFees from '@/features/paymentFees'

export const Route = createFileRoute('/_authenticated/paymentFees/')({
  component: PaymentFees,
}) 
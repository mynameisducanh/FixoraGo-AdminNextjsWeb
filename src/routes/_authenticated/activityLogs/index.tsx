import { createFileRoute } from '@tanstack/react-router'
import activityLogs from '@/features/activityLogs' 

export const Route = createFileRoute('/_authenticated/activityLogs/')({
  component: activityLogs,
})

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { RequestServiceInterface } from '@/types'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface RequestServiceDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: RequestServiceInterface
}

export function RequestServiceDetailDialog({
  open,
  onOpenChange,
  currentRow,
}: RequestServiceDetailDialogProps) {
  const getStatusBadge = (status: string) => {
    let statusLabel = ''
    let badgeColor = ''

    switch (status) {
      case 'pending':
        statusLabel = 'Pending'
        badgeColor = 'bg-blue-100 text-blue-800'
        break
      case 'completed':
        statusLabel = 'Completed'
        badgeColor = 'bg-green-100 text-green-800'
        break
      case 'cancelled':
        statusLabel = 'Cancelled'
        badgeColor = 'bg-red-100 text-red-800'
        break
      case 'in_progress':
        statusLabel = 'In Progress'
        badgeColor = 'bg-yellow-100 text-yellow-800'
        break
      default:
        statusLabel = status
        badgeColor = 'bg-gray-100 text-gray-800'
    }

    return (
      <Badge variant='outline' className={cn('capitalize', badgeColor)}>
        {statusLabel}
      </Badge>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Request Service Details</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold mb-2'>User Information</h3>
              <p>Username: {currentRow.user.username}</p>
              <p>Full Name: {currentRow.user.fullName}</p>
            </div>
            {currentRow.fixer && (
              <div>
                <h3 className='font-semibold mb-2'>Fixer Information</h3>
                <p>Username: {currentRow.fixer.username}</p>
                <p>Full Name: {currentRow.fixer.fullName}</p>
              </div>
            )}
          </div>

          <div className='border-t pt-4'>
            <h3 className='font-semibold mb-2'>Service Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <p>Service Name: {currentRow.nameService}</p>
                <p>Detail Service: {currentRow.listDetailService}</p>
                <p>Price Service: {currentRow.priceService}</p>
                <p>Equipment Type: {currentRow.typeEquipment}</p>
              </div>
              <div>
                <p>Status: {getStatusBadge(currentRow.status)}</p>
                <p>Calendar: {currentRow.calender}</p>
                <p>Address: {currentRow.address}</p>
                {currentRow.bonus && <p>Bonus: {currentRow.bonus}</p>}
              </div>
            </div>
          </div>

          {currentRow.note && (
            <div className='border-t pt-4'>
              <h3 className='font-semibold mb-2'>Note</h3>
              <p>{currentRow.note}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 
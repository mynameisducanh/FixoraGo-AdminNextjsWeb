import { useEffect, useState } from 'react'
import { ActivityLogInterface, NewsInterface, PaymentFeesInterface } from '@/types'
import ActivityLogApi from '@/api/activityLogApi'
import RevenueManagerApi from '@/api/revenueManagerApi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'


interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: NewsInterface
}

export function ImageDialog({ open, onOpenChange, currentRow }: Props) {
  const [inputValue, setInputValue] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [dataLog, setDataLog] = useState<ActivityLogInterface>()
  const activityLogApi = new ActivityLogApi()
  const revenueManagerApi = new RevenueManagerApi()

  // useEffect(() => {
  //   fetchData()
  // }, [currentRow.activityId])

  // const fetchData = async () => {
  //   try {
  //     const res = await activityLogApi.getById(currentRow.activityId)
  //     if (res) {
  //       setDataLog(res)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // const handleConfirm = async () => {
  //   try {
  //     const payload = {
  //       status: 'active',
  //       amount: inputValue as string,
  //     }
  //     console.log(currentRow.id)
  //     const res = await revenueManagerApi.confirmBill2(
  //       currentRow.id,
  //       payload
  //     )
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   // TODO: Implement confirm logic
  //   console.log('Confirm with value:', inputValue)
  //   setShowConfirm(false)
  //   onOpenChange(false)
  // }
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image</DialogTitle>
            {/* <DialogDescription>
              View and confirm bill details for user {currentRow.user.username}{' '}
              , email {currentRow.user.email}
            </DialogDescription> */}
          </DialogHeader>

          <div className='space-y-4'>
            {/* Image display */}
            <div className='bg-muted aspect-video w-full overflow-hidden rounded-lg'>
              {currentRow?.image ? (
                <img
                  src={currentRow.image}
                  alt='Bill image'
                  className='h-full w-full object-contain'
                />
              ) : (
                <div className='text-muted-foreground flex h-full w-full items-center justify-center'>
                  No Image Available
                </div>
              )}
            </div>

            {/* Input field */}
            {/* <div className='space-y-2'>
              <Label htmlFor='bill-input'>Confirm that the user has paid</Label>
              <Input
                id='bill-input'
                type='number'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Enter bill amount'
              />
            </div> */}

            {/* Confirm button */}
            {/* <Button
              className='w-full'
              onClick={() => setShowConfirm(true)}
              disabled={!inputValue}
            >
              Confirm
            </Button> */}
          </div>
        </DialogContent>
      </Dialog>

      {/* <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title='Confirm Bill'
        desc={`Are you sure you want to confirm that username ${currentRow.user.username} has completed the payment of ${inputValue}?`}
        handleConfirm={handleConfirm}
      /> */}
    </>
  )
}

import { useEffect, useState } from 'react'
import { RequestConfirmInterface } from '@/types'
import { Camera, ZoomIn } from 'lucide-react'
import RequestConfirmServiceApi from '@/api/requestConfirmServiceApi'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface RequestConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requestId: string
}

export function RequestConfirmDialog({
  open,
  onOpenChange,
  requestId,
}: RequestConfirmDialogProps) {
  const [confirms, setConfirms] = useState<RequestConfirmInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!open || !requestId) return

      setLoading(true)
      try {
        const requestConfirmServiceApi = new RequestConfirmServiceApi()
        const res = await requestConfirmServiceApi.getByRequestId(requestId, {
          type: 'repair',
        })
        if (res) {
          setConfirms(res)
        }
      } catch (error) {
        console.error('Error fetching confirm data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [open, requestId])

  const getTypeBadge = (type: string) => {
    let typeLabel = ''
    let badgeColor = ''

    switch (type) {
      case 'replace':
        typeLabel = 'Replace'
        badgeColor = 'bg-purple-100 text-purple-800'
        break
      case 'repair':
        typeLabel = 'Repair'
        badgeColor = 'bg-blue-100 text-blue-800'
        break
      default:
        typeLabel = type
        badgeColor = 'bg-gray-100 text-gray-800'
    }

    return (
      <Badge variant='outline' className={cn('capitalize', badgeColor)}>
        {typeLabel}
      </Badge>
    )
  }

  const ImageDisplay = ({ image }: { image: string }) => {
    if (!image) {
      return (
        <div className='flex h-32 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50'>
          <Camera className='mb-1 h-6 w-6 text-gray-400' />
          <p className='text-xs text-gray-500'>No image</p>
        </div>
      )
    }

    return (
      <div
        className='group relative h-32 w-24 cursor-pointer overflow-hidden rounded-lg'
        onClick={() => setSelectedImage(image)}
      >
        <img
          src={image}
          alt='Confirm image'
          className='h-full w-full object-cover'
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '' // Clear the src to trigger the fallback
            target.onerror = null // Prevent infinite loop
          }}
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100'>
          <ZoomIn className='h-6 w-6 text-white' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Request Confirm Details</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {loading ? (
              <div>Loading...</div>
            ) : confirms.length === 0 ? (
              <div>No confirm data available</div>
            ) : (
              <div className='space-y-4'>
                {confirms.map((confirm) => (
                  <div key={confirm.id} className='rounded-lg border p-4'>
                    <div className='mb-2 flex items-center justify-between'>
                      <h3 className='font-semibold'>{confirm.name}</h3>
                      {getTypeBadge(confirm.type)}
                    </div>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div>
                          <p className='text-muted-foreground text-sm'>Price</p>
                          <p>{confirm.price}</p>
                        </div>
                        <div>
                          <p className='text-muted-foreground text-sm'>
                            Created At
                          </p>
                          <p>{new Date(confirm.createAt).toLocaleString()}</p>
                        </div>
                        {confirm.note && (
                          <div className='mt-2'>
                            <p className='text-muted-foreground text-sm'>
                              Note
                            </p>
                            <p>{confirm.note}</p>
                          </div>
                        )}
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='mt-4'>
                          <p className='text-muted-foreground mb-2 text-sm'>
                            Image
                          </p>
                          <ImageDisplay image={confirm.image} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Zoom Dialog */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className='max-w-4xl'>
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className='relative aspect-[4/3] w-full'>
              <img
                src={selectedImage}
                alt='Preview'
                className='h-full w-full object-contain'
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

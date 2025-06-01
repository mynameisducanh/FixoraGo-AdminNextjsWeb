import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IconReceipt } from '@tabler/icons-react'
import { NewsInterface, PaymentFeesInterface, UserInterface } from '@/types'
import { cn } from '@/lib/utils'
import { formatDateTimeVN, formatTimestamp } from '@/utils/format'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
// import { BillDialog } from './bill-dialog'
import { DataTableColumnHeader } from '@/features/news/components/data-table-column-header'
import { DataTableRowActions } from '@/features/news/components/data-table-row-actions'
import { ImageDialog } from '@/features/news/components/image-dialog'

export const columns: ColumnDef<NewsInterface>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    meta: {
      className: cn(
        'sticky md:table-cell left-0 z-10 rounded-tl',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted'
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='title' />
    ),
    cell: ({ row }) => {
      const { title } = row.original
      return <LongText className='max-w-36'>{title}</LongText>
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='description' />
    ),
    cell: ({ row }) => {
      const { description } = row.original
      return <LongText className='max-w-56'>{description || 'N/A'}</LongText>
    },
    //  meta: { className: 'w-36' },
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='content' />
    ),
    cell: ({ row }) => {
      const { content } = row.original
      return <LongText className='max-w-36'>{content}</LongText>
    },
    meta: {
      className: cn(
        'drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none',
        'bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted',
        'sticky left-6 md:table-cell'
      ),
    },
    enableHiding: false,
  },
  // {
  //   id: 'image',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='image' />
  //   ),
  //   cell: ({ row }) => {
  //     const { image } = row.original
  //     return (
  //       <LongText className='max-w-36'>
  //         {image !== ' ' ? image : 'N/A'}
  //       </LongText>
  //     )
  //   },
  //   meta: { className: 'w-36' },
  // },

  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='createdAt' />
    ),
    cell: ({ row }) => {
      const { createdAt } = row.original

      return (
        <div className='flex space-x-2'>
          <Badge variant='outline'>{formatDateTimeVN(createdAt)}</Badge>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='image' />
    ),
    cell: ({ row }) => {
      const [showBillDialog, setShowBillDialog] = useState(false)
      return (
        <>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              setShowBillDialog(!!row.original.image)
            }}
            className='flex items-center gap-2'
          >
            <IconReceipt className='h-4 w-4' />
            View Image
          </Button>
          <ImageDialog
            open={showBillDialog}
            onOpenChange={setShowBillDialog}
            currentRow={row.original}
          />
        </>
      )
    },
  },
  {
    id: 'actions',
    cell: DataTableRowActions,
  },
]

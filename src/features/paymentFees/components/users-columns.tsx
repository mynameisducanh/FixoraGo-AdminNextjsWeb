import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IconReceipt } from '@tabler/icons-react'
import { PaymentFeesInterface, UserInterface } from '@/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { BillDialog } from './bill-dialog'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<PaymentFeesInterface>[] = [
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
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return <LongText className='max-w-36'>{user.username || 'N/A'}</LongText>
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
    id: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return (
        <LongText className='max-w-36'>
          {user.fullName !== ' ' ? user.fullName : 'N/A'}
        </LongText>
      )
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return <LongText className='max-w-56'>{user.email || 'N/A'}</LongText>
    },
    //  meta: { className: 'w-36' },
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original

      let statusLabel = ''
      let badgeColor = ''

      switch (status) {
        case 'active':
          statusLabel = 'Đã xác thực'
          badgeColor = 'bg-green-100 text-green-800'
          break
        case 'reject':
          statusLabel = 'Bị từ chối'
          badgeColor = 'bg-red-100 text-red-800'
          break
        default:
          statusLabel = 'Chưa xác thực'
          badgeColor = 'bg-yellow-100 text-yellow-800'
          break
      }

      return (
        <div className='flex space-x-2'>
          <Badge variant='outline' className={cn('capitalize', badgeColor)}>
            {statusLabel}
          </Badge>
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
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Note' />
    ),
    cell: ({ row }) => {
      const { note } = row.original
      return <LongText className='max-w-56'>{note || 'N/A'}</LongText>
    },
    meta: { className: 'w-36' },
  },

  {
    id: 'bill',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bill' />
    ),
    cell: ({ row }) => {
      const [showBillDialog, setShowBillDialog] = useState(false)
      return (
        <>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowBillDialog(!!row.original.activityId)}
            className='flex items-center gap-2'
          >
            <IconReceipt className='h-4 w-4' />
            View Bill
          </Button>
          <BillDialog
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

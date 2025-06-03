import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IconReceipt } from '@tabler/icons-react'
import {
  ActivityLogInterface,
  PaymentFeesInterface,
  UserInterface,
} from '@/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { BillDialog } from './bill-dialog'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<ActivityLogInterface>[] = [
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
    accessorKey: 'username-user',
    accessorFn: (row) => row?.user?.username,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username Report' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return <LongText className='max-w-36'>{user?.username || 'N/A'}</LongText>
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
    id: 'name-user',
    accessorFn: (row) => row?.user?.fullName,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name Report' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return (
        <LongText className='max-w-36'>
          {user?.fullName !== ' ' ? user?.fullName : 'N/A'}
        </LongText>
      )
    },
    meta: { className: 'w-36' },
  },
  // {
  //   accessorKey: 'email-user',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Email User' />
  //   ),
  //   cell: ({ row }) => {
  //     const { user } = row.original
  //     return <LongText className='max-w-56'>{user?.email || 'N/A'}</LongText>
  //   },
  //    meta: { className: 'w-36' },
  // },
  {
    accessorKey: 'username-fixer',
    accessorFn: (row) => row?.fixer?.username,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Username Reported' />
    ),
    cell: ({ row }) => {
      const { fixer } = row.original
      return <LongText className='max-w-36'>{fixer?.username || 'N/A'}</LongText>
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
  //   id: 'name-fixer',
  //   accessorFn: (row) => row?.fixer?.fullName,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Name Fixer' />
  //   ),
  //   cell: ({ row }) => {
  //     const { fixer } = row.original
  //     return (
  //       <LongText className='max-w-36'>
  //         {fixer?.fullName !== ' ' ? fixer?.fullName : 'N/A'}
  //       </LongText>
  //     )
  //   },
  //   meta: { className: 'w-36' },
  // },
  // {
  //   accessorKey: 'email-fixer',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Email Fixer' />
  //   ),
  //   cell: ({ row }) => {
  //     const { fixer } = row.original
  //     return <LongText className='max-w-56'>{fixer?.email || 'N/A'}</LongText>
  //   },
  //    meta: { className: 'w-36' },
  // },
  {
    accessorKey: 'activityType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const { activityType } = row.original

      let statusLabel = ''
      let badgeColor = ''

      switch (activityType) {
        case 'staff_checkin':
          statusLabel = 'Fixer Check-in'
          badgeColor = 'bg-blue-100 text-blue-800'
          break
        case 'user_report':
          statusLabel = 'User Report'
          badgeColor = 'bg-red-100 text-red-800' 
          break
        case 'fixer_report':
          statusLabel = 'Fixer Report'
          badgeColor = 'bg-red-100 text-red-800' 
          break
        case 'staff_payfee':
          statusLabel = 'Fixer Pay Fees'
          badgeColor = 'bg-green-100 text-green-800'
          break
        default:
          statusLabel = 'Chưa xác thực'
          badgeColor = 'bg-gray-100 text-gray-800'
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
    id: 'Image',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Image' />
    ),
    cell: ({ row }) => {
      const [showBillDialog, setShowBillDialog] = useState(false)
      return (
        <>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowBillDialog(!!row.original.imageUrl)}
            className='flex items-center gap-2'
          >
            <IconReceipt className='h-4 w-4' />
            View Image
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

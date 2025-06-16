import { ColumnDef } from '@tanstack/react-table'
import { RequestServiceInterface, UserInterface } from '@/types'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<RequestServiceInterface>[] = [
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
    id: 'userUsername',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User Username' />
    ),
    cell: ({ row }) => {
      const { user } = row.original
      return <LongText className='max-w-36'>{user.username || 'N/A'}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    id: 'fixerUsername',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Fixer Username' />
    ),
    cell: ({ row }) => {
      const { fixer } = row.original
      return <LongText className='max-w-36'>{fixer?.username || 'N/A'}</LongText>
    },
    meta: { className: 'w-36' },
  },
  {
    accessorKey: 'nameService',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name Service' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('nameService')}</div>
    ),
  },
  {
    accessorKey: 'calender',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Calender' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('calender')}</div>
    ),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => (
      <div className='w-fit text-nowrap'>{row.getValue('address')}</div>
    ),
    meta: { className: 'w-28' },
  },
  {
    id: 'viewRequestConfirm',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Request Confirm' />
    ),
    cell: ({ row }) => {
      const requestService = row.original

      return (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => {
              console.log('Confirm clicked:', requestService)
              const event = new CustomEvent('openRequestServiceConfirm', {
                detail: requestService,
              })
              window.dispatchEvent(event)
            }}
            className='text-green-600 hover:text-green-800'
          >
            Request Confirm
          </button>
        </div>
      )
    },
  },
  {
    accessorKey: 'emailVerified',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const { status } = row.original
      let statusLabel = ''
      let badgeColor = ''

      switch (status) {
        case 'pending':
          statusLabel = 'Pending'
          badgeColor = 'bg-blue-100 text-blue-800'
          break
        case 'deleted':
          statusLabel = 'Reject'
          badgeColor = 'bg-red-100 text-red-800'
          break
        case 'rejected':
          statusLabel = 'Reject'
          badgeColor = 'bg-red-100 text-red-800'
          break
        case 'guarantee':
          statusLabel = 'Guarantee'
          badgeColor = 'bg-green-100 text-green-800'
          break
        case 'completed':
          statusLabel = 'Completed'
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
  // {
  //   accessorKey: 'infoVerified',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Point' />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue('infoVerified') || 'N/A'}</div>,
  //   enableSorting: false,
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      const requestService = row.original

      return (
        <div className='flex items-center gap-2'>
          <button
            onClick={() => {
              console.log('Detail clicked:', requestService)
              const event = new CustomEvent('openRequestServiceDetail', {
                detail: requestService,
              })
              window.dispatchEvent(event)
            }}
            className='text-blue-600 hover:text-blue-800'
          >
            Detail
          </button>
        </div>
      )
    },
  },
]

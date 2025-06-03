import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'

export const userTypes = [
  {
    label: 'Fixer Pay Fees',
    value: 'staff_payfee',
    icon: IconShield,
  },
  {
    label: 'Fixer Check-in',
    value: 'staff_checkin',
    icon: IconUserShield,
  },
  {
    label: 'Fixer Reject',
    value: 'staff_reject',
    icon: IconUsersGroup,
  },
  {
    label: 'User Reject',
    value: 'user_reject',
    icon: IconUsersGroup,
  },
] as const

import { createContext, useContext, useEffect, useState } from 'react'
import { RequestServiceInterface } from '@/types'

interface RequestServicesContextType {
  open: 'detail' | 'confirm' | null
  setOpen: (open: 'detail' | 'confirm' | null) => void
  currentRow: RequestServiceInterface | null
  setCurrentRow: (row: RequestServiceInterface | null) => void
}

const RequestServicesContext = createContext<RequestServicesContextType | undefined>(undefined)

export function RequestServicesProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<'detail' | 'confirm' | null>(null)
  const [currentRow, setCurrentRow] = useState<RequestServiceInterface | null>(null)

  useEffect(() => {
    const handleDetail = (event: CustomEvent<RequestServiceInterface>) => {
      setCurrentRow(event.detail)
      setOpen('detail')
    }

    const handleConfirm = (event: CustomEvent<RequestServiceInterface>) => {
      setCurrentRow(event.detail)
      setOpen('confirm')
    }

    window.addEventListener('openRequestServiceDetail', handleDetail as EventListener)
    window.addEventListener('openRequestServiceConfirm', handleConfirm as EventListener)

    return () => {
      window.removeEventListener('openRequestServiceDetail', handleDetail as EventListener)
      window.removeEventListener('openRequestServiceConfirm', handleConfirm as EventListener)
    }
  }, [])

  return (
    <RequestServicesContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RequestServicesContext.Provider>
  )
}

export function useRequestServices() {
  const context = useContext(RequestServicesContext)
  if (context === undefined) {
    throw new Error('useRequestServices must be used within a RequestServicesProvider')
  }
  return context
} 
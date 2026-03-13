import { createContext, useContext, useState, type ReactNode } from "react"
import type { ClienteType } from "../types/cliente.type"

interface ClientePageContextType {
  showForm: boolean
  selectedClient: ClienteType | null
  openForm: (client?: ClienteType) => void
  closeForm: () => void
}

const ClientePageContext = createContext<ClientePageContextType | undefined>(
  undefined
)

export const ClientePageProvider = ({ children }: { children: ReactNode }) => {
  const [showForm, setShowForm] = useState(false)
  const [selectedClient, setSelectedClient] = useState<ClienteType | null>(
    null
  )

  const openForm = (client?: ClienteType) => {
    setSelectedClient(client ?? null)
    setShowForm(true)
  }

  const closeForm = () => {
    setSelectedClient(null)
    setShowForm(false)
  }

  return (
    <ClientePageContext.Provider
      value={{ showForm, selectedClient, openForm, closeForm }}
    >
      {children}
    </ClientePageContext.Provider>
  )
}

export const useClientePage = (): ClientePageContextType => {
  const ctx = useContext(ClientePageContext)
  if (!ctx) {
    throw new Error(
      "useClientePage must be used within a ClientePageProvider"
    )
  }
  return ctx
}

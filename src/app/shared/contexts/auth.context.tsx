import { createContext, useContext, useEffect, useState } from "react"

export type User = {
  id: string
  nome: string
  email: string
}

export type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = (userData: User, accessToken: string) => {
    setUser(userData)
    setToken(accessToken)

    localStorage.setItem("token", accessToken)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("Erro no context de autenticação!")
  return context
}
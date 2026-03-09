import { LoadingOverlay } from "@/app/shared/components/screen.loading"
import { useAuthContext } from "@/app/shared/contexts/auth.context"
import { Navigate, Outlet } from "react-router-dom"


export const PrivateRoute = () => {
  const { isAuthenticated, loading } = useAuthContext()

  if (loading) return <LoadingOverlay />

  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/login" replace />
}
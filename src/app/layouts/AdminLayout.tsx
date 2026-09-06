import { AdminNavBar } from "@/shared/components"
import { Outlet } from "react-router"

export function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

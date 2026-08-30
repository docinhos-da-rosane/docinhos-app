import { AdminNavBar } from "@/shared/components"
import { Outlet } from "react-router"

export function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <main>
        <Outlet />
      </main>
    </>
  )
}

import { Outlet } from "react-router"

export function AdminLayout() {
  return (
    <>
      {/* Header - Admin */}
      <h1>Layout administrativo</h1>
      <main>
        <Outlet />
      </main>
    </>
  )
}

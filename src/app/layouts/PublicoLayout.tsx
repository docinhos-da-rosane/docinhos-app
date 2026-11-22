import { PublicNavBar } from "@/shared/components/layout/header/PublicNavBar"
import { Outlet } from "react-router"

export function PublicoLayout() {
  return (
    <>
      <PublicNavBar />
      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  )
}

import { PublicNavBar } from "@/shared/components/layout/header/PublicNavBar"
import { Outlet } from "react-router"

export function PublicoLayout() {
  return (
    <>
      <PublicNavBar />
      <h1>Layout publico</h1>
      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  )
}

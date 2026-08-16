import { Outlet } from "react-router"

export function PublicoLayout() {
  return (
    <>
      {/* Header */}
      <h1>Layout publico</h1>
      <main>
        <Outlet />
      </main>

      {/* <Footer /> */}
    </>
  )
}

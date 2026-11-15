import { Dessert, Menu } from "lucide-react"
import { NavLink } from "react-router-dom"

import { Button } from "@/shared/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/shared/components/ui/sheet"

import { Logo } from "../../logo/Logo"
import { ROTAS } from "@/shared/constants/routes"

const publicLinks = [
  { to: ROTAS.HOME, label: "Início" },
  { to: "/", label: "Catálogo" },
  { to: "/", label: "Como encomendar" },
]

const linkClassName =
  "block rounded-sm px-3 py-2 text-sm font-medium " +
  "text-muted-foreground hover:bg-accent hover:text-accent-foreground"

export function PublicNavBar() {
  return (
    <header className="flex justify-center border-b bg-background p-4">
      <div className="flex w-full items-center justify-between gap-4 lg:max-w-7xl">
        <Logo
          rota={ROTAS.HOME}
          descricao="Docinhos sob encomenda"
          icon={<Dessert size={22} color="white" />}
        />

        <nav className="hidden items-center gap-2 md:flex">
          {publicLinks.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClassName}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Button variant="outline" size="icon" className="border-0">
                <Menu
                  aria-hidden="true"
                  size={32}
                  className="size-6 text-muted-foreground"
                />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader></SheetHeader>

              <nav className="grid gap-3 px-4">
                {publicLinks.map(({ to, label }) => (
                  <SheetClose key={to}>
                    <NavLink to={to} className={linkClassName}>
                      {label}
                    </NavLink>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

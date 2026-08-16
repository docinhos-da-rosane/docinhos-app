import { createBrowserRouter } from "react-router-dom"
import { adminRoutes } from "./admin.routes"
import { publicoRoutes } from "./publico.routes"

export const router = createBrowserRouter([publicoRoutes, adminRoutes])

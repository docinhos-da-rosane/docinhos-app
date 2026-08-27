import { api } from "@/shared/lib/api.config"
import type { LoginRequest, LoginResponse } from "../models/auth.types"

export async function login(dados: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", dados)
  return response.data
}

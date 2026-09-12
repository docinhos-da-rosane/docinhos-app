import { beforeEach, describe, expect, it, vi } from "vitest"

import { apiPublica } from "@/shared/lib/api.config"

import { buscarCategorias } from "./categoriaApi"
import { CATEGORIAS } from "@/test/mocks/categoriaMocks"

vi.mock("@/shared/lib/api.config", () => ({
  apiPublica: {
    get: vi.fn(),
  },
}))

describe(buscarCategorias.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve retornar as categorias da resposta", async () => {
    const resposta = CATEGORIAS

    vi.mocked(apiPublica.get).mockResolvedValue({
      data: resposta,
    } as any)

    await expect(buscarCategorias()).resolves.toEqual(resposta)
    expect(apiPublica.get).toHaveBeenCalledWith("/categorias")
  })
})

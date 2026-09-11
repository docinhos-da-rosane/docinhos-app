import { renderHook, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { createQueryWrapper } from "@/test/createQueryWrapper"

import { buscarCategorias } from "../api/categoriaApi"
import { useBuscarCategorias } from "./useBuscaCategorias"
import { CATEGORIAS } from "@/test/mocks/categoriaMocks"

vi.mock("../api/categoriaApi", () => ({
  buscarCategorias: vi.fn(),
}))

describe(useBuscarCategorias.name, () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("deve retornar as categorias quando a busca for concluída", async () => {
    const resposta = CATEGORIAS

    vi.mocked(buscarCategorias).mockResolvedValue(resposta)

    const { result } = renderHook(() => useBuscarCategorias(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(resposta)
    expect(buscarCategorias).toHaveBeenCalledTimes(1)
  })

  it("deve propagar o erro quando a busca falhar", async () => {
    const erro = new Error("Falha ao buscar categorias")

    vi.mocked(buscarCategorias).mockRejectedValue(erro)

    const { result } = renderHook(() => useBuscarCategorias(), {
      wrapper: createQueryWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(erro)
  })
})

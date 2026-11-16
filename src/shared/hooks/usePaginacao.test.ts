import { act, renderHook } from "@testing-library/react"
import { useState } from "react"
import { describe, expect, it } from "vitest"

import { usePaginacao } from "./usePaginacao"

describe(usePaginacao.name, () => {
  it("deve navegar entre páginas sem passar os limites", () => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState(0)
      const paginacao = usePaginacao({
        page,
        setPage,
        totalPages: 2,
        carregando: false,
        ocorreuErro: false,
      })

      return { page, ...paginacao }
    })

    expect(result.current.page).toBe(0)
    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(false)

    act(() => result.current.navegarParaProximaPagina())

    expect(result.current.page).toBe(1)
    expect(result.current.paginaAnteriorDesabilitada).toBe(false)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    act(() => result.current.navegarParaProximaPagina())
    act(() => result.current.navegarParaPaginaAnterior())

    expect(result.current.page).toBe(0)

    act(() => result.current.navegarParaPaginaAnterior())

    expect(result.current.page).toBe(0)
  })

  it.each([
    { carregando: true, ocorreuErro: false },
    { carregando: false, ocorreuErro: true },
  ])("deve bloquear a navegação durante carregamento ou erro", (estado) => {
    const { result } = renderHook(() => {
      const [page, setPage] = useState(1)

      return {
        page,
        ...usePaginacao({
          page,
          setPage,
          totalPages: 3,
          ...estado,
        }),
      }
    })

    expect(result.current.paginaAnteriorDesabilitada).toBe(true)
    expect(result.current.proximaPaginaDesabilitada).toBe(true)

    act(() => {
      result.current.navegarParaPaginaAnterior()
      result.current.navegarParaProximaPagina()
    })

    expect(result.current.page).toBe(1)
  })
})

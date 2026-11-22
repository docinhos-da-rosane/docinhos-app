import { useQuery } from "@tanstack/react-query"
import {
  buscarProdutosPublicos,
  TAMANHO_PAGINA_CATALOGO,
} from "../api/produtoPublicoApi"

export function useBuscaCatalogoProduto(
  page: number,
  size = TAMANHO_PAGINA_CATALOGO
) {
  return useQuery({
    queryKey: ["catalogo-produtos", page, size],
    queryFn: () => buscarProdutosPublicos(page, size),
    staleTime: 0,
  })
}

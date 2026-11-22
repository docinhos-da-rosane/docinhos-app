export interface CatalogoProdutoPorcaoResponse {
  id: string
  quantidade: number
  preco: number
}

export interface CatalogoProdutoResponse {
  id: string
  nome: string
  categoria: string
  imagemMenorUrl: string
  disponivel: boolean
  porcaoMenorPreco: CatalogoProdutoPorcaoResponse
}

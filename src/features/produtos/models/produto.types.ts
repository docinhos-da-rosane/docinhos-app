export interface CriarProdutoRequest {
  nome: string
  descricao: string
  categoriaId: string
  porcoes: CriarProdutoPorcaoRequest[]
}

interface CriarProdutoPorcaoRequest {
  quantidade: number
  preco: number
}

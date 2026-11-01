export interface CriarProdutoRequest {
  nome: string
  descricao: string
  categoriaId: string
  porcoes: CriarProdutoPorcaoRequest[]
}

export interface ProdutoResumoResponse {
  id: string
  nome: string
  categoria: string
  imagemMiniaturaUrl: string
  disponivel: boolean
}

export interface ProdutoDetalhadoResponse {
  id: string
  nome: string
  descricao: string
  categoria: CategoriaResponse
  disponivel: boolean
  imagemUrl: string
  porcoes: PorcaoResponse[]
}

export interface CategoriaResponse {
  id: string
  nome: string
}

export interface PorcaoResponse {
  quantidade: number
  preco: number
}

export interface PageResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

interface CriarProdutoPorcaoRequest {
  quantidade: number
  preco: number
}

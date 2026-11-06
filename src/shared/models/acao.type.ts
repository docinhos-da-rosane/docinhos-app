export interface AcaoConfirmarDialog {
  aberto: boolean
  carregando: boolean
  texto: string
  onAbrir: () => void
  onFechar: () => void
  onConfirmar: () => void
}

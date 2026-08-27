export function guardarToken(token: string) {
  localStorage.setItem("access_token", token)
}

export function obterToken(): string | null {
  return localStorage.getItem("access_token")
}

export function removerToken() {
  localStorage.removeItem("access_token")
}

export function estaAutenticado(): boolean {
  const token = obterToken()
  return token !== null
}

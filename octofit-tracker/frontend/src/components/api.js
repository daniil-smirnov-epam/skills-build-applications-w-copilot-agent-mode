const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const isCodespaceConfigured = Boolean(codespaceName)

export const apiBaseUrl = isCodespaceConfigured
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.results)) {
      return payload.results
    }

    if (Array.isArray(payload.items)) {
      return payload.items
    }

    if (Array.isArray(payload.data)) {
      return payload.data
    }
  }

  return []
}

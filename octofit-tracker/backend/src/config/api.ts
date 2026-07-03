export function getApiBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  const port = process.env.PORT || '8000';

  return codespaceName
    ? `https://${codespaceName}-${port}.app.github.dev`
    : `http://localhost:${port}`;
}

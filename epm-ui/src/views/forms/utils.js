

export function canvasToString(canvasRef) {
  if (canvasRef === null) return null
  let dataString = canvasRef.toDataURL("image/png")
  const index = dataString.indexOf(",") + 1
  dataString = dataString.substring(index)
  return dataString
}

export function drawBase64Img(canvasRef, base64Data) {
  if (canvasRef !== null) return canvasRef.fromDataURL(base64Data)
  else return null
}

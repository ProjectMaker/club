const MAX_IMAGE_WIDTH = 1600
const MAX_IMAGE_HEIGHT = 1600
const IMAGE_QUALITY = 0.78
const OUTPUT_TYPE = 'image/webp'

export interface ProcessedImageFile {
  fileName: string;
  contentType: string;
  data_url: string;
}

const readFileAsDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result?.toString() || '')
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

const loadImage = (dataUrl: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Impossible de traiter cette image'))
    image.src = dataUrl
  })
}

const getResizedDimensions = ({ width, height }: { width: number; height: number }) => {
  const ratio = Math.min(MAX_IMAGE_WIDTH / width, MAX_IMAGE_HEIGHT / height, 1)

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}

const canvasToDataUrl = (canvas: HTMLCanvasElement) => {
  return new Promise<string>((resolve) => {
    resolve(canvas.toDataURL(OUTPUT_TYPE, IMAGE_QUALITY))
  })
}

export const processImageFile = async (file: File): Promise<ProcessedImageFile> => {
  const sourceDataUrl = await readFileAsDataUrl(file)
  const image = await loadImage(sourceDataUrl)
  const { width, height } = getResizedDimensions({
    width: image.naturalWidth,
    height: image.naturalHeight,
  })

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const context = canvas.getContext('2d')
  if (!context) {
    return {
      fileName: file.name,
      contentType: file.type,
      data_url: sourceDataUrl,
    }
  }

  context.drawImage(image, 0, 0, width, height)

  return {
    fileName: file.name.replace(/\.[^/.]+$/, '.webp'),
    contentType: OUTPUT_TYPE,
    data_url: await canvasToDataUrl(canvas),
  }
}

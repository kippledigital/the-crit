declare module 'formidable' {
  import { IncomingMessage } from 'http'
  
  export interface File {
    filepath: string
    originalFilename?: string
    newFilename?: string
    mimetype?: string
    size?: number
  }

  export interface Fields {
    [key: string]: string | string[]
  }

  export interface Files {
    [key: string]: File | File[]
  }

  export interface Options {
    encoding?: string
    uploadDir?: string
    keepExtensions?: boolean
    maxFiles?: number
    maxFileSize?: number
    filter?: (part: any) => boolean
  }

  export default function formidable(options?: Options): {
    parse: (
      req: IncomingMessage,
      callback: (err: any, fields: Fields, files: Files) => void
    ) => void
  }
} 
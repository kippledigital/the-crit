export interface FormData {
  designerName: string
  email: string
  projectTitle: string
  projectDescription: string
  designLinks: string
  files: File[]
  designerSkillLevel: string
}

export interface ApiResponse {
  success: boolean
  message: string
  submissionId?: string
  filesReceived?: number
  error?: string
}

export interface FileUploadState {
  files: File[]
  isUploading: boolean
  uploadProgress: number
} 
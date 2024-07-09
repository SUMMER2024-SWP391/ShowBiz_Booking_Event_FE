export interface ErrorResponse<Data> {
  message: string
  errors?: Data
}

export interface SuccessResponse<Data> {
  message: string
  data: Data
}

export enum StatusRegisterEvent {
  SUCCESS = 'success',
  CANCEL = 'cancel'
}

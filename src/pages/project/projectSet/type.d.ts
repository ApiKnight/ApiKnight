/* eslint-disable */
type FieldType = {
  username?: string
  password?: string
  remember?: string
}

interface childProps {
  isModalOpen: boolean
  closeModal: Function
  getUserInfo: Function
  user_id: string
}

export { childProps, FieldType }

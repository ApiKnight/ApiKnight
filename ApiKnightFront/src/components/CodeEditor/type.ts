export interface ICodeEditorProps {
  height?: string
  defaultValue?: string
  onChange?: (value: string) => void
  lang?: string
  autoWrap?: boolean
  readOnly?: boolean
  options?: object
  width?: string
  // 是否携带边框?: boolean
  withBorder?: boolean
}

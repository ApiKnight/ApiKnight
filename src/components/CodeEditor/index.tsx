import React, { memo } from 'react'
import Editor from '@monaco-editor/react'
import { ICodeEditorProps } from './type'
import classNames from 'classnames'
import './index.less'

const CodeEditor: React.FunctionComponent<ICodeEditorProps> = memo((props) => {
  const {
    defaultValue = '{}',
    onChange,
    lang = 'json',
    autoWrap = true,
    readOnly = false,
    width = '100%',
    height = '100%',
    options = {},
    withBorder = false,
  } = props

  const defaultOptions = {
    minimap: {
      enabled: false, // 禁用右侧预览层
    },
    wordWrap: autoWrap ? 'on' : 'off' as const, // 自动换行
    readOnly: readOnly ?? false,
  }
  const editorOptions = {
    ...options,
    ...defaultOptions,
  };
  return (
    <div className={classNames('code-root', { 'with-border': withBorder })}>
      <Editor
        width={width}
        height={height}
        value={defaultValue}
        defaultLanguage={lang}
        language={lang}
        onChange={(value) => onChange && onChange(value)}
        options={editorOptions}
      />
    </div>
  )
})

export default CodeEditor

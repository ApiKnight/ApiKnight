import React, { memo } from 'react'
import Editor from '@monaco-editor/react'
import { ICodeEditorProps } from './type'
import classNames from 'classnames'
import './index.less'

const defaultOptions = {
  minimap: {
    enabled: false, // 禁用右侧预览层
  },
  wordWrap: 'on', // 自动换行
  readOnly: false,
}

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

  if (autoWrap) {
    defaultOptions.wordWrap = 'on'
  } else {
    defaultOptions.wordWrap = 'off'
  }

  if (readOnly) {
    defaultOptions.readOnly = true
  } else {
    defaultOptions.readOnly = false
  }

  return (
    <div className={classNames('code-root', { 'with-border': withBorder })}>
      <Editor
        width={width}
        height={height}
        value={defaultValue}
        defaultLanguage={lang}
        language={lang}
        onChange={(value) => onChange && onChange(value)}
        options={defaultOptions}
        {...options}
      />
    </div>
  )
})

export default CodeEditor

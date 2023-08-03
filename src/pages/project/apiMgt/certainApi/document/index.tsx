import React, { memo } from 'react'
import { Button } from 'antd'
import './index.less'
import DocOperator from './c-pages/doc-operator'
import DocInfo from './c-pages/doc-info'
import DocRequest from './c-pages/doc-request'
import DocResponse from './c-pages/doc-response'

const Document: React.FunctionComponent = memo(() => {
	return (
		<div className="document-page">
			<DocOperator />
			<DocInfo />
			<DocRequest />
			<DocResponse />
		</div>
	)
})

export default Document

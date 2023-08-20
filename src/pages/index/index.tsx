import React, { useState, useEffect } from 'react'
import './index.less'
import HeaderNav from '@/components/HeaderNav'
import { Button, Avatar, Space, Tag, CollapseProps, Collapse } from 'antd'
import IndexShow from '@/components/IndexShow'
import { IndexData } from '@/types/indexShow'
import {
  RadarChartOutlined,
  NodeIndexOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import getSelfInfo from '@/api/getSelfInfo'
import EmptyShow from '@/components/EmptyShow'

const Index: React.FunctionComponent = () => {
  //清空缓存
  // 过期token
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhMGNlOWMyLTAxYTYtNGI0Zi05ZDc5LWFkZmM0YjFhNDIxMyIsImlhdCI6MTY5MTc0NTg1MCwiZXhwIjoxNjkxODMyMjUwfQ.2bavSv2t4BVmx_LpyT77P_8c3rFI5Qr0EuA4VLjohRA
  // localStorage.setItem('token','')
  // localStorage.setItem('user_id','')
  const navigate = useNavigate()

  const user_id = localStorage.getItem('user_id')

  const [user_info, setUserInfo] = useState({})

  user_id
    ? useEffect(() => {
        getSelfInfo().then((res) => {
          res.data.code === 200 ? setUserInfo((res.data as any).data) : ''
        })
      }, [])
    : ''

  const text1 = (
    <div>
      <h3>
        可视化 API 文档设计功能，无需手写 Markdown 或
        YAML，零学习成本，高效便捷。
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/design.0.png'
        alt='展示图片'
      />
    </div>
  )
  const text2 = (
    <div>
      <h3>
        可将常用数据结构定义为“数据模型”，在多个接口中引用，一次修改全局生效。
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/design.1.png'
        alt='展示图片'
      />
    </div>
  )
  const text3 = (
    <div>
      <h3>接口文档完全遵循 OpenAPI(Swagger) 规范，支持 JSON Schema</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/design.2.png'
        alt='展示图片'
      />
    </div>
  )
  const text4 = (
    <div>
      <h3>
        支持导入 Swagger(OpenAPI), Postman, Jmeter, apiDoc, RAP2, YApi, Eolink,
        Apipost 等数据格式
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/design.3.png'
        alt='展示图片'
      />
    </div>
  )
  const text5 = (
    <div>
      <h3>
        只要设计完（或导入）API 文档，即可一键调试，无需复制黏贴各种 URL
        或参数。
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/debug.0.png'
        alt='展示图片'
      />
    </div>
  )
  const text6 = (
    <div>
      <h3>依据接口文档自动判断返回数据结构是否正确，无需手写断言。</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/debug.1.png'
        alt='展示图片'
      />
    </div>
  )
  const text7 = (
    <div>
      <h3>
        保存多组接口请求参数，轻松覆盖一个接口的各种实例，方便后端自测和测试编写用例
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/debug.2.png'
        alt='展示图片'
      />
    </div>
  )
  const text8 = (
    <div>
      <h3>
        设计完（或导入） 的API
        文档，一键分享给合作伙伴，接口变更实时同步，支持公开或加密发布。
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/publish.0.png'
        alt='展示图片'
      />
    </div>
  )
  const text9 = (
    <div>
      <h3>API 文档页面支持“调试”功能，可以在线请求真实接口并返回数据</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/publish.1.png'
        alt='展示图片'
      />
    </div>
  )
  const text10 = (
    <div>
      <h3>在线文档支持生成 20 多种语言的接口请求代码和数据模型代码</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/publish.4.png'
        alt='展示图片'
      />
    </div>
  )
  const text11 = (
    <div>
      <h3>
        只要定义好 API 文档，“零配置”即可自动 mock
        出非常“人性化”的数据（根据数据结构及字段名智能 mock），参考左图 👉
      </h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/mock.0.png'
        alt='展示图片'
      />
    </div>
  )
  const text12 = (
    <div>
      <h3>API 文档更改时，Mock 数据会自动变更，无需改动任何脚本</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/mock.1.png'
        alt='展示图片'
      />
    </div>
  )
  const text13 = (
    <div>
      <h3>高级 Mock 支持配置不同的期望，根据请求参数返回不同结果</h3>
      <img
        style={{ height: '50vh' }}
        src='https://cdn.apifox.cn/www/assets/image/index/mock.2.png'
        alt='展示图片'
      />
    </div>
  )
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '高效 & 零学习成本',
      children: <div>{text1}</div>,
    },
    {
      key: '2',
      label: '可复用的“数据模型”',
      children: <div>{text2}</div>,
    },
    {
      key: '3',
      label: '遵循 OpenAPI(Swagger) 规范',
      children: <div>{text3}</div>,
    },
    {
      key: '4',
      label: '可导入 Swagger 等 20+ 数据格式',
      children: <div>{text4}</div>,
    },
  ]
  const items2: CollapseProps['items'] = [
    {
      key: '1',
      label: '一键调试，无需复制黏贴',
      children: <div>{text5}</div>,
    },
    {
      key: '2',
      label: '“自动校验”返回数据结构的正确性',
      children: <div>{text6}</div>,
    },
    {
      key: '3',
      label: '独创的“接口用例”功能',
      children: <div>{text7}</div>,
    },
  ]
  const items3: CollapseProps['items'] = [
    {
      key: '1',
      label: '一键发布&分享',
      children: <div>{text8}</div>,
    },
    {
      key: '2',
      label: 'API 文档支持“在线调试”',
      children: <div>{text9}</div>,
    },
    {
      key: '3',
      label: '自动生成代码',
      children: <div>{text10}</div>,
    },
  ]
  const items4: CollapseProps['items'] = [
    {
      key: '1',
      label: '无需手写 Mock 规则',
      children: <div>{text11}</div>,
    },
    {
      key: '2',
      label: 'API 变更后 Mock 数据实时同步变更',
      children: <div>{text12}</div>,
    },
    {
      key: '3',
      label: '支持根据请求参数返回不同结果',
      children: <div>{text13}</div>,
    },
  ]
  const arr: IndexData[] = [
    {
      key: 1,
      icon: <RadarChartOutlined style={{ fontSize: '60px' }} />,
      title: '团队协作',
      desc: (
        <ol>
          <li>接口数据云端同步，实时更新。 </li>
          <li>
            成熟的团队/项目权限管理，支持管理员、普通成员、只读成员等角色设置，满足各类企业的需求。
          </li>
        </ol>
      ),
    },
    {
      key: 2,
      icon: <NodeIndexOutlined style={{ fontSize: '60px' }} />,
      title: '数据导入/导出',
      desc: (
        <ol>
          <li>支持导出 OpenAPI (Swagger)、Markdown、Html 等数据格式。</li>
          <li>
            支持导入 OpenAPI
            (Swagger)、Postman、HAR、RAP2、JMeter、YApi、Eolinker、NEI、RAML、DOClever
            、Apizza 、DOCWAY、ShowDoc、apiDoc、I/O Docs、WADL、Google Discovery
            等数据格式。
          </li>
        </ol>
      ),
    },
    {
      key: 3,
      icon: <PhoneOutlined style={{ fontSize: '60px' }} />,
      title: '支持 HTTP、TCP、RPC',
      desc: (
        <ol>
          <li>支持 HTTP(s) 接口管理。</li>
          <li>支持 Socket (TCP) 接口管理。</li>
          <li>后续将会支持 GraphQL、Dubbo、gRPC、WebSocket 等协议接口。</li>
        </ol>
      ),
    },
  ]
  function JumpTo(): void {
    navigate('/user', { state: { user_id: localStorage.getItem('user_id') } })
  }
  return (
    <div className='index'>
      <HeaderNav user_info={user_info}></HeaderNav>
      <div className='index-main'>
        <div className='block_1'>
          <h1 style={{ marginTop: '5%' }}>
            API 文档、API 调试、API Mock、API 自动导入
          </h1>
          <h1 style={{ color: '#9373ee' }}>API 一体化协作平台</h1>
          <div className='block_1--desc'>
            <p>更先进的 API 设计/开发/测试工具</p>
            <p>ApiKnight = Postman + Swagger + Mock + JMeter</p>
          </div>
          <div className='block_1--bottom'>
            <div className='block_1--btn'>
              <Button type='primary' size='large' block onClick={JumpTo}>
                开始使用
              </Button>
            </div>
          </div>
        </div>
        <div className='block_2'>
          <img
            src='https://cdn.apifox.cn/www/assets/image/index/background-with-theme/dark-purple.png'
            alt='展示图片'
          />
        </div>
        <div className='block_3'>
          <h1>HOW IT WORKS</h1>
        </div>
        <div className='block_4'>
          <h1>一套系统、一份数据，解决多个 API 工具之间的数据同步问题</h1>
          <div className='block_4--desc'>
            <p>
              只要定义好 API 文档，API 调试、API Mock、API
              自动化测试即可直接使用，无需再次定义。
            </p>
            <p>
              API 文档和 API 开发调试使用同一个工具，API 调试完成后即可保证和
              API 文档定义完全一致。高效、及时、准确！
            </p>
          </div>
          <div className='block_4--avatar'>
            <Space wrap size={16}>
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/19998011?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/103236054?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/100053992?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/82299744?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/64735802?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/30767779?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/73152010?s=70&v=4'
              />
              <Avatar
                size={64}
                src='https://avatars.githubusercontent.com/u/122713025?s=70&v=4'
              />
            </Space>
          </div>
        </div>
        {/* 5 */}
        <div className='block_5'>
          <div className='block_5--tag'>
            <Tag bordered={false} color='volcano' style={{ fontSize: '20px' }}>
              Api 设计
            </Tag>
          </div>
          <div className='block_5--content'>
            <div className='block_5--content-left'>
              <h1>可视化 API 设计</h1>
              <Collapse
                items={items}
                defaultActiveKey={['1']}
                accordion
                style={{ marginTop: '1%' }}
              />
              ;
            </div>
            <div className='block_5--content-right'>
              <img
                src='https://cdn.apifox.cn/www/assets/image/index/design.3.png'
                alt='展示图片'
              />
            </div>
          </div>
        </div>
        {/*  6  */}
        <div className='block_5'>
          <div className='block_5--tag'>
            <Tag bordered={false} color='volcano' style={{ fontSize: '20px' }}>
              调试
            </Tag>
          </div>
          <div className='block_5--content'>
            <div className='block_5--content-right'>
              <img
                src='https://cdn.apifox.cn/www/assets/image/index/design.3.png'
                alt='展示图片'
              />
            </div>
            <div className='block_5--content-left'>
              <h1 style={{ color: '#e08651' }}>比 Postman 更强大</h1>
              <Collapse
                items={items2}
                defaultActiveKey={['1']}
                accordion
                style={{ marginTop: '1%' }}
              />
              ;
            </div>
          </div>
        </div>
        {/*  7  */}
        <div>
          <div className='block_5'>
            <div className='block_5--tag'>
              <Tag
                bordered={false}
                color='volcano'
                style={{ fontSize: '20px' }}
              >
                发布
              </Tag>
            </div>
            <div className='block_5--content'>
              <div className='block_5--content-left'>
                <h1 style={{ color: '#12d8fa' }}>分享&发布 API 文档</h1>
                <Collapse
                  items={items3}
                  defaultActiveKey={['1']}
                  accordion
                  style={{ marginTop: '1%' }}
                />
                ;
              </div>
              <div className='block_5--content-right'>
                <img
                  src='https://cdn.apifox.cn/www/assets/image/index/design.3.png'
                  alt='展示图片'
                />
              </div>
            </div>
          </div>
        </div>
        {/*  8  */}
        <div className='block_5'>
          <div className='block_5--tag'>
            <Tag bordered={false} color='volcano' style={{ fontSize: '20px' }}>
              MOCK
            </Tag>
          </div>
          <div className='block_5--content'>
            <div className='block_5--content-right'>
              <img
                src='https://cdn.apifox.cn/www/assets/image/index/design.3.png'
                alt='展示图片'
              />
            </div>
            <div className='block_5--content-left'>
              <h1 style={{ color: '#9373ee' }}>零配置 Mock 数据</h1>
              <Collapse
                items={items4}
                defaultActiveKey={['1']}
                accordion
                style={{ marginTop: '1%' }}
              />
              ;
            </div>
          </div>
        </div>
        <div className='block_end'>
          {arr.map((item) => {
            return <IndexShow key={item.key} data={item}></IndexShow>
          })}
        </div>
      </div>
    </div>
  )
}

export default Index

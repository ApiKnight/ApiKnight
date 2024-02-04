// import the required dependencies and the function you are testing
import { describe, it, expect } from 'vitest'
import { mergeFlatArrays } from '../mergeFlatArrays'
import { FlatItem } from '@/types/mergeFlatArrays'

// create your describe block for the mergeFlatArrays tests
describe('mergeFlatArrays', () => {
  // add test cases within here using it or test

  it('should merge arrays based on the project_id and return ArrayItems', () => {
    // arrange the test data
    const arr_1 = [
      {
        id: '0405a317-908c-4fc5-86e6-716bc28bb30e',
        project_id: 1180,
        name: '登陆',
        parent_id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        project_id: 1180,
        name: '根目录',
        parent_id: null,
        type: 'FILE',
      },
      {
        id: '4206eea9-9399-422e-80d1-126a8a2e4d50',
        project_id: 1180,
        name: '认证',
        parent_id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        id: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
        project_id: 1180,
        name: '增加',
        parent_id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        id: 'e14ac416-d0e3-479f-856d-90381f53603e',
        project_id: 1180,
        name: '修改',
        parent_id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        id: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
        project_id: 1180,
        name: '删除',
        parent_id: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
    ]

    const arr_2 = [
      {
        id: '52d98383-3fd4-439e-afa9-b6561c0e141d',
        folder_id: '4206eea9-9399-422e-80d1-126a8a2e4d50',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-29 23:30:59',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签"],"desc":"","folder_id":"哈哈哈哈","notes":"来自分享的ApiKnight接口","name":"未命名接口"},"apiInfo":{"base":{"method":"GET","path":"","prefix":""},"request":{"params":[],"headers":[],"cookie":[],"body":"{}"},"response":{"status":0,"body":"{}"}}}',
        response_data: '{}',
        project_id: 1180,
        description: '无描述',
        name: '未命名接口',
        type: 'GET',
        parent_id: '4206eea9-9399-422e-80d1-126a8a2e4d50',
      },
      {
        id: '7c103ef9-3809-4592-a516-a6104fb1d5c6',
        folder_id: 'e14ac416-d0e3-479f-856d-90381f53603e',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-30 10:28:56',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签","查询"],"desc":"xxxxxxxxxx","folder_id":"e14ac416-d0e3-479f-856d-90381f53603e","notes":"来自分享的ApiKnight接口","name":"测试","api_id":"7c103ef9-3809-4592-a516-a6104fb1d5c6"},"apiInfo":{"base":{"method":"GET","path":"getTest","prefix":""},"request":{"params":[{"paramName":"data","type":"string","desc":"","required":false,"value":"xxx","id":1706579799013}],"headers":[],"cookie":[],"body":"{}"},"response":{"status":0,"body":"{\\"res\\":\\"xxxxx\\",\\"code\\":200,\\"message\\":\\"ok\\"}"}}}',
        response_data:
          '{"status":0,"body":"{\\"res\\":\\"xxxxx\\",\\"code\\":200,\\"message\\":\\"ok\\"}"}',
        project_id: 1180,
        description: 'xxxxxxxxxx',
        name: '测试',
        type: 'GET',
        parent_id: 'e14ac416-d0e3-479f-856d-90381f53603e',
      },
      {
        id: '80d50fed-fae3-495c-b827-714061654e5c',
        folder_id: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-29 23:30:59',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签"],"desc":"","folder_id":"删除","notes":"来自分享的ApiKnight接口","name":"未命名接口"},"apiInfo":{"base":{"method":"GET","path":"","prefix":""},"request":{"params":[],"headers":[],"cookie":[],"body":"{}"},"response":{"status":0,"body":"{}"}}}',
        response_data: '{}',
        project_id: 1180,
        description: '无描述',
        name: '未命名接口',
        type: 'GET',
        parent_id: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
      },
      {
        id: '88da142d-9857-46f2-ac6b-371a4654fcde',
        folder_id: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-29 23:30:59',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签"],"desc":"","api_id":"eaf9cf94-9a44-4406-a517-abf0ea906044","name":"增加数据","folder_id":"增加","notes":"来自分享的ApiKnight接口"},"apiInfo":{"base":{"method":"POST","path":"project_document/addData","prefix":""},"request":{"params":[],"headers":[],"cookie":[],"body":"{}"},"response":{"status":0,"body":"{}"}}}',
        response_data: '{}',
        project_id: 1180,
        description: '无描述',
        name: '增加数据',
        type: 'POST',
        parent_id: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
      },
      {
        id: 'b31e9633-e621-46ab-a9b4-a7bad3d687fa',
        folder_id: '0405a317-908c-4fc5-86e6-716bc28bb30e',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-29 23:30:59',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签"],"desc":"","api_id":"e2df2e2a-5eff-4669-9f11-d50cd7d2a5d6","name":"新建的接口","folder_id":"哈哈哈诶诶诶","notes":"来自分享的ApiKnight接口"},"apiInfo":{"base":{"method":"GET","path":"","prefix":"https://www.baidu.com"},"request":{"params":[],"headers":[],"cookie":[],"body":"{}"},"response":{"status":0,"body":"{}"}}}',
        response_data: '{}',
        project_id: 1180,
        description: '无描述',
        name: '新建的接口',
        type: 'GET',
        parent_id: '0405a317-908c-4fc5-86e6-716bc28bb30e',
      },
      {
        id: 'e579f2d1-2ec1-403b-84b0-9b8a9829838b',
        folder_id: 'e14ac416-d0e3-479f-856d-90381f53603e',
        create_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        create_time: '2024-01-29 23:30:59',
        operate_time: '2024-01-29 23:30:59',
        operate_user: '0d5bee02-344d-42e7-b2cf-1493030f80f9',
        request_data:
          '{"meta_info":{"created":1706542234675,"status":0,"owner_id":"0d5bee02-344d-42e7-b2cf-1493030f80f9","tags":["默认标签","未发布"],"desc":"","api_id":"e83f0191-e8c1-46a4-9f57-0c609dd5e96e","name":"修改表project_document","folder_id":"修改","notes":"来自分享的ApiKnight接口"},"apiInfo":{"base":{"method":"POST","path":"update/project_document","prefix":""},"request":{"params":[],"headers":[],"cookie":[],"body":"{\\n    \\"document_id\\": 1,\\n    \\"document_format\\": \\"PDF\\",\\n    \\"archive_date\\": \\"2023-01-20\\",\\n    \\"content_summary\\": \\"Project A report\\",\\n    \\"project_contract_number\\": 101\\n}"},"response":{"status":0,"body":"{\\"code\\":200,\\"message\\":\\"success\\"}"}}}',
        response_data: '{"code":200,"message":"success"}',
        project_id: 1180,
        description: '无描述',
        name: '修改表project_document',
        type: 'POST',
        parent_id: 'e14ac416-d0e3-479f-856d-90381f53603e',
      },
    ]

    const targetId = 1180

    // act: call the function with the test data
    const result = mergeFlatArrays(
      arr_1 as FlatItem[],
      arr_2 as FlatItem[],
      targetId,
    )

    // assert that the result is correct
    const expectedResult = [
      {
        key: '52d98383-3fd4-439e-afa9-b6561c0e141d',
        title: {
          key: '52d98383-3fd4-439e-afa9-b6561c0e141d',
          title: '未命名接口',
          pid: '4206eea9-9399-422e-80d1-126a8a2e4d50',
          type: 'GET',
        },
        pid: '4206eea9-9399-422e-80d1-126a8a2e4d50',
        type: 'GET',
      },
      {
        key: '7c103ef9-3809-4592-a516-a6104fb1d5c6',
        title: {
          key: '7c103ef9-3809-4592-a516-a6104fb1d5c6',
          title: '测试',
          pid: 'e14ac416-d0e3-479f-856d-90381f53603e',
          type: 'GET',
        },
        pid: 'e14ac416-d0e3-479f-856d-90381f53603e',
        type: 'GET',
      },
      {
        key: '80d50fed-fae3-495c-b827-714061654e5c',
        title: {
          key: '80d50fed-fae3-495c-b827-714061654e5c',
          title: '未命名接口',
          pid: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
          type: 'GET',
        },
        pid: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
        type: 'GET',
      },
      {
        key: '88da142d-9857-46f2-ac6b-371a4654fcde',
        title: {
          key: '88da142d-9857-46f2-ac6b-371a4654fcde',
          title: '增加数据',
          pid: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
          type: 'POST',
        },
        pid: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
        type: 'POST',
      },
      {
        key: 'b31e9633-e621-46ab-a9b4-a7bad3d687fa',
        title: {
          key: 'b31e9633-e621-46ab-a9b4-a7bad3d687fa',
          title: '新建的接口',
          pid: '0405a317-908c-4fc5-86e6-716bc28bb30e',
          type: 'GET',
        },
        pid: '0405a317-908c-4fc5-86e6-716bc28bb30e',
        type: 'GET',
      },
      {
        key: 'e579f2d1-2ec1-403b-84b0-9b8a9829838b',
        title: {
          key: 'e579f2d1-2ec1-403b-84b0-9b8a9829838b',
          title: '修改表project_document',
          pid: 'e14ac416-d0e3-479f-856d-90381f53603e',
          type: 'POST',
        },
        pid: 'e14ac416-d0e3-479f-856d-90381f53603e',
        type: 'POST',
      },
      {
        key: '0405a317-908c-4fc5-86e6-716bc28bb30e',
        title: {
          key: '0405a317-908c-4fc5-86e6-716bc28bb30e',
          title: '登陆',
          pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          type: 'FILE',
        },
        pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        key: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        title: {
          key: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          title: '根目录',
          pid: null,
          type: 'FILE',
        },
        pid: null,
        type: 'FILE',
      },
      {
        key: '4206eea9-9399-422e-80d1-126a8a2e4d50',
        title: {
          key: '4206eea9-9399-422e-80d1-126a8a2e4d50',
          title: '认证',
          pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          type: 'FILE',
        },
        pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        key: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
        title: {
          key: 'bc441fc6-af93-4c2e-88a4-13c0f14bc0b7',
          title: '增加',
          pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          type: 'FILE',
        },
        pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        key: 'e14ac416-d0e3-479f-856d-90381f53603e',
        title: {
          key: 'e14ac416-d0e3-479f-856d-90381f53603e',
          title: '修改',
          pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          type: 'FILE',
        },
        pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
      {
        key: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
        title: {
          key: 'e7eaeba6-a378-480f-ac85-a383b97e82f4',
          title: '删除',
          pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
          type: 'FILE',
        },
        pid: '2b960ccc-1c98-4eb7-b56c-f763268d32b3',
        type: 'FILE',
      },
    ]

    // 请确保 arr_1 中每个项目的 type 字段替换为根据其 request_data 中 apiInfo.base.method 解析得到的具体 HTTP 方法
    // 示例中仅对第一项进行了替换，其他项目的 type 应该以相同的方式解析并替换

    expect(result).toEqual(expectedResult)
  })
})

import type { MockMethod } from 'vite-plugin-mock'
import { faker } from '@faker-js/faker'
import type { ResponseParams } from './mock.js'

let id = 0
const createId = () => {
  id += 1
  return id
}

const create = (attrs?: Partial<IItems>): IItems => {
  return {
    id: createId(),
    user_id: 1,
    amount: faker.datatype.number({ min: 99, max: 100_00, precision: 0.01 }),
    tag_ids: [1, 2],
    happen_at: faker.date.past().toISOString(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    kind: 'expenses',
    ...attrs
  }
}

const createList = (n: number, attrs?: Partial<IItems>): IItems[] => {
  return Array.from({ length: n }).map(() => create(attrs))
}

const createResponse = ({ count = 10, perPage = 10, page = 1 }, attrs?: Partial<IItems>): IResources<IItems> => {
  const sendCount = (page - 1) * perPage
  const left = count - sendCount
  return {
    resources: left > 0 ? createList(Math.min(left, perPage), attrs) : [],
    pager: {
      page,
      per_page: perPage,
      count
    }
  }
}

export default [
  {
    url: '/api/v1/items',
    method: 'get',
    statusCode: 200,
    timeout: 300,
    response: ({ query }: ResponseParams): IResources<IItems> => {
      return createResponse({ count: 33, perPage: 10, page: parseInt(query.page) })
    }
  },
] as MockMethod[]

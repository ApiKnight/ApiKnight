import { createMapperHooksStore } from '@apiknight/store'

const createFileStateStore = createMapperHooksStore<boolean>(false)

export const useCreateFileState = createFileStateStore.useStoreValue

export const setCreateFileState = createFileStateStore.setStoreValue

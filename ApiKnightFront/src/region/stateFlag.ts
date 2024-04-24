import { createMapperHooksStore } from '@apiknight/store'

const stateFlagStore = createMapperHooksStore<boolean>(false)

export const useStateFlag = stateFlagStore.useStoreValue

export const setStateFlag = stateFlagStore.setStoreValue

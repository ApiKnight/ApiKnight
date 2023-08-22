import {
  useSelector,
  useDispatch,
  shallowEqual,
  TypedUseSelectorHook,
} from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterSlice.ts'
import projectReducer from './modules/projectSlice.ts'
import dirArrayReducer from './modules/dirArraySlice.ts'
import watchDirReducer from './modules/watchDir.ts'
import watchStateFlagReducer from './modules/stateFlag.ts'
import createFileStateReducer from './modules/createFileState.ts'
// 文档编辑
import documentReducer from './modules/document.ts'
// 运行/mock
import mockReducer from './modules/mock.ts'
// 文档
import introductionReducer from './modules/introduction.ts'

import tabSliceReducer from '@/store/modules/tabSlice'
import tabsSliceReducer from '@/store/modules/tabsSlice'
import rightSliceReducer from '@/store/modules/rightSlice'
import showRightMenuReducer from '@/store/modules/showRightMenu'

// import roleReducer from '@/store/modules/roleSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
    dirArray: dirArrayReducer,
    watchDir: watchDirReducer,
    stateFlag: watchStateFlagReducer,
    createFileState: createFileStateReducer,
    document: documentReducer,
    mock: mockReducer,
    introduction: introductionReducer,
    tabSlice: tabSliceReducer,
    tabsSlice: tabsSliceReducer,
    rightSlice: rightSliceReducer,
    showRightMenu: showRightMenuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      //关闭序列化状态检测中间件
      serializableCheck: false,
    }),
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const shallowEqualApp = shallowEqual

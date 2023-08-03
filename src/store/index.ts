import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counterSlice.ts'
import projectReducer from './modules/projectSlice.ts'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

import React from 'react'
import type { RootState } from '../store/index.ts'
import { useSelector, useDispatch } from 'react-redux'
import {
  decrement,
  increment,
  incrementByAmount,
} from '../store/modules/counterSlice.ts'

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label='Increment value'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        {/* 自定义传参给action */}
        <button
          aria-label='Decrement value'
          onClick={() => dispatch(incrementByAmount(2))}
        >
          incrementByAmount
        </button>
      </div>
    </div>
  )
}

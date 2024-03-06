import { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

type Options = {
  /**
   * 滚动节流时间设置，默认 10ms
   */
  scrollThreshold?: number
  /**
   * 滚动完成防抖时间设置，默认 500ms
   */
  scrollFinshedThreshold?: number
  /**
   * 监听滚动区域最小 scrollTop 值，单位px，默认 0，也就是scrollTop >=0 就触发重新渲染
   */
  minCriticalvalue?: number
  /**
   * 监听滚动最大 scrollTop 值，单位px，默认 100000 ，也就是scrollTop <=100000 就触发重新渲染
   */
  maxCriticalvalue?: number
}

export function useScrollTop({
  scrollThreshold = 10,
  scrollFinshedThreshold = 500,
  minCriticalvalue = 0,
  maxCriticalvalue = 100000,
}: Options = {}) {
  const [state, setState] = useState({
    scrollTop: 0,
    scrolling: false,
  })
  useEffect(() => {
    // 滚动状态
    let scrolling = false
    // 获取初始值
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop

    // 初始值不正确进行校验
    if (
      scrollTop !== state.scrollTop &&
      scrollTop >= minCriticalvalue &&
      scrollTop < maxCriticalvalue
    ) {
      setState({ scrollTop: scrollTop, scrolling: state.scrolling })
    }

    // 触发 setScrollTop 统一到此处
    function handleChangeScrollTop(newScrollTop: number): void {
      // 更新外部状态
      setState({
        scrollTop: newScrollTop,
        scrolling,
      })
      // 更新内部状态
      scrollTop = newScrollTop
    }

    // scrollThreshold 大于 0 才有使用 throttle 的必要
    const handleScroll =
      scrollThreshold > 0
        ? throttle(
            (newScrollTop: number) => {
              // 滚动中才触发，预防和结束事件冲突
              if (scrolling) {
                handleChangeScrollTop(newScrollTop)
              }
            },
            scrollThreshold,
            { leading: true, trailing: false },
          )
        : handleChangeScrollTop

    // 滚动结束事件
    const scrollEnd = debounce(
      (newScrollTop) => {
        // 未结束才触发，不然又可能划出界限直接结束，导致上一次的 scrollEnd 还没结束。
        if (scrolling) {
          scrolling = false
          handleChangeScrollTop(newScrollTop)
        }
      },
      scrollFinshedThreshold,
      { leading: false, trailing: true },
    )

    function scrollFn(): void {
      // 获取 scrollTop
      const newScrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop

      if (
        (newScrollTop <= minCriticalvalue && scrollTop >= minCriticalvalue) ||
        (newScrollTop >= maxCriticalvalue && scrollTop <= maxCriticalvalue)
      ) {
        // 滚动出界限直接结束
        scrolling = false
        handleChangeScrollTop(newScrollTop)
        return
      } else if (
        newScrollTop >= minCriticalvalue &&
        newScrollTop <= maxCriticalvalue
      ) {
        // 在界限内滚动，才触发改变事件
        scrolling = true
        // 更新 state
        handleScroll(newScrollTop)
        // 使用被 debounce 的函数来模拟滚动结束
        scrollEnd(newScrollTop)
      }
    }
    // 监听 scroll 事件
    window.addEventListener('scroll', scrollFn)
    return (): void => {
      // 注销 scroll 事件
      window.removeEventListener('scroll', scrollFn)
    }
  }, [])
  return state
}

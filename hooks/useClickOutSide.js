import { useEffect } from 'react'

//
/// 외부 클릭시 닫기
export const useClickOutSide = ({ ref, state, handler }) => {
  const clickModalOutside = event => {
    if (state && !ref.current?.contains(event.target)) {
      handler()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside)
    return () => {
      document.removeEventListener('mousedown', clickModalOutside)
    }
  }, [state])
}

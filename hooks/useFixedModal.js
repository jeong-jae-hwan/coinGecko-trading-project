import { useEffect } from 'react'

//
/// 모달 팝업 스크롤 고정
export const useFixedModal = ({ ref, state, handler }) => {
  const clickModalOutside = event => {
    if (state && !ref.current?.contains(event.target)) {
      handler()
    }
  }

  useEffect(() => {
    ref.current?.scrollTo(0, 0)

    if (state) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }

    document.addEventListener('mousedown', clickModalOutside)
    return () => {
      document.removeEventListener('mousedown', clickModalOutside)
    }
  }, [state])
}

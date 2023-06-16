import React, { useRef } from 'react'
import { useRouter } from 'next/router'

//svg
import BetIcon from 'public/icons/between-icon.svg'
import CancelIcon from 'public/icons/x-tab-icon.svg'

//styled
import styled from '@emotion/styled'

//hooks
import { useClickOutSide } from 'hooks/useClickOutSide'
import { useQuery } from 'react-query'
import { fetchGetExchangeSet, fetchGetExchanges } from 'apis/api'
import { useFixedModal } from 'hooks/useFixedModal'

//components
import LoadingSpinner from './loading-spinner'

//
export default function ModalDetail() {
  const ref = useRef()
  const router = useRouter()

  // 외부 클릭시 모달 닫기 hooks
  useClickOutSide({
    ref: ref,
    state: router.query.id,
    handler: () => router.back(),
  })

  // 모달 오픈시 스크롤 중단
  useFixedModal({
    ref: ref,
    state: router.query.id,
    handler: () => router.back(),
  })

  // 데이터 가져오기
  const { data: reuslts, isLoading } = useQuery(
    ['market-set-data', router.query.id],
    () => fetchGetExchangeSet(router.query.id),
    {
      onSuccess: data => console.log(data),
      onError: err => console.log(err),
      enabled: router.query.id !== undefined,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <>
      {router.query.id && <Layer />}
      <DrawerBox ref={ref} isActive={router.query.id}>
        <Sticky>
          <CancelTab type="button" onClick={() => router.back()}>
            <CancelIcon />
          </CancelTab>
        </Sticky>

        <strong>{router.query.id} 거래쌍</strong>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Results>
            {reuslts?.data?.tickers?.map(item => {
              return (
                <li key={item}>
                  <span>{item?.base}</span>
                  <BetIcon />
                  <span className="end">{item?.target}</span>
                </li>
              )
            })}
          </Results>
        )}
      </DrawerBox>
    </>
  )
}

//
/// styled
const Layer = styled.div`
  z-index: 9000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.35);
`

const DrawerBox = styled.div`
  z-index: 9990;
  display: none;
  position: fixed;
  top: 0;
  right: ${({ isActive }) => (isActive ? 0 : '-100%')};
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background-color: #fff;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.08);
  overflow: auto;
  transition: 0.2s ease-in-out;
  padding: 0 20px 30px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1080px) {
    max-width: 320px;
    display: flex;
  }

  strong {
    font-size: 20px;
    text-transform: uppercase;
  }
`

const Sticky = styled.div`
  z-index: 9997;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 14px;
  right: 0;
  cursor: pointer;
`

const CancelTab = styled.button`
  display: flex;
  width: 24px;
  fill: #ccc;
`

const Results = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 10px;

  li {
    padding: 14px 16px;
    border-radius: 12px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;

    span {
      width: 110px;
    }

    .end {
      text-align: end;
    }

    svg {
      width: 18px;
    }
  }
`

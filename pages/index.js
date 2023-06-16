import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

//styled
import styled from '@emotion/styled'

//hooks
import { useQuery } from 'react-query'
import { fetchGetExchanges } from 'apis/api'

//components
import LoadingSpinner from '@/components/loading-spinner'
import ModalDetail from '@/components/modalDetail'

//
export default function Index() {
  const router = useRouter()
  const [sortDirection, setSortDirection] = useState('')

  console.log(sortDirection)

  // 데이터 가져오기
  const { data: marketData, isLoading } = useQuery(
    ['market-table'],
    () => fetchGetExchanges(),
    {
      onSuccess: data => {},
      onError: err => console.log(err),
      refetchOnWindowFocus: false,
    }
  )

  // 데이터를 솔팅함수
  const sortData = (data, direction) => {
    return data.sort((a, b) => {
      const valueA = a.trade_volume_24h_btc || 0
      const valueB = b.trade_volume_24h_btc || 0
      if (direction === 'asc') {
        return valueA - valueB
      } else if (direction === 'desc') {
        return valueB - valueA
      }
      return 0 // Return 0 for no sorting direction
    })
  }

  // marketData를 정렬 적용
  const sortedMarketData = sortData(marketData?.data || [], sortDirection)

  if (isLoading) {
    return (
      <Section>
        <LoadingSpinner />
      </Section>
    )
  }

  return (
    <>
      <Section>
        <TitleBox>
          <h1>거래소 목록</h1>

          <div>
            <Tab
              isActive={sortDirection === 'asc'}
              type="button"
              onClick={() => setSortDirection('asc')}
            >
              높은순
            </Tab>

            <Tab
              isActive={sortDirection === 'desc'}
              type="button"
              onClick={() => setSortDirection('desc')}
            >
              낮은순
            </Tab>
          </div>
        </TitleBox>

        <Tabled>
          <thead>
            <Tr>
              <Th width="200px">거래소</Th>
              <Th width="400px">거래량</Th>
            </Tr>
          </thead>

          <tbody>
            {sortedMarketData?.map(item => {
              return (
                <Tr
                  key={item?.id}
                  onClick={() =>
                    router.push({
                      query: {
                        id: item?.id,
                      },
                    })
                  }
                >
                  <Td width="200px">
                    <Image
                      src={item?.image}
                      alt={item?.name}
                      width={26}
                      height={26}
                      priority={true}
                    />
                    {item?.name}
                  </Td>

                  <Td width="400px">
                    <p>{item?.trade_volume_24h_btc}</p>
                  </Td>
                </Tr>
              )
            })}
          </tbody>
        </Tabled>
      </Section>

      <ModalDetail />
    </>
  )
}

//
//// styled
const Section = styled.section`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  padding: 50px 0;
`

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`

const Tab = styled.button`
  font-size: 15px;
  color: ${({ isActive }) => (isActive ? '#4A73FC' : '#666')};
`

const Tabled = styled.table`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  thead,
  tbody {
    width: 100%;
  }
`
const Tr = styled.tr`
  width: 100%;
  display: flex;
`

const Th = styled.th`
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #797979;
  background-color: #f8f8f8;

  @media (max-width: 600px) {
    min-width: 150px;
  }
`

const Td = styled.td`
  position: relative;
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
  height: ${({ height }) => height};
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 400;
  color: #444;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  cursor: pointer;
  display: flex;
  align-items: center;
  column-gap: 10px;

  @media (max-width: 600px) {
    min-width: 150px;
  }

  img {
    width: 26px;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
    border-radius: 100px;
  }

  p {
    width: 100%;
    text-align: center;
  }
`

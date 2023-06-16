import { useRouter } from 'next/router'
import React from 'react'

//styled
import styled from '@emotion/styled'

export default function Error() {
  const router = useRouter()

  return (
    <>
      <Section>
        <Title>페이지를 찾을 수 없습니다</Title>
        <Text>아래 버튼을 통해 이전페이지로 이동하세요.</Text>
        <Tab type="button" onClick={() => router.back()}>
          이동
        </Tab>
      </Section>
    </>
  )
}

//styled
const Section = styled.section`
  padding: 0 30px;
  height: 100vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    margin-bottom: 40px;
  }
`

const Title = styled.strong`
  width: 100%;
  font-size: 2.25rem;
  margin-bottom: 0.35em;
  line-height: 1.4;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`

const Text = styled.p`
  font-size: 0.938rem;
  color: #797979;

  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`

const Tab = styled.button`
  padding: 14px 28px;
  border-radius: 100px;
  background-color: #333;
  font-size: 1rem;
  color: #fff;
  margin-top: 30px;

  &:hover {
    background-color: #404040;
  }
`

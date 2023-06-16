import styled from '@emotion/styled'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <LoadingWrap>
      <Loading></Loading>
    </LoadingWrap>
  )
}

//styled
const LoadingWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`
const Loading = styled.span`
  width: 30px;
  height: 30px;
  border: 3px solid #ccc;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

import styled from 'styled-components'

export const AppWrapper = styled.div`
  margin: 0;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  flex-grow: 1;
`

export const Wrapper = styled.div`
  background: black;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const ContentWrapper = styled.div`
  flex: 1 0 auto;
  width: calc(100vw - 257px);
`

export const ChildWrapper = styled.div`
  padding: 30px 48px 30px 44px;
  overflow-y: scroll;
  height: calc(100vh - 76px);
`

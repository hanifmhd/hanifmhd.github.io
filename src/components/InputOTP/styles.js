import styled from 'styled-components'

export const Wrapper = styled.div`
  margin-top: 18px;
`

export const CodeWrapper = styled.div`
  display: flex;
`

export const CodeInput = styled.div`
  height: 64px;
  max-width: 56px;
  min-width: 56px;
  margin-right: 16px;

  & input {
    border: 1px solid;
    border-color: lightgrey;
    border-radius: 4px;
    text-align: center;
    width: 56px;
    height: inherit;
    font-size: 14px};
    font-family: Poppins;
    color: black;
    font-size: 24px;
    font-weight: 500;

    :focus {
      border-color: red;
    }
  }
`

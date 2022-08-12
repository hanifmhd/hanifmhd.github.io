import styled from 'styled-components'

/* eslint-disable  */
export const InputBox = styled.div`
border: 1px solid #D7DCDF;
    border-radius: 4px;
    position: relative;
    width: 100%;
    color: #00253A;
`;
export const InputWrap = styled.div`
    position: relative;
    display: inline-flex;
    justify-content: center;
`;

export const InputLabel = styled.div`
    left: 0;
    padding: 10px 0px 10px 6px;
`;

export const InputValue = styled.p`
    min-width: 170px;
    display: block;
    padding: 10px 0px 10px 6px;
    margin: 0;
`;

export const ErrorText = styled.p`
  color: red;
  font-size: 12px;
`


/* eslint-disable  */
export const InputWrapper = styled.div`
  & input {
    &:focus {
      outline: none;
      border: 1px solid grey
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
`;

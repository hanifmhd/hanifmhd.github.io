import styled from 'styled-components'

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

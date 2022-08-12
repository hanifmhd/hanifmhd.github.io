
import styled from 'styled-components'

export const InputWrapper = styled.div`
  width: 100%;
  margin: 0px 0 0 0;
  align-items: center;
  color: #00253A;
  font-size: 14px;
  font: Poppins;
  position: relative;
  
  label {
    font-family: Poppins;
    font-size: 16px;
    line-height: 175%;
    color: #00253A;
  }

  & .css-yk16xz-control {
    border-radius: 4px;
    border: 1px solid #E4E8EC;
    margin-bottom: 0px;

    width: 100%;
    border-color: red
    color: #00253A;
    ::placeholder {
      color:#fafafa
      opacity: 1;
    }

    :focus,
    :hover {
      border-color: #E4E8EC;
    }
  }

  & .css-1fhf3k1-control {
    border-radius: 3px;
    width: 100%;
    border: 1px solid;
    border-color: #E4E8EC;

    ::placeholder {
      color: #00253A;
      opacity: 1;
    }

    :focus,
    :hover {
      border-color: #E4E8EC;
    }
  }
  & . css-1insrsq-control {
    border-radius: 4px;
  }
  & .css-1pahdxg-control {
    border-radius: 3px;
    border: 1px solid;
    width: 100%;
    border-color: #E4E8EC;
    box-shadow: none;

    ::placeholder {
      color: #fafafa;
      opacity: 1;
    }

    :focus,
    :hover,
    :active {
      border: 1px solid #E4E8EC;
    }
  }

  & .css-1hwfws3 {
    width: 100%;
  }
  & .css-319lph-ValueContainer {
    padding: 1.5px 8px !important;
  }


  [class$='placeholder'] {
    color: #BABEC1;
    font-family: Poppins;
  }

  [class$='singleValue'] {
    color: #00253A;
    font-family: Poppins;
  }

  input {
    width: 90%;
    border: 1px solid #fafafa;
    border-color: grey;
    border-radius: 4px;
    padding: 8px 16px;
    line-height: 1;
    &:focus {
      border: 1px solid #E4E8EC;
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
`

export const IconRight = styled.span`
  position: absolute;
    right: 10px;
    top: 5px;
    padding: 0.5em 1em;
    background-color: white;
`

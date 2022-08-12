import styled from 'styled-components'

export const Links = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 15px;
  width: 150px;
  background: #ffffff;
  border-radius: 4px;
  filter: drop-shadow(0px 3px 4px rgba(0, 0, 0, 0.15));
  overflow: hidden;
  button {
    width: 100%;
    background: white;
    cursor: pointer;
    border: none;
    font-family: Poppins;
    font-size: 13px;
    color: #565656;
    text-align: left;
    padding: 10px 16px;
    border-bottom: 1px solid #e9ecef;
  border: 1px solid #009933;

    &:hover {
      opacity: 0.7;
    }
  }
`

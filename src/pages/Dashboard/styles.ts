import styled from "styled-components";

import { shade } from "polished";

export const Title = styled.h1`
  font-size: 48px;
  color: #fff;
  max-width: 450px;
  line-height: 56px;
  margin-top: 15px;
`;

export const Form = styled.form`
  margin-top: 10px;
  max-width: 1000px;
  display: flex;

  input {
    flex: 1;
    height: 30px;
    padding-left: 8px;
    border: #e0b50f;
    border-radius: 5px 0px 0px 5px;
    color: #fff;
    border-right: 0;
    background: #63941b;

    &::placeholder {
      color: #fff;
    }
  }

  button {
    width: 160px;
    background-color: #e0b50f;
    border-radius: 0px 5px 5px 0px;
    border: #63941b;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, "#E0B50F")};
    }
  }
`;

export const Products = styled.div`
  margin-top: 80px;
  max-width: 1000px;

  a {
    background: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(6px);
    }

    & + a {
      margin-top: 16px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cdcdb6;
    }
  }
`;

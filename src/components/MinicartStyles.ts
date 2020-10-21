import styled, { css } from 'styled-components';

interface ContainerProps {
  invertedHeader?: boolean;
  showCart?: boolean;
}

interface BackdropProps {
  showCart?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 345px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(100%);
  z-index: 1;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;

  transition: transform 0.4s ease-out;

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
  }

  strong {
    font-weight: bold;
  }

  ${({ showCart }) =>
    showCart &&
    css`
      transform: translateX(0);
    `}

  header {
    height: 58px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;

    ${({ invertedHeader }) =>
      invertedHeader &&
      css`
        flex-direction: row-reverse;
      `}

    .wrapper {
      flex: 1;
      display: flex;
      align-items: center;

      font-size: 18px;
      color: #fff;

      i {
        margin-right: 8px;
      }
    }
  }

  header,
  .items-container {
    padding: 0 16px;
  }

  > .wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .installments-container {
      padding: 8px 0;

      font-size: 14px;
      text-align: center;
      color: #000;

      background-color: #fff;
    }

    .empty-message {
      margin-top: 80px;

      font-size: 14px;
      font-weight: bold;
      text-align: center;
      color: #000;
    }

    .btn-buy,
    .btn-keep-buying {
      width: 100%;
      padding: 16px 0;

      text-align: center;
      color: #fff;

      background-color: #000;
    }
  }
`;

export const Backdrop = styled.div<BackdropProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%);
  background-color: rgba(0, 0, 0, 0.4);

  transition: transform 0.4s ease-out;

  ${({ showCart }) =>
    showCart &&
    css`
      transform: translateX(0);
    `}
`;

import styled from 'styled-components';

export const Container = styled.div`
  > * {
    padding: 8px 16px;
  }

  .subtotal {
    display: flex;
    justify-content: space-between;

    font-size: 14px;
  }

  form {
    display: flex;
    align-items: center;

    input {
      flex: 1;
      padding-left: 8px;

      &::placeholder {
        color: #ccc;
      }
    }

    input,
    button {
      height: 34px;
      border: 1px solid #eee;

      font-size: 14px;
    }

    button {
      width: 75px;
      margin-left: 8px;
    }
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &,
    .coupon,
    .postal-code {
      font-size: 14px;
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px;
  overflow-y: auto;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  img {
    max-width: 54px;
    margin-right: 8px;
  }

  .wrapper {
    flex: 1;

    .product-name {
      max-width: 185px;
      overflow: hidden;

      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .sku {
      font-size: 14px;
    }

    .price-quantity-wrapper {
      .price-container {
        margin: 8px 0;

        font-size: 14px;
        font-weight: bold;

        .list-price {
          text-decoration: line-through;
        }
      }

      .quantity-container {
        > *:not(:first-child) {
          margin-left: 8px;
        }

        &,
        button {
          display: flex;
          align-items: center;
        }

        button {
          width: 24px;
          height: 24px;
          justify-content: center;
          border: 1px solid #000;

          font-size: 20px;
        }
      }
    }
  }
`;

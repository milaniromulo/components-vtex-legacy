import React, { Dispatch } from 'react';

import formatValue from '../../utils/formatValue';
import { CartInformationsProps } from '../Minicart';

import { Container, Item } from './ItemsStyles';

interface SkuProps {
  productId: string;
  imageUrl: string;
  name: string;
  skuName: string;
  price: number;
  sellingPrice: number;
  quantity: number;
}

interface ItemsProps {
  cart: CartInformationsProps;
  setCart: Dispatch<CartInformationsProps>;
  showSku?: boolean;
  skuTitle?: string;
  showQuantity?: boolean;
  removeIcon: string;
}

declare const vtexjs: any;

export const Items: React.FC<ItemsProps> = ({
  cart,
  setCart,
  showSku,
  skuTitle,
  showQuantity,
  removeIcon,
}) => {
  const handleQuantityProduct = async (index: number, isIncrease: boolean) => {
    if (!isIncrease && cart.items[index].quantity === 1) return;

    const itemToUpdate = {
      index: index,
      quantity: isIncrease
        ? cart.items[index].quantity + 1
        : cart.items[index].quantity - 1,
    };

    const response = await vtexjs.checkout.updateItems(
      [itemToUpdate],
      null,
      false
    );

    setCart(response);
  };

  const handleRemoveProduct = async (index: number) => {
    const itemsToRemove = {
      index,
      quantity: 0,
    };

    const response = await vtexjs.checkout.removeItems([itemsToRemove]);

    setCart(response);
  };

  return (
    <Container className="items-container">
      {cart.items.map((item: SkuProps, index: number) => (
        <Item key={item.productId} className="item">
          <img src={item.imageUrl} alt="Imagem do produto" />

          <div className="wrapper">
            <div className="product-name">{item.name}</div>

            {showSku && (
              <div className="sku">
                {skuTitle}: <strong className="sku-name">{item.skuName}</strong>
              </div>
            )}

            <div className="price-quantity-wrapper">
              <div className="price-container">
                {item.price > item.sellingPrice && (
                  <span className="list-price">{formatValue(item.price)}</span>
                )}

                <span className="best-price">
                  {formatValue(item.sellingPrice)}
                </span>
              </div>

              {showQuantity && (
                <div className="quantity-container">
                  <button
                    className="btn-decrease"
                    onClick={() => handleQuantityProduct(index, false)}
                  >
                    -
                  </button>

                  <span className="quantity">{item.quantity}</span>

                  <button
                    className="btn-increase"
                    onClick={() => handleQuantityProduct(index, true)}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            className="btn-remove"
            onClick={() => handleRemoveProduct(index)}
          >
            <i dangerouslySetInnerHTML={{ __html: removeIcon }}></i>
          </button>
        </Item>
      ))}
    </Container>
  );
};

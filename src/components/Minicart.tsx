import React, { useEffect, useState } from 'react';

import cartMockup from '../utils/cartMockup';
import formatValue from '../utils/formatValue';
import { Items } from './minicart/Items';
import { Totalizers } from './minicart/Totalizers';

import { Container, Backdrop } from './MinicartStyles';
import { GlobalStyles } from '../styles/globalStyles';

export interface MinicartProps {
  triggerElementSelector: string;
  title: string;
  titleIcon?: string;
  closeIcon: string;
  invertedHeader?: boolean;

  showSku?: boolean;
  skuTitle?: string;
  showQuantity?: boolean;
  removeIcon: string;

  showInstallments?: boolean;
  buyButtonText: string;

  emptyMessage: string;
  keepBuyingButtonText: string;

  developmentEnvironment?: boolean;
}

export interface CartInformationsProps {
  [key: string]: any;
}

declare const vtexjs: any;

export const Minicart: React.FC<MinicartProps> = ({
  triggerElementSelector,
  title,
  titleIcon,
  closeIcon,
  invertedHeader,
  showSku,
  skuTitle,
  showQuantity,
  removeIcon,
  showInstallments,
  buyButtonText,
  emptyMessage,
  keepBuyingButtonText,
  developmentEnvironment,
}) => {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState<CartInformationsProps>({});

  useEffect(() => {
    const triggerElement: HTMLElement | null = document.querySelector(
      triggerElementSelector
    );

    triggerElement &&
      triggerElement.addEventListener('click', function() {
        setShowCart(true);
      });
  }, []);

  useEffect(() => {
    if (!showCart) return;

    async function getItems() {
      if (developmentEnvironment) {
        const response = cartMockup;

        setCart(response);

        return;
      }

      const response = await new vtexjs.Checkout().getOrderForm();

      setCart(response);
    }

    getItems();
  }, [showCart]);

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleCheckOut = async () => {
    window.location.href = '/checkout';
  };

  return (
    <>
      <Container
        className="minicart-container"
        invertedHeader={invertedHeader}
        showCart={showCart}
      >
        <header>
          <div className="wrapper">
            {titleIcon && (
              <i dangerouslySetInnerHTML={{ __html: titleIcon }}></i>
            )}

            {title}
          </div>

          <button className="btn-close" onClick={handleCloseCart}>
            <i dangerouslySetInnerHTML={{ __html: closeIcon }}></i>
          </button>
        </header>

        <div className="wrapper">
          {cart?.items?.length ? (
            <>
              <Items
                cart={cart}
                setCart={setCart}
                showSku={showSku}
                skuTitle={skuTitle}
                showQuantity={showQuantity}
                removeIcon={removeIcon}
              />

              <div className="totalizers-installments-buy-wrapper">
                <Totalizers
                  cart={cart}
                  setCart={setCart}
                  removeIcon={removeIcon}
                />

                {showInstallments && (
                  <div className="installments-container">
                    Em até{' '}
                    <strong>
                      {
                        cart.paymentData.installmentOptions[0].installments[
                          cart.paymentData.installmentOptions[0].installments
                            .length - 1
                        ].count
                      }
                      X{' '}
                    </strong>
                    de{' '}
                    <strong>
                      {formatValue(
                        cart.paymentData.installmentOptions[0].installments[
                          cart.paymentData.installmentOptions[0].installments
                            .length - 1
                        ].value
                      )}
                    </strong>{' '}
                    sem juros
                  </div>
                )}

                <button className="btn-buy" onClick={handleCheckOut}>
                  {buyButtonText}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="empty-message">{emptyMessage}</div>

              <button className="btn-keep-buying" onClick={handleCloseCart}>
                {keepBuyingButtonText}
              </button>
            </>
          )}
        </div>
      </Container>

      <Backdrop showCart={showCart} onClick={handleCloseCart} />

      <GlobalStyles />
    </>
  );
};

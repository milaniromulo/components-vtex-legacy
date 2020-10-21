import React, { Dispatch, FormEvent, useEffect, useState } from 'react';

import formatValue from '../../utils/formatValue';

import { CartInformationsProps } from '../Minicart';

import { Container } from './TotalizersStyles';

interface TotalizersProps {
  cart: CartInformationsProps;
  setCart: Dispatch<CartInformationsProps>;
  removeIcon: string;
}

declare const vtexjs: any;

export const Totalizers: React.FC<TotalizersProps> = ({
  cart,
  setCart,
  removeIcon,
}) => {
  const [coupon, setCoupon] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [showInformationCoupon, setShowInformationCoupon] = useState(false);
  const [showLogisticsInfo, setShowLogisticsInfo] = useState(false);

  useEffect(() => {
    if (cart.marketingData?.coupon) {
      setCoupon(cart.marketingData.coupon);
      setShowInformationCoupon(true);
    }
  }, []);

  const handleAddCoupon = async (e: FormEvent) => {
    e.preventDefault();

    const response = await vtexjs.checkout.addDiscountCoupon(coupon);

    setShowInformationCoupon(true);

    setCart(response);
  };

  const handleCalculateShipping = async (e: FormEvent) => {
    e.preventDefault();

    const address = {
      postalCode,
      country: 'BRA',
    };

    const response = await vtexjs.checkout.calculateShipping(address);

    setShowLogisticsInfo(true);

    setCart(response);
  };

  const handleRemoveCoupon = async () => {
    const response = await vtexjs.checkout.removeDiscountCoupon();

    setShowInformationCoupon(false);
    setCoupon('');
    setCart(response);
  };

  const handleRemovePostalCode = () => {
    setShowLogisticsInfo(false);
    setPostalCode('');
  };

  return (
    <Container className="totalizers-container">
      <div className="subtotal">
        Subtotal: <strong>{formatValue(cart.totalizers[0].value)}</strong>
      </div>

      {showInformationCoupon ? (
        <div className="wrapper">
          <span className="coupon">
            Cupom: <strong>{coupon}</strong>
          </span>

          <button className="btn-remove" onClick={handleRemoveCoupon}>
            <i dangerouslySetInnerHTML={{ __html: removeIcon }}></i>
          </button>
        </div>
      ) : (
        <form onSubmit={handleAddCoupon}>
          <input
            placeholder="ADICIONAR CUPOM"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
          />

          <button type="submit">Adicionar</button>
        </form>
      )}

      {showLogisticsInfo ? (
        <div className="wrapper">
          Frete:
          <strong className="postal-code">
            {postalCode} -{' '}
            {formatValue(cart.shippingData.logisticsInfo[0].slas[0].price)}
          </strong>
          <button className="btn-remove" onClick={handleRemovePostalCode}>
            <i dangerouslySetInnerHTML={{ __html: removeIcon }}></i>
          </button>
        </div>
      ) : (
        <form onSubmit={handleCalculateShipping}>
          <input
            placeholder="CALCULAR FRETE"
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
          />

          <button type="submit">Calcular</button>
        </form>
      )}

      <div className="wrapper">
        <div className="discounts">
          Descontos:{' '}
          <strong>
            {formatValue(
              cart.totalizers[1]?.id === 'Discounts'
                ? cart.totalizers[1].value
                : 0
            )}
          </strong>
        </div>

        <div className="total">
          Total: <strong>{formatValue(cart.value)}</strong>
        </div>
      </div>
    </Container>
  );
};

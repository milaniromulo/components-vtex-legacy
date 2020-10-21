import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Minicart } from '../src';
import { MinicartProps } from '../src/components/Minicart';

const btnStyles = {
  margin: '80px',
  padding: '8px 24px',
  border: '0',
  borderRadius: '0',
  cursor: 'pointer',

  color: '#fff',

  backgroundColor: '#000',
};

export default {
  title: 'Minicart',
  component: Minicart,
  decorators: [
    storyFn => (
      <div
        style={{ height: '100vh', position: 'relative', transform: 'scale(1)' }}
      >
        <button className="btn-minicart" style={btnStyles}>
          Minicart
        </button>
        {storyFn()}
      </div>
    ),
  ],
} as Meta;

const Component: Story<MinicartProps> = args => <Minicart {...args} />;

const closeIcon = `<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.19999 0L0 2.24998L6.65644 8.99998L0 15.75L2.19999 18L11 9.00002L2.19999 0Z" fill="#6C6C6C"/></svg>`;

export const Default = Component.bind({});
Default.args = {
  triggerElementSelector: '.btn-minicart',
  title: 'MINHA SACOLA',
  closeIcon,
  removeIcon: closeIcon,
  buyButtonText: 'FINALIZAR COMPRA',
  emptyMessage: 'Sua sacola está vazia. Continue comprando!',
  keepBuyingButtonText: 'CONTINUAR COMPRANDO',
  developmentEnvironment: true,
};

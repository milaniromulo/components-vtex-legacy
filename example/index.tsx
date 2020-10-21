import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Minicart } from '../src';

const closeIcon = `<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.19999 0L0 2.24998L6.65644 8.99998L0 15.75L2.19999 18L11 9.00002L2.19999 0Z" fill="#6C6C6C"/></svg>`;

const removeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.22872 18.7713C4.92376 18.4663 4.92376 17.9719 5.22872 17.6669L17.6669 5.22873C17.9719 4.92378 18.4663 4.92378 18.7713 5.22873C19.0762 5.53369 19.0762 6.02812 18.7713 6.33307L6.33306 18.7713C6.0281 19.0762 5.53367 19.0762 5.22872 18.7713Z" fill="#897E82"></path>
<path d="M5.51917 5.22872C5.82412 4.92376 6.31856 4.92376 6.62351 5.22872L18.7713 17.3765C19.0762 17.6814 19.0762 18.1759 18.7713 18.4808C18.4663 18.7858 17.9719 18.7858 17.6669 18.4808L5.51917 6.33306C5.21421 6.0281 5.21421 5.53367 5.51917 5.22872Z" fill="#897E82"></path></svg>`;

const App = () => {
  return (
    <div>
      <Minicart
        triggerElementSelector=".btn-minicart"
        title="MINHA SACOLA"
        closeIcon={closeIcon}
        removeIcon={removeIcon}
        buyButtonText="FINALIZAR COMPRA"
        emptyMessage="Sua sacola está vazia. Continue comprando!"
        keepBuyingButtonText="CONTINUAR COMPRANDO"
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

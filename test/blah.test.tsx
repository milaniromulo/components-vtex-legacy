import React from 'react';
import * as ReactDOM from 'react-dom';

import { Default as Minicart } from '../stories/Minicart.stories';

describe('Minicart', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Minicart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});

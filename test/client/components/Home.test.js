import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Home from '../../../app/components/Home';
import Messages from '../../../app/components/Messages';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Home component', () => {
  const component = shallow(<Home store={mockStore({ messages: {} })}/>).shallow();

  it('contains a welcome header', () => {
    expect(component.find('h1')).to.have.length(1);
  });

  it('contains flash messages component', () => {
    expect(component.find(Messages)).to.have.length(1);
  });
});

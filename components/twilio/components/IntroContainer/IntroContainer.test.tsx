import React from 'react';
import IntroContainer from './IntroContainer';
import { shallow } from 'enzyme';

describe('the IntroContainer component', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <IntroContainer>
        <span>Test Content</span>
      </IntroContainer>
    );

    expect(wrapper.find('span').text()).toBe('Test Content');
  });

  it('should render subcontent when provided', () => {
    const wrapper = shallow(
      <IntroContainer subContent={<h1>Test Sub Content</h1>}>
        <span>Test Content</span>
      </IntroContainer>
    );

    expect(wrapper.find('h1').text()).toBe('Test Sub Content');
  });
});

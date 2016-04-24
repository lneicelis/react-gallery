import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Search from './search';

describe('<Search />', () => {

  it('should update input value on change event', () => {
    const component = shallow(<Search onNeedleChange={() => {}}/>);
    const input = component.find('input');

    input.simulate('change', {target: {value: 'foo'}});

    expect(component.state('needle'))
      .to.equal('foo');
  });

  it('should clear button should clear input', () => {
    const component = shallow(<Search onNeedleChange={() => {}}/>);
    const input = component.find('input');
    const button = component.find('button');

    input.simulate('change', {target: {value: 'foo'}});

    expect(component.state('needle')).to.equal('foo');

    button.simulate('click');

    expect(component.state('needle')).to.equal('');
  });

  it('should call onNeedleChange callback with a needle', () => {
    const callback = sinon.spy();
    const component = shallow(<Search onNeedleChange={callback}/>);
    const input = component.find('input');
    const button = component.find('button');

    input.simulate('change', {target: {value: 'foo'}});

    expect(component.state('needle')).to.equal('foo');

    button.simulate('click');

    expect(callback.calledWith('foo')).to.equal(true);
  });
});
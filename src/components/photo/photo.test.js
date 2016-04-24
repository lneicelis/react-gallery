import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Photo from './photo';

describe('<Photo />', () => {
    it('should show loading indicator', () => {
        const component = shallow(<Photo src="http://localhost" />);

        expect(component.contains('loading..')).to.equal(true);
    });

    it('should NOT show loading indicator when photo is loaded', () => {
        const component = shallow(<Photo src="http://localhost" />);

        component.find('img').simulate('load');

        expect(component.contains('loading..')).to.equal(false);
    });

    it('should display title when image is loaded', () => {
        const component = shallow(<Photo
          src="http://localhost"
          title="test title" />);

        component.find('img').simulate('load');

        expect(component.contains('test title')).to.equal(true);
    });
});
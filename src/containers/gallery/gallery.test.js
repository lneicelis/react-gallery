import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Component from './gallery';

const Gallery = Component.WrappedComponent;

describe('<Gallery />', () => {
  let requestGalleryPhotos, searchByNeedle;

  beforeEach(() => {
    requestGalleryPhotos = sinon.spy();
    searchByNeedle = sinon.spy();
  });

  it('should request photos onComponentWillMount', () => {
    shallow(<Gallery
      photos={[]}
      filter={{needle: ''}}
      loading={false}
      requestGalleryPhotos={requestGalleryPhotos}
      searchByNeedle={searchByNeedle}
    />);

    expect(requestGalleryPhotos.calledOnce).to.equal(true);
  });

  it('should show loading indicator when photos are loading', () => {
    const component = shallow(<Gallery
      photos={[]}
      filter={{needle: ''}}
      loading={true}
      requestGalleryPhotos={requestGalleryPhotos}
      searchByNeedle={searchByNeedle}
    />);

    expect(component.contains('... some spinner here (fake timeout 1s) ...')).to.equal(true);
  });

  it('should list photos passed as a prop', () => {
    const component = shallow(<Gallery
      photos={[{
        url_m: 'http://photo',
        title: 'photo title'
      }]}
      filter={{needle: ''}}
      loading={false}
      requestGalleryPhotos={requestGalleryPhotos}
      searchByNeedle={searchByNeedle}
    />);

    expect(component.find('Photo').length).to.equal(1);
  });
});
import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {create} from '../store';
import api from '../../services/api';
import {requestGalleryPhotos} from './gallery';
import Promise from 'bluebird';

describe('gallery actions', () => {
  let store, mock;

  beforeEach(() => {
    mock = sinon.mock();
    api.getResponse = mock;
    store = create();
  });

  it('should change gallery.loading to true', () => {
    mock.returns(new Promise(() => {}));

    store.dispatch(requestGalleryPhotos());

    expect(store.getState().gallery.loading).to.equal(true);
  });

  it('should set photos on the state when response is resolved', () => {
    mock.returns(Promise.resolve({
      data: ['photo']
    }));

    store.dispatch(requestGalleryPhotos());

    setTimeout(() => {
      expect(store.getState().gallery.photos).to.equal(['photo']);
    });
  });

  it('should update cursor with response cursor', () => {
    mock.returns(Promise.resolve({
      cursor: 999
    }));

    store.dispatch(requestGalleryPhotos());

    setTimeout(() => {
      expect(store.getState().gallery.cursor).to.equal(999);
    });
  });

  it('should not make any further calls after response returns done: true', () => {
    mock.returns(Promise.resolve({
      done: true
    }));

    store.dispatch(requestGalleryPhotos());

    setTimeout(() => {
      expect(store.getState().gallery.done).to.equal(true);
      expect(api.getResponse.calledOnce).to.equal(true);
    });

    store.dispatch(requestGalleryPhotos());

    expect(api.getResponse.calledOnce).to.equal(true);
  });
});
import {GALLERY_PHOTOS_REQUEST, GALLERY_PHOTOS_FILTER} from '../action-types';
import {createHttpRequest} from '../../services/api';
import {GALLERY_PHOTOS} from '../../endpoints';

export function requestGalleryPhotos() {
    return function (dispatch, getState) {
        const {gallery} = getState();
        const {cursor, loading, allLoaded} = gallery;

        if (loading || allLoaded) {
            return;
        }

        dispatch({
            type: GALLERY_PHOTOS_REQUEST,
            request: createHttpRequest(GALLERY_PHOTOS)
                .withParams({cursor})
        });
    };
}

export function searchByNeedle(needle) {
    return function (dispatch, getState) {
        const {gallery} = getState();
        const {filter} = gallery;

        dispatch({
            type: GALLERY_PHOTOS_FILTER,
            filter: {
                ...filter,
                needle
            }
        });
    };
}
import {
  GALLERY_PHOTOS_REQUEST, GALLERY_PHOTOS_REQUEST_SUCCESS,
  GALLERY_PHOTOS_FILTER
} from '../action-types';

const defaultState = {
    filter: {
        needle: ''
    },
    photos: [],
    cursor: 0,
    allLoaded: false,
    loading: false,
    error: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case GALLERY_PHOTOS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GALLERY_PHOTOS_REQUEST_SUCCESS: {
            const {cursor, data, done} = action.response.data;

            return {
                ...state,
                cursor,
                photos: state.photos.concat(data),
                loading: false,
                error: false,
                allLoaded: done
            };
        }

        case GALLERY_PHOTOS_FILTER:
            return {
                ...state,
                filter: action.filter
            };

        default:
            return state;
    }
};
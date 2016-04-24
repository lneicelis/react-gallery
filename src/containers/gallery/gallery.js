import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

import style from './gallery.scss';
import photosFilter from '../../services/search';
import Photo from '../../components/photo/photo';
import Search from '../../components/search/search';

import {requestGalleryPhotos, searchByNeedle} from '../../redux/actions/gallery';

const stateToProps = state => ({
    photos: state.gallery.photos,
    filter: state.gallery.filter,
    loading: state.gallery.loading
});

const actionsToProps = dispatch => ({
    requestGalleryPhotos: () => dispatch(requestGalleryPhotos()),
    searchByNeedle: needle => dispatch(searchByNeedle(needle))
});

class Gallery extends React.Component {
    static propTypes = {
        photos: PropTypes.array,
        filter: PropTypes.object,
        loading: PropTypes.bool,
        requestGalleryPhotos: PropTypes.func,
        searchByNeedle: PropTypes.func
    };

    componentWillMount() {
        this.props.requestGalleryPhotos();
    }

    componentDidMount() {
        const listener = () => this.onScroll();

        window.addEventListener('scroll', listener);

        this.dispose = () => window.removeEventListener('scroll', listener);

        // If on initial load gallery is not filled
        // Then loading additional 10 pictures
        setTimeout(this.onScroll.bind(this));
    }

    componentWillUnmount() {
        this.dispose();
    }

    onScroll() {
        const element = window.document.body;
        const offsetBottom = element.scrollHeight - window.innerHeight - element.scrollTop;

        if (offsetBottom < 100) {
            this.props.requestGalleryPhotos();
        }
    }

    render() {
        const {photos, filter, loading, searchByNeedle} = this.props;
        const filterFn = photosFilter(filter.needle);
        const filteredPhotos = photos.filter(photo => filterFn(photo.title));

        return (
      <div className={style.gallery}>
        <div className={style.searchContainer}>
          <Search
            onNeedleChange={needle => searchByNeedle(needle)}
          />
        </div>

        {filteredPhotos.map((photo, index) => (
          <div key={index} className={style.cell}>
            <Photo
              src={photo.url_m}
              title={photo.title} />
          </div>
        ))}

        {loading && <div className={style.spinner}>
          ... some spinner here (fake timeout 1s) ...
        </div>}
      </div>
    );
    }
}

export default connect(stateToProps, actionsToProps)(Gallery);
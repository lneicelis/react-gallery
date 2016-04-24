import React, {PropTypes} from 'react';
import style from './photo.scss';

export default class Photo extends React.Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    constructor() {
        super();
        this.state = {
            loaded: false
        };
    }

    onLoaded() {
        this.setState({
            loaded: true
        });
    }

    render() {
        const loaded = this.state.loaded;
        const {src, title} = this.props;
        const containerStyle = {
            backgroundSize: 'cover',
            backgroundImage: loaded ? `url(${src})` : null
        };

        return (
          <div
            className={style.container}
            style={containerStyle}>
            {!loaded && <span>loading..</span>}

            {loaded && title && <div className={style.title}>{title}</div>}
            <img
              src={src}
              style={{display: 'none'}}
              onLoad={() => this.onLoaded()} />
          </div>
        );
    }
}
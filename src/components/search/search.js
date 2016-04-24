import React, {PropTypes} from 'react';

export default class Search extends React.Component {
    static propTypes = {
        onNeedleChange: PropTypes.function
    };

    constructor() {
        super();
        this.state = {
            needle: ''
        };
    }

    setNeedle(needle) {
        const {onNeedleChange} = this.props;

        this.setState({needle});
        if (onNeedleChange) {
            onNeedleChange(needle);
        }
    }

    render() {
        const {needle} = this.state;

        return (
      <div>
        <span>Search </span>

        <input
          type="text"
          value={needle}
          placeholder="Type here.."
          onChange={e => this.setNeedle(e.target.value)} />

        <button
          type="button"
          onClick={() => this.setNeedle('')}>
          Clear
        </button>
      </div>
    );
    }
}
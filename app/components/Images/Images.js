import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import { getAllImages } from '../../actions/images_actions';

class Images extends React.Component {

    componentDidMount() {
        console.log("FETCHING");
        this.props.dispatch(getAllImages());
    }

    render() {
        return(
            <div>
              <ImageList images={this.props.images} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
    }
};

export default connect(mapStateToProps)(Images);
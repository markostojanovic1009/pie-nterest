import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import { getLikedImages } from '../../actions/images_actions';

class Images extends React.Component {

    constructor() {
        super();
        const imageComponent = this;
        this.state = {
            listInfo: {
                type: "LIKED_IMAGES"
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getLikedImages(this.props.user, this.props.token));
    }

    render() {
        return(
            <div>
                <ImageList images={this.props.images} token={this.props.token} listInfo={this.state.listInfo}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        user: state.auth.user,
        token: state.auth.token
    }
};

export default connect(mapStateToProps)(Images);
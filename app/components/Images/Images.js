import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import Messages from '../Messages';
import { getAllImages, likeImage } from '../../actions/images_actions';

class Images extends React.Component {
    constructor() {
        super();
        const imageComponent = this;
        this.state = {
            listInfo: {
                type: "ALL_IMAGES",
                onLikeClick(imageId) {
                    imageComponent.props.dispatch(likeImage(imageComponent.props.user, imageComponent.props.token, imageId));
                }
            }
        }
    }

    componentDidMount() {
        this.props.dispatch(getAllImages(this.props.token));
    }

    render() {
        return(
            <div>
              <Messages messages={this.props.messages} />
              <ImageList listInfo={this.state.listInfo} images={this.props.images} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        images: state.images,
        user: state.auth.user,
        token: state.auth.token,
        messages: state.messages
    }
};

export default connect(mapStateToProps)(Images);
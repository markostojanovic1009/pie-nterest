import React from 'react';

class Image extends React.Component {

    handleImageError(event) {
        event.target.src = "/images/no_image_found.jpg";
    }

    onLikeButtonClick(imageId) {
        this.props.imageInfo.onLikeClick(imageId);
    }

    onDeleteButtonClick(imageId) {
        this.props.imageInfo.onDeleteClick(imageId);
    }

    render() {
        const { image, imageInfo, userId } = this.props ;

        const likeButton = (imageInfo.type === "ALL_IMAGES" && image.user_id !== userId) ?
            <button>
                <img className="like-icon" onClick={this.onLikeButtonClick.bind(this, image.id)} src={image.liked ? "/images/red_heart.png" : "/images/gray_heart.png" }/>
            </button> : null;

        const usersImage = (image.user_id === userId) ?
            <div className="image-owner">
                Your image
            </div> : null;

        const deleteButton = imageInfo.type === "USER_IMAGES" ?
            <button>
                <img className="delete-icon" onClick={this.onDeleteButtonClick.bind(this, image.id)} src="/images/delete_button.png" />
            </button> : null;

        return (
            <div className="small-12 medium-4 large-2 columns">
                <div className="image-wrapper">
                    <h4 className="image-title">{image.title}</h4>
                    <img className="image-thumb" src={image.url} onError={this.handleImageError} />
                    <div className="like-wrapper">
                        {likeButton}
                        {usersImage}
                        {deleteButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default Image;
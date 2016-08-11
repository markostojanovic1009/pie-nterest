import React from 'react';

class Image extends React.Component {

    handleImageError(event) {
        event.target.src = "/images/no_image_found.jpg";
    }

    onLikeButtonClick(imageId) {
        this.props.imageInfo.onLikeClick(imageId);
    }

    render() {
        const { image, imageInfo } = this.props ;

        const likeButton = imageInfo.type === "ALL_IMAGES" ?
            <button>
                <img className="like-icon" onClick={this.onLikeButtonClick.bind(this, image.id)} src={image.liked ? "/images/red_heart.png" : "/images/gray_heart.png" }/>
            </button> : null;

        return (
            <div className="small-12 medium-4 large-2 columns">
                <div className="image-wrapper">
                    <h4 className="image-title">{image.title}</h4>
                    <img className="image-thumb" src={image.url} onError={this.handleImageError} />
                    <div className="like-wrapper">
                        {likeButton}
                    </div>
                </div>
            </div>
        );
    }
}

export default Image;
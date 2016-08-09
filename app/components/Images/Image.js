import React from 'react';

class Image extends React.Component {
    render() {
        const { image } = this.props ;
        return (
            <div className="small-12 medium-4 large-2 columns">
                <div className="image-wrapper">
                    <h4 className="image-title">{image.title}</h4>
                    <img className="image-thumb" src={image.url} />
                    <div className="like-wrapper">
                        <button><img className="like-icon" src="/images/gray_heart.png" /></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Image;
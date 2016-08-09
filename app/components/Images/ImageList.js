import React from 'react';
import Image from './Image';
class ImageList extends React.Component {
    render() {

        const isLoading = this.props.images.isFetching ? (
            <div>
                <p>Loading...</p>
            </div>
        ) : null;

        var mappedImages = this.props.images.items.map((image) => {
            return(<Image key={image.id} image={image} />);
        });

        return (
            <div>
                {isLoading}
                <div className="expanded row">
                    {mappedImages}
                </div>
            </div>
        );
    }
}

export default ImageList;
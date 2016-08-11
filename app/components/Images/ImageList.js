import React from 'react';
import Image from './Image';
class ImageList extends React.Component {

    splitArray(input, spacing) {
        var output = [];

        for (let i = 0; i < input.length; i += spacing)
        {
            output.push(input.slice(i, i + spacing));
        }

        return output;
    };


    render() {

        const isLoading = this.props.images.isFetching ? (
            <div>
                <p>Loading... {this.props.token}</p>
            </div>
        ) : null;

        let mappedImages = this.splitArray(this.props.images.items, 6).map((imagesSubarray, index) => {
            return(
                <div className="expanded row" key={index}>
                    {imagesSubarray.map((image) => {
                        return (
                            <Image key={image.id} image={image} imageInfo={this.props.listInfo}/>
                        );
                    })}
                </div>
            );
        });
        return (
            <div>
                {isLoading}
                {mappedImages}
            </div>
        );
    }
}

export default ImageList;
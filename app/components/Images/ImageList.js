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
                <div className="loader">
                    Loading...
                </div>
        ) : null;

        let listTitle;
        switch(this.props.listInfo.type) {
            case "ALL_IMAGES":
                listTitle = "All Images";
                break;
            case "USER_IMAGES":
                listTitle = "My images";
                break;
            case "LIKED_IMAGES":
                listTitle = "Images you liked";
        }

        let mappedImages = this.splitArray(this.props.images.items, 6).map((imagesSubarray, index) => {
            return(
                <div>
                    <div className="expanded row" key={index}>
                        {imagesSubarray.map((image) => {
                            return (
                                <Image key={image.id} image={image} imageInfo={this.props.listInfo} userId={this.props.userId}/>
                            );
                        })}
                    </div>
                </div>
            );
        });
        return (
            <div>
                {isLoading}

                <div className="row">
                    <div className="small-12 medium-4 medium-offset-4">
                        <div className="image-list-title">
                            <h2>{listTitle}</h2>
                        </div>
                    </div>
                </div>

                {mappedImages}
            </div>
        );
    }
}

export default ImageList;
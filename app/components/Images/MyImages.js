import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import Messages from '../Messages';
import { getUserImages, addImage, deleteImage } from '../../actions/images_actions';

class Images extends React.Component {
    constructor() {
        super();
        const imageComponent = this;
        this.state = {
            title: "",
            url: "",
            listInfo: {
                type: "USER_IMAGES",
                onDeleteClick(imageId) {
                    imageComponent.props.dispatch(deleteImage(imageComponent.props.user, imageComponent.props.token, imageId));
                }
            }
        }

    }
    componentDidMount() {
        this.props.dispatch(getUserImages(this.props.user, this.props.token));
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.dispatch(addImage(this.props.user, this.props.token, this.state.title, this.state.url));
        this.setState({title: '', url: ''});
    }

    render() {
        return(
            <div>

                <div className="row">
                    <div className="small-12 medium-6 medium-offset-3">
                        <form className="add-image-form" onSubmit={this.handleSubmit.bind(this)}>
                            <h4>Add a new image!</h4>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" placeholder="Image title" value={this.state.title} onChange={this.handleChange.bind(this)}/>
                            <label htmlFor="url">Image link</label>
                            <input type="url" name="url" placeholder="http://example.com/my_image.jpg" value={this.state.url} onChange={this.handleChange.bind(this)}/>
                            <button className="button" type="submit">Add</button>
                        </form>
                        <Messages messages={this.props.messages} />
                    </div>
                </div>
                <ImageList images={this.props.images} token={this.props.token} listInfo={this.state.listInfo}/>

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
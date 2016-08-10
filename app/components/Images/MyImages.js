import React from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import { getUserImages } from '../../actions/images_actions';

class Images extends React.Component {

    componentDidMount() {
        console.log(this.props.token);
        this.props.dispatch(getUserImages(this.props.user, this.props.token));
    }

    render() {
        return(
            <div>
                <ImageList images={this.props.images} token={this.props.token}/>
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
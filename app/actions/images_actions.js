import { browserHistory } from 'react-router';

export function getAllImages(token) {
    return (dispatch)=> {
        dispatch({
            type: "REQUEST_IMAGES"
        });
        return fetch('/api/images', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            return response.json().then((json) => {
                if(response.ok) {
                    dispatch({
                        type: 'RECEIVE_IMAGES_SUCCESS',
                        images: json
                    });
                } else {
                    dispatch({
                        type: 'RECEIVE_IMAGES_FAILURE',
                        message: json.msg
                    });
                }
            });
        });
    }
}

export function getUserImages(user, token) {
    return (dispatch) => {
        dispatch({
            type: "REQUEST_IMAGES"
        });
        return fetch('/api/' + user.id +'/images', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            return response.json().then((json) => {
                if(response.ok) {
                    dispatch({
                        type: 'RECEIVE_IMAGES_SUCCESS',
                        images: json
                    });
                } else {
                    dispatch({
                        type: 'RECEIVE_IMAGES_FAILURE',
                        messages: json.msg
                    });
                }
            })
        });
    }
}

export function getLikedImages(user, token) {
    return (dispatch) => {
        dispatch({
            type: "REQUEST_IMAGES"
        });
        return fetch('/api/' + user.id +'/images/liked', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            return response.json().then((json) => {
                if(response.ok) {
                    dispatch({
                        type: 'RECEIVE_IMAGES_SUCCESS',
                        images: json
                    });
                } else {
                    dispatch({
                        type: 'RECEIVE_IMAGES_FAILURE',
                        messages: json.msg
                    });
                }
            })
        });
    }
}

export function addImage(user, token, title, url) {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_MESSAGES"
        });
        return fetch('/api/' + user.id + '/images', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({ title, url })
        }).then((response) => {
            return response.json().then((json) => {
                if(response.ok) {
                    dispatch({
                        type: "ADD_IMAGE_SUCCESS",
                        image: json
                    });
                    browserHistory.push('/' + user.id + '/images');
                } else {
                    dispatch({
                        type: 'ADD_IMAGE_FAILURE',
                        messages: json
                    });
                }
            })
        })
    }
}

export function likeImage(user, token, imageId) {
    return (dispatch) => {
        dispatch({
            type: "CLEAR_MESSAGES"
        });
        if(!user.id) {
            browserHistory.push('/login');
        } else {
            return fetch('/api/' + user.id + '/images/liked', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({image_id: imageId})
            }).then((response) => {
                if (response.ok) {
                    dispatch({
                        type: "LIKE_IMAGE_SUCCESS",
                        imageId
                    });
                } else {
                    return response.json().then((json) => {
                        dispatch({
                            type: 'LIKE_IMAGE_FAILURE',
                            messages: [json]
                        });
                    });
                }
            })
        }
    }
}
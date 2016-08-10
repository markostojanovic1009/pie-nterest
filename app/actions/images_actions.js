export function getAllImages() {
    return (dispatch)=> {
        dispatch({
            type: "REQUEST_IMAGES"
        });
        return fetch('/api/images', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
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
                        message: json.msg
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
                        message: json.msg
                    });
                }
            })
        });
    }
}
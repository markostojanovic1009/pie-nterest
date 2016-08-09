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

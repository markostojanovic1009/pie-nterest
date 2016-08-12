const initialState = {
    isFetching: false,
    items: []
};

export default function images(state = initialState, action) {
    switch(action.type) {
        case "REQUEST_IMAGES":
            return Object.assign({}, state, { isFetching: true });
        case "RECEIVE_IMAGES_SUCCESS":
            return Object.assign({}, state, { isFetching: false, items: action.images.slice()});
        case "ADD_IMAGE_SUCCESS":
            return Object.assign({}, state, { items: [...state.items, action.image]});
        case "LIKE_IMAGE_SUCCESS":
            return Object.assign({}, state, {
                items: state.items.map((image) => {
                    if(image.id === action.imageId) {
                        return Object.assign({}, image, { liked: true })
                    }
                    return image;
                })
            });
        case "DELETE_IMAGE_SUCCESS":
            return Object.assign({}, state, {
                items: state.items.filter((image) => {
                    return image.id !== action.imageId;
                })
            });
        default:
            return state;
    }
}
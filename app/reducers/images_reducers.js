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
        default:
            return state;
    }
}
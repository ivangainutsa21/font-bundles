const initialState = {
    font_index: 0,
    maxLength: null,
    frame_index: undefined,
}

export const appSetting = ( state = initialState,  action ) => {
    switch(action.type) {
        case 'SET_FONT_BUILDER':
            return { ...state, font_index: action.font_index};
        case 'SET_MAX_LENGTH':
            return { ...state, maxLength: action.maxLength};
        case 'SET_FRAME_BUILDER':
            return { ...state, frame_index: action.frame_index};
        default:
            return state;
    }
}
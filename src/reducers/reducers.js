const initialState = {
    font: 0,
    maxLength: null,
    frame: 0,
    fontColor: null,
    frameColor: null,
    slider_value: 55,
}

export const appSetting = ( state = initialState,  action ) => {
    switch(action.type) {
        case 'SET_FONT_BUILDER':
            return { ...state, font: action.font};
        case 'SET_MAX_LENGTH':
            return { ...state, maxLength: action.maxLength};
        case 'SET_FRAME_BUILDER':
            return { ...state, frame: action.frame};
        case 'SET_FONT_COLOR':
            return { ...state, fontColor: action.fontColor};
        case 'SET_FRAME_COLOR':
            return { ...state, frameColor: action.frameColor};
        case 'SET_SLIDER_VALUE':
            return { ...state, slider_value: action.slider_value};
        default:
            return state;
    }
}
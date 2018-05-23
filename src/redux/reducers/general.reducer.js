import * as types from '../types'

const initialState = {
    isPreferenceOverlayShown: false,
    isFoodItemOverlayShown: false,
    editingFoodItem: null,
    savingFoodItem: null
}

const generalReducer = (state = initialState, action) => {
    const { data } = action;
    switch (action.type) {
        case types.SHOW_PREFERENCE_OVERLAY:
            return {
                ...state,
                isPreferenceOverlayShown: true
            }
        case types.CLOSE_PREFERENCE_OVERLAY:
            return {
                ...state,
                isPreferenceOverlayShown: false
            }
        case types.SHOW_FOOD_ITEM_OVERLAY:
            return {
                ...state,
                isFoodItemOverlayShown: true,
                editingFoodItem: data,
                savingFoodItem: null
            }
        case types.CLOSE_FOOD_ITEM_OVERLAY:
            return {
                ...state,
                isFoodItemOverlayShown: false,
                editingFoodItem: null,
                savingFoodItem: data
            }
        default:
            return state;
    }
}

export default generalReducer;
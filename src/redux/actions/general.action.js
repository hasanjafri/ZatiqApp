import * as types from '../types';

export function showPreferenceOverlay() {
    return { type: types.SHOW_PREFERENCE_OVERLAY }
}

export function closePreferenceOverlay() {
    return { type: types.CLOSE_PREFERENCE_OVERLAY }
}

export function showFoodItemOverlay(data) {
    return { type: types.SHOW_FOOD_ITEM_OVERLAY, data }
}

export function closeFoodItemOverlay(data) {
    return { type: types.CLOSE_FOOD_ITEM_OVERLAY, data }
}

export function showSignInOverlay(data) {
    return { type: types.SHOW_SIGN_IN_OVERLAY, data }
}

export function closeSignInOverlay(data) {
    return { type: types.CLOSE_SIGN_IN_OVERLAY, data }
}
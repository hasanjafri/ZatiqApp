import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import keys from '../libs/keys';
import urls from '../libs/urls';

import appState from '../appState';

const state = appState.getInstance();

const env = 'dev'; // prod

const FB_APP_ID = '1277509129016312';
const GOOGLE_IOS_ID = '1013702018515-ajvv6fh1d6usglha3qpgoeicac4o0dt3.apps.googleusercontent.com';
const GOOGLE_ANDROID_ID = '1013702018515-5t8kr0mpf3k1vsbr3am9klm7qorqu8rc.apps.googleusercontent.com';

const GOOGLE_STANDALONE_ANDROID_ID = '1013702018515-8u9a0lf5ktnh33lhpru0rve7vkqe215r.apps.googleusercontent.com';
const GOOGLE_STANDALONE_IOS_ID = '1013702018515-lko3bqq6j30tph7l0pjvvte7u7g8acen.apps.googleusercontent.com';
const WEB_CLIENT_ID = '013702018515-g3mjgf56essrqkp573bjjpfau5a62405.apps.googleusercontent.com';

const behavior = 'system';
import { guestCuisines } from '../libs/constants';

export const onSignInAsGuest = async (type) => {
    await state.setUser({ data: null, type: 'user' });
    return { success: true };
};

export const onSignIn = async (type) => {
    let parsedResult;
    if (type === 'facebook') {
        // FB login
        let type, token;
        try {
            ({ type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
                permissions: ['public_profile', 'email'],
                options: {
                    behavior: env === 'dev' ? 'web' : behavior
                }
            }));
            if (type === 'success' && token) {
                const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
                const responseJson = await response.json();
                parsedResult = { ...responseJson, accessToken: token };
            } else {
                return { success: false, message: 'Something went wrong' } ;
            }
        } catch(err) {
            console.log(err);
            return { success: false, message: 'Something went wrong' };
        }
    } else if (type === 'google') {
        // Google login
        var options = {};
        if (env === 'dev') {
            options = {
                behavior: 'web',
                androidClientId: GOOGLE_ANDROID_ID,
                iosClientId: GOOGLE_IOS_ID,
                scopes: ['profile', 'email']
            };
        } else {
            options = {
                behavior,
                androidStandaloneAppClientId: GOOGLE_STANDALONE_ANDROID_ID,
                iosStandaloneAppClientId: GOOGLE_STANDALONE_IOS_ID,
                androidClientId: GOOGLE_ANDROID_ID,
                iosClientId: GOOGLE_IOS_ID,
                scopes: ['profile', 'email']
            };
        }
        
        try {
            const result = await Expo.Google.logInAsync(options);
            if (result.type === 'success') {
                parsedResult = {
                    accessToken: result.accessToken,
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                };
            } else if (result.type === 'cancel') {
                return { success: false };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err);
            return { success: false, message: 'Something went wrong' };
        }
    }
    try {
        const response = await fetch(urls.userLogin, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ accessToken: parsedResult.accessToken, email: parsedResult.email, method: type })
        });
        const userInfo = await response.json();
        if (response.status !== 200) {
            return { success: false, message: 'Something went wrong' };
        }
        await state.setUser({ data: userInfo, type: 'user' });
        return { success: true };
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
};

export const getUserProfile = async () => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        if (!api_token) {
            return { success: false, message: 'Not logged in' };
        }
        const response = await fetch(urls.userProfile, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const setUserProfile = async (preferences) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        if (!api_token) {
            return { success: false, message: 'Not logged in' };
        }
        const response = await fetch(urls.userPreferences, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, preferences })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}
export const getDeals = async () => {
    try {
        const response = await fetch(urls.deals, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const searchCuisine = async (cuisine) => {
    try {
        const user = state.getUser();
        let url, option;
        if (user.data) {
            url = urls.searchCuisine.replace(':cuisine', cuisine);
            option = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token: user.data.api_token, type: user.type })
            }
        } else {
            if (guestCuisines.indexOf(cuisine) > -1) {
                url = urls.guestCuisine.replace(':cuisine', cuisine);
                option = {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }
            } else {
                return { success: false, message: 'Please log in first' };
            }
        }
        const response = await fetch(url, option);
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const foodItemsByRestaurantId = async (restaurant_id) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const type = user ? user.type : null;
        const response = await fetch(urls.businessFoodItems, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, type, restaurant_id })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const menuPicturesByRestaurantId = async (restaurant_id) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.businessMenus, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, restaurant_id })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const restaurantPicturesByRestaurantId = async (restaurant_id) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.businessInterior, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, restaurant_id })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const submitReview = async (form) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const type = user ? user.type : null;
        if (!api_token) {
            return { success: false, message: 'Not logged in' };
        }
        const response = await fetch(urls.userAddReview, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, ...form })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const getUserReviews = async (form) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        if (!api_token || user.type !== 'user') {
            return { success: false, message: 'Not logged in' };
        }

        const response = await fetch(urls.userReviews, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult.reviews }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const closestRestaurants = async (name) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.closestRestaurants, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token })
        });
        
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult.response }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}


export const findRestaurantByName = async (name) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.userFindRestaurantByName, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, text: name })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult.response }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const foodGrid = async () => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.foodGrid, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult.food_items }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}

export const foodGridSearchName = async (name) => {
    try {
        const user = state.getUser();
        const api_token = user && user.data ? user.data.api_token : null;
        const response = await fetch(urls.foodGridSearchName, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ api_token, text: name })
        });
        const parsedResult = await response.json();
        if (response.status === 200) {
            return { success: true, data: parsedResult.response }
        } else {
            return { success: false, message: 'Something went wrong' };
        }
    } catch(err) {
        console.log(err)
        return { success: false, message: 'Something went wrong' };
    }
}
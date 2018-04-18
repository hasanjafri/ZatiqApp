import { AsyncStorage } from 'react-native';
import Expo from 'expo';
import keys from '../libs/keys';
import urls from '../libs/urls';

import appState from '../appState';
import { ACTION_TRUSTED_CREDENTIALS_USER } from 'expo/src/IntentLauncherAndroid';

const state = appState.getInstance();

const FB_APP_ID = '1277509129016312';
const GOOGLE_IOS_ID = '1013702018515-ajvv6fh1d6usglha3qpgoeicac4o0dt3.apps.googleusercontent.com';
const GOOGLE_ANDROID_ID = '1013702018515-5t8kr0mpf3k1vsbr3am9klm7qorqu8rc.apps.googleusercontent.com';

export const onSignIn = async (type) => {
    let parsedResult;
    if (type === 'facebook') {
        // FB login
        let type, token;
        try {
            ({ type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(FB_APP_ID, {
                permissions: ['public_profile', 'email']
            }));
            if (type === 'success' && token) {
                const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${token}`);
                const responseJson = await response.json();
                parsedResult = { ...responseJson, accessToken: token };
            } else {
                return { success: false, message: 'Something went wrong' } ;
            }
        } catch(e) {
            console.log(e);
            return { success: false, message: 'Something went wrong' };
        }
    } else if (type === 'google') {
        // Google login
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: GOOGLE_ANDROID_ID,
                iosClientId: GOOGLE_IOS_ID,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                parsedResult = {
                    accessToken: result.accessToken,
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(e) {
            console.log(e);
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
            body: JSON.stringify({ accessToken: parsedResult.accessToken, method: type })
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
        const api_token = user ? user.data.api_token : null;
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
        const api_token = user ? user.data.api_token : null;
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
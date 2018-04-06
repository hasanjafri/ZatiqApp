import { AsyncStorage } from 'react-native';
import Expo from 'expo';

export const USER_KEY = 'USER_KEY';

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
                return null;
            }
        } catch(e) {
            console.log(e);
            return null;
        }
    } else if (type === 'google') {
        // Google login
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: GOOGLE_ANDROID_ID,
                iosClientId: GOOGLE_IOS_ID,
                scopes: ['profile', 'email'],
            });
            console.log(result);
            if (result.type === 'success') {
                parsedResult = {
                    accessToken: result.accessToken,
                    id: result.user.id,
                    name: result.user.name,
                    email: result.user.email
                };
            } else {
                return null;
            }
        } catch(e) {
            console.log(e);
            return null;
        }
    }
    console.log(parsedResult);
    // Here we have the parsed result, store it in the async storage
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(parsedResult));
};

export const onSignOut = () => {
    AsyncStorage.removeItem(USER_KEY)
};

export const isSignedIn = async () => {
    let user;
    try {
        user = await AsyncStorage.getItem(USER_KEY);
    } catch(e) {
        // TODO: Error handling
    }
    return user;
};
import { AsyncStorage } from 'react-native';

export const USER_KEY = 'USER_KEY';

export const onSignIn = () => {
    AsyncStorage.setItem(USER_KEY, '123')
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
import { AsyncStorage } from 'react-native';

import urls from './libs/urls';
import keys from './libs/keys';

export default class AppState {
    // create singleton
    static myInstance = null;

    // variables
    user = null; // 'user' or 'business'

    async hasSeenPreferences() {
        let hasSeen;
        try {
            hasSeen = await AsyncStorage.getItem(keys.HAS_SET_PREFERENCES);
            hasSeen = JSON.parse(hasSeen) || false; 
        } catch(err) {
            console.log(err);
        }
        return hasSeen;
    }
    async seenPreferences() {
        try {
            await AsyncStorage.setItem(keys.HAS_SET_PREFERENCES, JSON.stringify(true));
        } catch(err) {
            console.log(err);
            return false;  
        };
        return true;
    }
    async setUser({ data, type }) {
        const user = { data, type };
        try {
            await AsyncStorage.setItem(keys.USER_KEY, JSON.stringify(user));
            this.user = user;
        } catch(err) {
            console.log(err);
            return false;  
        };
        return true;
    }
    getUser() {
        return this.user;
    }
    onSignOut = async () => {
        try {
            await AsyncStorage.removeItem(keys.USER_KEY);
            this.user = null;
        } catch(err) {
            console.log(err);
            return false;  
        };
        return true;
    };
    async loadAll() {
        let user;
        try {
            user = await AsyncStorage.getItem(keys.USER_KEY);
        } catch(err) {
            console.log(err);
        }
        this.user = user ? JSON.parse(user) : user;
    }
    static getInstance() {
        if (this.myInstance === null) {
            this.myInstance = new AppState();
        }

        return this.myInstance;
    }
};
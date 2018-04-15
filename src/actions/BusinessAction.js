
import urls from '../libs/urls';
import { AsyncStorage } from 'react-native';

import keys from '../libs/keys';

import appState from '../appState';
const state = appState.getInstance();
export default class BusinessAction {
    // create singleton
    static myInstance = null;

    // variables
    startedRegistration = false;
    registerForm = {};

    static getInstance() {
        if (this.myInstance === null) {
            this.myInstance = new BusinessAction();
            this.startedRegistration = true;
        }

        return this.myInstance;
    }
    // Register form
    setRegisterForm(form) {
        this.registerForm = {...this.registerForm, ...form};
    }
    getRegisterForm() {
        return this.registerForm;
    }
    async login(form) {
        try {
            const response = await fetch(urls.businessLogin, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const parsedResult = await response.json();
            if (response.status === 200) {
                await state.setUser({ data: parsedResult, type: 'business' });
                return null;
            } else {
                return 'Something went wrong';
            }
        } catch(err) {
            console.log(err);
            return 'Something went wrong';
        }
    }
    async register() {
        try {
            const response = await fetch(urls.businessRegister, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.registerForm)
            });
            console.log(response);

            const parsedResult = await response.json();
            if (response.status === 200) {
                await state.setUser({ data: parsedResult, type: 'business' });
                return null;
            } else {
                return 'Something went wrong';
            }
        } catch(err) {
            console.log(err);
            return 'Something went wrong';
        }
    }
    async getProfile() {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return 'Not logged in';
            }
            const response = await fetch(urls.businessProfile, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token })
            });
            const parsedResult = await response.json();

            if (response.status === 200) {
                
            } else {
                // console.log(res);
            }
        } catch(e) {
            
        }
    }

    // Pictures
    async uploadPicture({ type, picture }) {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
            }
            const url = type === 'menuPictures' ? urls.businessAddMenuPicture : urls.businessAddRestaurantPicture;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token, ...picture })
            });
            console.log(response);
            const parsedResult = await response.json();
            if (response.status === 200) {
                return { success: true, data: { ...parsedResult.response } };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err)
            return { success: false, message: 'Something went wrong' };
        }
    }
    async deletePicture({ type, imageId }) {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
            }
            console.log(imageId);
            const url = type === 'menuPictures' ? urls.businessDeleteMenuPicture : urls.businessDeleteRestaurantPicture;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token, image_id: imageId })
            });
            console.log(response);
            const res = await response.json();
            if (response.status === 200) {
                return { success: true };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err)
            return { success: false, message: 'Something went wrong' };
        }
    }
    async getUploadList() {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return 'Not logged in';
            }

            const [menuPictures, restaurantPictures] = await Promise.all([
                fetch(urls.businessMenuPictures, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ api_token })
                }),
                fetch(urls.businessRestaurantPictures, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ api_token })
                })
            ]);
            console.log(menuPictures);
            console.log(restaurantPictures);
            // const res = await response.json();
            // if (response.status === 200) {
            //     return null;
            // } else {
            //     return 'Something went wrong';
            // }
        } catch(err) {
            console.log(err)
            return 'Something went wrong';
        }
    }
};
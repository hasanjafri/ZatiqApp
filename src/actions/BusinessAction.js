
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
    clearRegisterForm() {
        this.registerForm = {};
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
    async register({ type }) {
        // Validate register form
        const { address, date, name, number, image } = this.registerForm;
        let message;
        if (!image || !image.base64) {
            message = 'You need to upload a business logo picture.';
        } else if (!name) {
            message = 'You need to enter a business name.';
        } else if (!address) {
            message = 'You need to enter an address.';
        } else if (!number) {
            message = 'You need to enter a phone number.';
        } else if (!date) {
            message = 'You need to fill out all the dates.';
        }
        if (message) {
            return { success: false, message };
        }
        try {
            let url;
            if (type === 'register') {
                url = urls.businessRegister;
            } else {
                url = urls.businessEditProfile;
                const businessUser = state.getUser();
                const api_token = businessUser ? businessUser.data.api_token : null;
                if (!api_token || businessUser.type !== 'business') {
                    return { success: false, message: 'Not logged in' };
                }
                this.registerForm.api_token = api_token;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(this.registerForm)
            });
            const parsedResult = await response.json();
            if (response.status === 200) {
                await state.setUser({ data: parsedResult, type: 'business' });
                return { success: true };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err);
            return { success: false, message: 'Something went wrong' };
        }
    }
    async getProfile() {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
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
                return { success: true, data: parsedResult };
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err);
            return { success: false, message: 'Something went wrong' };
        }
    }

    // Pictures
    async uploadPicture({ type, image }) {
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
                body: JSON.stringify({ api_token, ...image })
            });
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
            const url = type === 'menuPictures' ? urls.businessDeleteMenuPicture : urls.businessDeleteRestaurantPicture;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token, image_id: imageId })
            });
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
                return { success: false, message: 'Not logged in' };
            }

            const [menuPictures, restaurantPictures, foodItems] = await Promise.all([
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
                }),
                fetch(urls.businessFoodItems, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ api_token })
                })
            ]);
            const parsedMenuPictures = await menuPictures.json();
            const parsedRestaurantPictures = await restaurantPictures.json();
            const parsedFoodItems = await foodItems.json();
            if (menuPictures.status === 200 && restaurantPictures.status === 200 && foodItems.status === 200) {
                return {
                    success: true,
                    data: {
                        menuPictures: parsedMenuPictures.menu_photos,
                        restaurantPictures: parsedRestaurantPictures.interior_photos,
                        foodItems: parsedFoodItems.food_items
                    }
                }
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err)
            return { success: false, message: 'Something went wrong' };
        }
    }
    // Food item
    async saveFoodItem({ form, type }) {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
            }
            let url;
            if (type === 'edit') {
                url = urls.businessEditFoodItem;
            } else {
                url = urls.businessAddFoodItem
            }
            const response = await fetch(url, {
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
    async deleteFoodItem({ food_item_id }) {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
            }
            const response = await fetch(urls.businessDeleteFoodItem, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token, food_item_id })
            });
            const parsedResult = await response.json();
            if (response.status === 200) {
                return { success: true }
            } else {
                return { success: false, message: 'Something went wrong' };
            }
        } catch(err) {
            console.log(err)
            return { success: false, message: 'Something went wrong' };
        }
    }
    async getFoodItem(food_item_id) {
        try {
            const businessUser = state.getUser();
            const api_token = businessUser ? businessUser.data.api_token : null;
            if (!api_token || businessUser.type !== 'business') {
                return { success: false, message: 'Not logged in' };
            }

            const response = await fetch(urls.businessFoodItem, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ api_token, food_item_id })
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
};
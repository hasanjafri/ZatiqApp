// const hostname = 'http://165.227.43.65:5000';
const hostname = 'http://zatiq-server-1.wepspuhami.ca-central-1.elasticbeanstalk.com';

const urls = {
    uploadImage: hostname + '/image/business',
    userLogin: hostname + '/user/login',
    userProfile: hostname + '/user/profile',
    userAddReview: hostname + '/user/review/add',
    userReviews: hostname + '/user/reviews/all',

    closestRestaurants: hostname + '/restaurants/nearby',
    userFindRestaurantByName: hostname + '/find/restaurant/name',
    foodGrid: hostname + '/food/grid',
    foodGridSearchName: hostname + '/food/grid/name', // api_token, text

    deals: hostname + '/deals',

    // restaurant screen endpoints
    businessMenus: hostname + '/user/menu/all',
    businessInterior: hostname + '/user/interior/all',

    searchCuisine: hostname + '/search/:cuisine',
    guestCuisine: hostname + '/guest/:cuisine',
    userPreferences: hostname + '/user/preferences',
    
    businessesList:  hostname + '/businesses/list',

    businessLogin:  hostname + '/business/login',
    businessRegister:  hostname + '/business/register',

    businessProfile:  hostname + '/business/profile',
    businessEditProfile:  hostname + '/business/profile/edit', 
    businessReviews:  hostname + '/business/reviews/all',

    businessAddMenuPicture:  hostname + '/restaurant/menu/add',
    businessDeleteMenuPicture:  hostname + '/restaurant/menu/delete',
    businessMenuPictures:  hostname + '/restaurant/menu/all',

    businessAddRestaurantPicture:  hostname + '/restaurant/interior/add',
    businessDeleteRestaurantPicture:  hostname + '/restaurant/interior/delete',
    businessRestaurantPictures:  hostname + '/restaurant/interior/all',

    businessFoodItems: hostname + '/food/restaurantid', // need api_token and user_type
    businessAddFoodItem: hostname + '/business/add/food',
    businessEditFoodItem: hostname + '/business/edit/food',
    businessDeleteFoodItem: hostname + '/business/delete/food',

    businessFoodItem: hostname + '/food/id'
}

export default urls;

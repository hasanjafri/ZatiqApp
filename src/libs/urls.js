const hostname = 'http://165.227.43.65:5000';

const urls = {
    uploadImage: hostname + '/image/business/',
    userLogin: hostname + '/user/login/',
    userProfile: hostname + '/user/profile/',

    searchCuisine: hostname + '/search/:cuisine/',
    userPreferences: hostname + '/user/preferences/',
    
    businessesList:  hostname + '/businesses/list/',

    businessLogin:  hostname + '/business/login/',
    businessRegister:  hostname + '/business/register/',

    businessProfile:  hostname + '/business/profile/',
    businessEditProfile:  hostname + '/business/profile/edit/',

    businessAddMenuPicture:  hostname + '/restaurant/menu/add/',
    businessDeleteMenuPicture:  hostname + '/restaurant/menu/delete/',
    businessMenuPictures:  hostname + '/restaurant/menu/all/',

    businessAddRestaurantPicture:  hostname + '/restaurant/interior/add/',
    businessDeleteRestaurantPicture:  hostname + '/restaurant/interior/delete/',
    businessRestaurantPictures:  hostname + '/restaurant/interior/all/',

    businessFoodItems: hostname + '/food/restaurantid/',
    businessAddFoodItem: hostname + '/business/add/food/',
    businessEditFoodItem: hostname + '/business/edit/food/',
    businessDeleteFoodItem: hostname + '/business/delete/food/',

    businessFoodItem: hostname + '/food/id/',
}

export default urls;

const hostname = 'http://165.227.43.65:5000';

const urls = {
    uploadImage: hostname + '/image/business/',
    userLogout: hostname + '/users/logout',
    businessesList:  hostname + '/businesses/list/',
    businessLogin:  hostname + '/business/login/',
    businessRegister:  hostname + '/business/register/',
    businessLogout:  hostname + '/business/logout/',
    businessProfile:  hostname + '/business/profile/',
    businessAddMenuPicture:  hostname + '/restaurant/menu/add/',
    businessDeleteMenuPicture:  hostname + '/restaurant/menu/delete/',
    businessMenuPictures:  hostname + '/restaurant/menu/all/',
    businessAddRestaurantPicture:  hostname + '/restaurant/interior/add/',
    businessDeleteRestaurantPicture:  hostname + '/restaurant/interior/delete/',
    businessRestaurantPictures:  hostname + '/restaurant/interior/all/'
}

export default urls;

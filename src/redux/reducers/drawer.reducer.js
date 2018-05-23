import * as types from '../types'

 const initialState = {
    drawerItem: 'Home'
}
 
 const drawerReducer = (state = initialState, action) => {
     const { data } = action;
     switch (action.type) {
         case types.CHANGE_DRAWER_ITEM:
             return {
                 ...state,
                 drawerItem: data
             }
         default:
             return state;
     }
 }
 
 export default drawerReducer;
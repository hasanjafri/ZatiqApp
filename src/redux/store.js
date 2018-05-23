import { combineReducers, createStore } from 'redux';

import generalReducer from './reducers/general.reducer'
import drawerReducer from './reducers/drawer.reducer'

const AppReducers = combineReducers({
    generalReducer,
    drawerReducer
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;
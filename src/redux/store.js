import { combineReducers, createStore } from 'redux';

import generalReducer from './reducers/general.reducer'

const AppReducers = combineReducers({
    generalReducer,
});

const rootReducer = (state, action) => {
	return AppReducers(state,action);
}

let store = createStore(rootReducer);

export default store;
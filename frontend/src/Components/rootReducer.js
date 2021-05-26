import {combineReducers} from 'redux';
import AuthReducer from './Redux/auth/AuthReducer';
import CategoryReducer from './Redux/category/CategoryReducer'
import ProductReducer from './Redux/product/ProductReducer'

export default combineReducers({
    auth:AuthReducer,
    categories:CategoryReducer,
    products:ProductReducer
})
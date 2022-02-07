import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import messageReducer from "./slices/message";
import imageReducer from "../store/slices/imageSlice";
import clientReducer from "../store/slices/clientSlice";
import clientphotoReducer from "../store/slices/clientphotoSlice";
import supplierReducer from "../store/slices/supplierSlice";
import productReducer from "../store/slices/productSlice";
import categoryReducer from "../store/slices/categorySlice";
import serviceReducer from "../store/slices/serviceSlice";
import taxReducer from "../store/slices/taxSlice";
import socketReducer from "../store/slices/socketSlice";
import staffReducer from "../store/slices/staffSlice";
import pricetierReducer from "../store/slices/pricetierSlice";
import rosterReducer from "../store/slices/rosterSlice";
//-----------------------|| COMBINE REDUCER ||-----------------------//
// const rootPersistConfig = {
//   key: "root",
//   timeout: 500,
//   storage,
//   // blacklist: ["message", "image", 'isView']
// };

const reducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
    },
    authReducer,
  ),
  message: messageReducer,
  client: persistReducer(
    {
      key: "client",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    clientReducer,
  ),
  clientphoto: persistReducer(
    {
      key: "clientphoto",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000
    },
    clientphotoReducer,
  ),
  product: persistReducer(
    {
      key: "product",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    productReducer,
  ),
  supplier: persistReducer(
    {
      key: "supplier",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    supplierReducer,
  ),
  service: persistReducer(
    {
      key: "service",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    serviceReducer,
  ),
  category: persistReducer(
    {
      key: "category",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    categoryReducer,
  ),
  staff: persistReducer(
    {
      key: "staff",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    staffReducer,
  ),
  pricetier: persistReducer(
    {
      key: "pricetier",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    pricetierReducer,
  ),
  roster: persistReducer(
    {
      key: "roster",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist:['isTabView']
    },
    rosterReducer,
  ),
  tax: taxReducer,
  socket: socketReducer,
  image: imageReducer,
});

export default reducer;

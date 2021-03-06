import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/authSlice";
import signupReducer from "./slices/signupSlice";
import messageReducer from "./slices/message";
import imageReducer from "../store/slices/imageSlice";
import clientReducer from "../store/slices/clientSlice";
import clientphotoReducer from "../store/slices/clientphotoSlice";
import clientdocumentReducer from "../store/slices/clientdocumentSlice";
import clientnoteReducer from "../store/slices/clientnoteSlice";
import supplierReducer from "../store/slices/supplierSlice";
import productReducer from "../store/slices/productSlice";
import categoryReducer from "../store/slices/categorySlice";
import serviceReducer from "../store/slices/serviceSlice";
import taxReducer from "../store/slices/taxSlice";
import socketReducer from "../store/slices/socketSlice";
import staffReducer from "../store/slices/staffSlice";
import pricetierReducer from "../store/slices/pricetierSlice";
import rosterReducer from "../store/slices/rosterSlice";
import salonmoduleReducer from "./slices/salonmoduleSlice";
import salonaccessReducer from "../store/slices/salonaccessSlice";
import busytimeReducer from "../store/slices/busytimeSlice";
import appointmentReducer from "../store/slices/appointmentSlice";
import calendarReducer from "../store/slices/calendarSlice";
import voucherReducer from "../store/slices/voucherSlice";
import saleReducer from "../store/slices/saleSlice";
import membershipReducer from "../store/slices/membershipSlice";
import subscriptionReducer from "../store/slices/subscriptionSlice";
import stripeReducer from "../store/slices/stripeSlice";
import clientmembershipReducer from "../store/slices/clientmembershipSlice";
import clientsubscriptionReducer from "../store/slices/clientsubscriptionSlice";
import settingReducer from "../store/slices/settingSlice";
import businessReducer from "../store/slices/businessSlice";
import clientinvoiceReducer from "../store/slices/clientinvoiceSlice";
import clientvoucherReducer from "../store/slices/clientvoucherSlice";
import closedateReducer from "../store/slices/closedateSlice";
import dashboardReducer from "../store/slices/dashboardSlice";
import cancellationreasonReducer from "../store/slices/cancellationreasonSlice";
import formReducer from "./slices/formSlice";
import reportReducer from "../store/slices/reportSlice";
import bookingbuttonReducer from "../store/slices/bookingbuttonSlice";
import marketingReducer from "../store/slices/marketingSlice";
import notificationReducer from "../store/slices/notificationSlice";
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
  signup: persistReducer(
    {
      key: "signup",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    signupReducer,
  ),
  message: messageReducer,
  dashboard: persistReducer(
    {
      key: "dashboard",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    dashboardReducer,
  ),
  business: persistReducer(
    {
      key: "business",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    businessReducer,
  ),
  client: persistReducer(
    {
      key: "client",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    clientReducer,
  ),
  clientphoto: persistReducer(
    {
      key: "clientphoto",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientphotoReducer,
  ),
  clientdocument: persistReducer(
    {
      key: "clientdocument",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientdocumentReducer,
  ),
  clientnote: persistReducer(
    {
      key: "clientnote",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientnoteReducer,
  ),
  clientmembership: persistReducer(
    {
      key: "clientmembership",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientmembershipReducer,
  ),
  clientsubscription: persistReducer(
    {
      key: "clientsubscription",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientsubscriptionReducer,
  ),
  clientinvoice: persistReducer(
    {
      key: "clientinvoice",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientinvoiceReducer,
  ),
  clientvoucher: persistReducer(
    {
      key: "clientvoucher",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    clientvoucherReducer,
  ),
  product: persistReducer(
    {
      key: "product",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
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
      whitelist: ["isTabView"],
    },
    rosterReducer,
  ),
  salonmodule: persistReducer(
    {
      key: "salonmodule",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    salonmoduleReducer,
  ),
  salonaccess: persistReducer(
    {
      key: "salonaccess",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    salonaccessReducer,
  ),
  busytime: persistReducer(
    {
      key: "busytime",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    busytimeReducer,
  ),
  appointment: persistReducer(
    {
      key: "appointment",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    appointmentReducer,
  ),
  calendar: persistReducer(
    {
      key: "calendar",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    calendarReducer,
  ),
  voucher: persistReducer(
    {
      key: "voucher",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    voucherReducer,
  ),
  sale: persistReducer(
    {
      key: "sale",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    saleReducer,
  ),
  membership: persistReducer(
    {
      key: "membership",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    membershipReducer,
  ),
  subscription: persistReducer(
    {
      key: "subscription",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    subscriptionReducer,
  ),
  stripe: persistReducer(
    {
      key: "stripe",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    stripeReducer,
  ),
  setting: persistReducer(
    {
      key: "setting",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: ["isTabView"],
    },
    settingReducer,
  ),
  closedate: persistReducer(
    {
      key: "closedate",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    closedateReducer,
  ),
  cancellationreason: persistReducer(
    {
      key: "cancellationreason",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    cancellationreasonReducer,
  ),
  form: persistReducer(
    {
      key: "form",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    formReducer,
  ),
  report: persistReducer(
    {
      key: "report",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    reportReducer,
  ),
  bookingbutton: persistReducer(
    {
      key: "bookingbutton",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    bookingbuttonReducer,
  ),
  marketing: persistReducer(
    {
      key: "marketing",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    marketingReducer,
  ),
  notification: persistReducer(
    {
      key: "notification",
      storage,
      keyPrefix: "salon-",
      debug: false,
      timeout: 20000,
      whitelist: [],
    },
    notificationReducer,
  ),
  tax: taxReducer,
  socket: socketReducer,
  image: imageReducer,
});

export default reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import saleApiController from "../../services/sale.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const saleStoreApi = createAsyncThunk("sale/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const saleUpdateApi = createAsyncThunk("sale/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const InvoiceListViewApi = createAsyncThunk("sale/invoicelistview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .invoiceview(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "invoicelistview"))
      .catch((error) => HandleError(thunkAPI, error, "invoicelistview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const CreateInvoiceListViewApi = createAsyncThunk("sale/createinvoicelistview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .createinvoiceview(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "createinvoicelistview"))
      .catch((error) => HandleError(thunkAPI, error, "createinvoicelistview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const saleDetailApi = createAsyncThunk("sale/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const saleDeleteApi = createAsyncThunk("sale/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleServiceApi = createAsyncThunk("sale/services", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .services(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "services"))
      .catch((error) => HandleError(thunkAPI, error, "services"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const SaleProductApi = createAsyncThunk("sale/products", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .products(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "products"))
      .catch((error) => HandleError(thunkAPI, error, "products"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleVoucherApi = createAsyncThunk("sale/vouchers", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .vouchers(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "vouchers"))
      .catch((error) => HandleError(thunkAPI, error, "vouchers"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleMembershipApi = createAsyncThunk("sale/membership", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .membership(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "membership"))
      .catch((error) => HandleError(thunkAPI, error, "membership"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleSubscriptionApi = createAsyncThunk("sale/subscription", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .subscription(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "subscription"))
      .catch((error) => HandleError(thunkAPI, error, "subscription"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleServiceToCartApi = createAsyncThunk("sale/servicetocart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .services(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "servicetocart"))
      .catch((error) => HandleError(thunkAPI, error, "servicetocart"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleProductToCartApi = createAsyncThunk("sale/producttocart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .products(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "producttocart"))
      .catch((error) => HandleError(thunkAPI, error, "producttocart"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleVoucherToCartApi = createAsyncThunk("sale/vouchertocart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .vouchers(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "vouchertocart"))
      .catch((error) => HandleError(thunkAPI, error, "vouchertocart"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleMembershipToCartApi = createAsyncThunk("sale/membershiptocart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .membership(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "membershiptocart"))
      .catch((error) => HandleError(thunkAPI, error, "membershiptocart"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleSubscriptionToCartApi = createAsyncThunk("sale/subscriptiontocart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .subscription(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "subscriptiontocart"))
      .catch((error) => HandleError(thunkAPI, error, "subscriptiontocart"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ClientSuggetionListApi = createAsyncThunk("sale/clientsuggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .clientsuggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SaleEmailInvoiceApi = createAsyncThunk("sale/saleemailinvoice", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .sendEmailInvoice(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "saleemailinvoice"))
      .catch((error) => HandleError(thunkAPI, error, "saleemailinvoice"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const VoucherApplyApi = createAsyncThunk("sale/voucherapply", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .voucherapply(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "voucherapply"))
      .catch((error) => HandleError(thunkAPI, error, "voucherapply"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ReturnPaymentApi = createAsyncThunk("sale/returnpayment", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .returnpayment(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "returnpayment"))
      .catch((error) => HandleError(thunkAPI, error, "returnpayment"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SendEmailVoucher = createAsyncThunk("sale/SendEmailVoucher", async (formValues, thunkAPI) => {
  try {
    const resposedata = await saleApiController
      .sendemailvoucher(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "SendEmailVoucher"))
      .catch((error) => HandleError(thunkAPI, error, "SendEmailVoucher"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isOpenedAddForm: "",
  isOpenedVoucherToForm: "",
  isOpenedDetailModal: "",
  isTabView: "viewinvoice",
  isSaleTabView: "services",
  isInvoiceListView: [],
  isCreateInvoiceListView: [],
  isDetailData: "",
  isServices: [],
  isServiceSearch: "",
  isServiceSearchName: "",
  isProducts: [],
  isProductSearch: "",
  isProductSearchName: "",
  isCart: { services: [], products: [], vouchers: [], membership: [], oneoffvoucher: [], subscription: [] },
  isCartTotalPrice: [],
  isAppointmentDetail: "",
  isSuggetionListView: [],
  isSearchList: "",
  isSearchName: "",
  isSearchObj: "",
  isVouchers: [],
  isMembership: [],
  isSubscription: [],
  isVoucherToFormData: [],
  isCartVoucherCount: [],
  isOpenedCheckoutForm: "",
  isCheckoutData: [],
  isOpenedSaleCompleted: "",
  isSaleCompletedData: "",
  isOpenCardPaymentForm: "",
  isCardPaymentData: "",
  isOpenedVoucherApplyForm: "",
  isApplyVoucherCodeData: "",
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    reset: () => initialState,
    InvoiceTabView: (state, action) => {
      state.isTabView = action.payload;
    },
    SaleTabView: (state, action) => {
      state.isSaleTabView = action.payload;
    },
    openAddSaleForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddSaleForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenVoucherToForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedVoucherToForm = "open";
    },
    CloseVoucherToForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedVoucherToForm = "";
    },
    OpenVoucherApplyForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedVoucherApplyForm = "open";
    },
    CloseVoucherApplyForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedVoucherApplyForm = "";
    },
    VoucherToFormData: (state, action) => {
      state.isVoucherToFormData = action.payload;
    },
    openSaleDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeSaleDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    SaleProductSearchName: (state, action) => {
      state.isProductSearchName = action.payload;
    },
    SaleServiceSearchName: (state, action) => {
      state.isServiceSearchName = action.payload;
    },
    SaleServiceRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.services = state.isCart.services ? state.isCart.services.filter((item) => item.id != id) : [];
    },
    SaleProductRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.products = state.isCart.products ? state.isCart.products.filter((item) => item.id != id) : [];
    },
    SaleVoucherRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.vouchers = state.isCart.vouchers ? state.isCart.vouchers.filter((item) => item.id != id) : [];
    },
    SaleOneOffVoucherRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.oneoffvoucher = state.isCart.oneoffvoucher ? state.isCart.oneoffvoucher.filter((item) => item.id != id) : [];
      // state.isCart.oneoffvoucher = state.isCart.oneoffvoucher ? state.isCart.oneoffvoucher.slice(0, i).concat(state.isCart.oneoffvoucher.slice(i + 1, state.isCart.oneoffvoucher.length)) : [];
    },
    SaleMembershipRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.membership = state.isCart.membership ? state.isCart.membership.filter((item) => item.id != id) : [];
    },
    SaleSubscriptionRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.subscription = state.isCart.subscription ? state.isCart.subscription.filter((item) => item.id != id) : [];
    },
    AppointmentDetail: (state, action) => {
      state.isAppointmentDetail = action.payload;
    },
    OpenClientSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseClientSearchList: (state) => {
      state.isSearchList = "";
    },
    ClientSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    ClientSearchObj: (state, action) => {
      state.isSearchObj = action.payload;
    },
    SaleOneOffVoucherToCartApi: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.oneoffvoucher.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        action.payload = { ...action.payload, id: state.isCart.oneoffvoucher.length + 1 };
        const oneoffvoucher = [...state.isCart.oneoffvoucher, action.payload];
        state.isCart.oneoffvoucher = oneoffvoucher;
      }
    },
    SaleCheckoutData: (state, action) => {
      state.isCheckoutData = action.payload;
    },
    OpenCheckoutForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedCheckoutForm = "open";
    },
    CloseCheckoutForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenedCheckoutForm = "";
    },
    SaleCartUpdate: (state, action) => {
      let cartupdate = action.payload;
      if (cartupdate) {
        const { id, ...changes } = action.payload;
        let existingData = "";
        if (cartupdate.type === "products") {
          existingData = state.isCart.products.find((event) => event.id === id);
        }
        if (cartupdate.type === "services") {
          existingData = state.isCart.services.find((event) => event.id === id);
        }
        if (existingData) {
          Object.keys(changes).map((keyName) => {
            existingData[keyName] = changes[keyName];
          });
        }
      }
    },
    OpenSaleCompleted: (state = initialState) => {
      state.isOpenedSaleCompleted = "open";
    },
    CloseSaleCompleted: (state = initialState) => {
      state.isOpenedSaleCompleted = "";
    },
    SaleCompletedData: (state, action) => {
      state.isSaleCompletedData = action.payload;
    },
    OpenCardPaymentForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenCardPaymentForm = "open";
    },
    CloseCardPaymentForm: (state = initialState) => {
      // state.isOpenedEditForm = "";
      state.isOpenCardPaymentForm = "";
    },
    CardPaymentData: (state, action) => {
      state.isCardPaymentData = action.payload;
    },
    RemoveApplyVoucherCode: (state) => {
      state.isApplyVoucherCodeData = "";
    },
  },
  extraReducers: {
    [saleStoreApi.pending]: () => {},
    [saleStoreApi.fulfilled]: (state, action) => {
      if (state.isInvoiceListView && state.isInvoiceListView.data) {
        state.isInvoiceListView.data = [action.payload, ...state.isInvoiceListView.data];
      } else {
        state.isInvoiceListView = { data: [action.payload] };
      }
    },
    [saleStoreApi.rejected]: () => {},
    [saleUpdateApi.pending]: () => {},
    [saleUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isInvoiceListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [saleUpdateApi.rejected]: () => {},
    [InvoiceListViewApi.pending]: () => {},
    [InvoiceListViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isInvoiceListView.current_page ? state.isInvoiceListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isInvoiceListView && state.isInvoiceListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isInvoiceListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isInvoiceListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isInvoiceListView = action.payload;
    },
    [InvoiceListViewApi.rejected]: (state) => {
      state.isInvoiceListView = [];
    },
    [CreateInvoiceListViewApi.pending]: () => {},
    [CreateInvoiceListViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isCreateInvoiceListView.current_page ? state.isCreateInvoiceListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isCreateInvoiceListView && state.isCreateInvoiceListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isCreateInvoiceListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isCreateInvoiceListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isCreateInvoiceListView = action.payload;
    },
    [CreateInvoiceListViewApi.rejected]: (state) => {
      state.isCreateInvoiceListView = [];
    },
    [saleDetailApi.pending]: () => {},
    [saleDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [saleDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [saleDeleteApi.pending]: () => {},
    [saleDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isInvoiceListView.data = state.isInvoiceListView.data ? state.isInvoiceListView.data.filter((item) => item.id != id) : state.isInvoiceListView.filter((item) => item.id != id);
    },
    [saleDeleteApi.rejected]: () => {},
    [SaleServiceApi.pending]: () => {},
    [SaleServiceApi.fulfilled]: (state, action) => {
      let old_current_page = state.isServices.current_page ? state.isServices.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isServices && state.isServices.data;
      let newviewdata = action.payload && action.payload.data;
      state.isServices = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isServices.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isServices = action.payload;
    },
    [SaleServiceApi.rejected]: (state) => {
      state.isServices = [];
    },
    [SaleProductApi.pending]: () => {},
    [SaleProductApi.fulfilled]: (state, action) => {
      let old_current_page = state.isProducts.current_page ? state.isProducts.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isProducts && state.isProducts.data;
      let newviewdata = action.payload && action.payload.data;
      state.isProducts = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isProducts.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isProducts = action.payload;
    },
    [SaleProductApi.rejected]: (state) => {
      state.isProducts = [];
    },
    [SaleVoucherApi.pending]: () => {},
    [SaleVoucherApi.fulfilled]: (state, action) => {
      let old_current_page = state.isVouchers.current_page ? state.isVouchers.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isVouchers && state.isVouchers.data;
      let newviewdata = action.payload && action.payload.data;
      state.isVouchers = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isVouchers.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isVouchers = action.payload;
    },
    [SaleVoucherApi.rejected]: (state) => {
      state.isVouchers = [];
    },
    [SaleMembershipApi.pending]: () => {},
    [SaleMembershipApi.fulfilled]: (state, action) => {
      let old_current_page = state.isMembership.current_page ? state.isMembership.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isMembership && state.isMembership.data;
      let newviewdata = action.payload && action.payload.data;
      state.isMembership = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isMembership.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isMembership = action.payload;
    },
    [SaleMembershipApi.rejected]: (state) => {
      state.isMembership = [];
    },
    [SaleSubscriptionApi.pending]: () => {},
    [SaleSubscriptionApi.fulfilled]: (state, action) => {
      let old_current_page = state.isSubscription.current_page ? state.isSubscription.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isSubscription && state.isSubscription.data;
      let newviewdata = action.payload && action.payload.data;
      state.isSubscription = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isSubscription.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isSubscription = action.payload;
    },
    [SaleSubscriptionApi.rejected]: (state) => {
      state.isSubscription = [];
    },
    [SaleServiceToCartApi.pending]: () => {},
    [SaleServiceToCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.services.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const services = [...state.isCart.services, action.payload];
        state.isCart.services = services;
      }
    },
    [SaleServiceToCartApi.rejected]: (state) => {
      state.isCart.services = "";
    },
    [SaleProductToCartApi.pending]: () => {},
    [SaleProductToCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.products.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const products = [...state.isCart.products, action.payload];
        state.isCart.products = products;
      }
    },
    [SaleProductToCartApi.rejected]: (state) => {
      state.isCart.products = "";
    },
    [SaleVoucherToCartApi.pending]: () => {},
    [SaleVoucherToCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.vouchers.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const vouchers = [...state.isCart.vouchers, action.payload];
        state.isCart.vouchers = vouchers;
      }
    },
    [SaleVoucherToCartApi.rejected]: (state) => {
      state.isCart.vouchers = "";
    },
    [SaleMembershipToCartApi.pending]: () => {},
    [SaleMembershipToCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.membership.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const membership = [...state.isCart.membership, action.payload];
        state.isCart.membership = membership;
      }
    },
    [SaleMembershipToCartApi.rejected]: (state) => {
      state.isCart.membership = "";
    },
    [SaleSubscriptionToCartApi.pending]: () => {},
    [SaleSubscriptionToCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isCart.subscription.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const subscription = [...state.isCart.subscription, action.payload];
        state.isCart.subscription = subscription;
      }
    },
    [SaleSubscriptionToCartApi.rejected]: (state) => {
      state.isCart.subscription = "";
    },
    [ClientSuggetionListApi.pending]: () => {},
    [ClientSuggetionListApi.fulfilled]: (state, action) => {
      let old_current_page = state.isSuggetionListView.current_page ? state.isSuggetionListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isSuggetionListView && state.isSuggetionListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isSuggetionListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isSuggetionListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isSuggetionListView = action.payload;
    },
    [ClientSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [SaleEmailInvoiceApi.pending]: () => {},
    [SaleEmailInvoiceApi.fulfilled]: () => {},
    [SaleEmailInvoiceApi.rejected]: () => {},
    [VoucherApplyApi.pending]: () => {},
    [VoucherApplyApi.fulfilled]: (state, action) => {
      state.isApplyVoucherCodeData = action.payload;
    },
    [VoucherApplyApi.rejected]: () => {},
    [ReturnPaymentApi.pending]: () => {},
    [ReturnPaymentApi.fulfilled]: () => {},
    [ReturnPaymentApi.rejected]: () => {},
    [SendEmailVoucher.pending]: () => {},
    [SendEmailVoucher.fulfilled]: () => {},
    [SendEmailVoucher.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, InvoiceTabView, openAddSaleForm, closeAddSaleForm, openSaleDetailModal, closeSaleDetailModal, SaleTabView, SaleProductSearchName, SaleServiceSearchName, SaleServiceRemoveToCart, SaleProductRemoveToCart, AppointmentDetail, OpenClientSearchList, CloseClientSearchList, ClientSearchName, ClientSearchObj, SaleVoucherRemoveToCart, SaleMembershipRemoveToCart, OpenVoucherToForm, CloseVoucherToForm, VoucherToFormData, SaleOneOffVoucherToCartApi, SaleOneOffVoucherRemoveToCart, SaleCheckoutData, OpenCheckoutForm, CloseCheckoutForm, SaleCartUpdate, OpenSaleCompleted, CloseSaleCompleted, SaleCompletedData, OpenCardPaymentForm, CloseCardPaymentForm, CardPaymentData, OpenVoucherApplyForm, CloseVoucherApplyForm, SaleSubscriptionRemoveToCart, RemoveApplyVoucherCode } = saleSlice.actions;
export default saleSlice.reducer;

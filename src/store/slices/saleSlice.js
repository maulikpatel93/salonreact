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

const initialState = {
  isOpenedAddForm: "",
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
  isCart: { services: [], products: [] },
  isCartTotalPrice: [],
  isAppointmentDetail: "",
  isSuggetionListView: [],
  isSearchList: "",
  isSearchName: "",
  isSearchObj: "",
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
    SaleServiceRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.services = state.isCart.services ? state.isCart.services.filter((item) => item.id != id) : [];
    },
    SaleProductRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isCart.products = state.isCart.products ? state.isCart.products.filter((item) => item.id != id) : [];
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
  },
});
// Action creators are generated for each case reducer function
export const { reset, InvoiceTabView, openAddSaleForm, closeAddSaleForm, openSaleDetailModal, closeSaleDetailModal, SaleTabView, SaleProductSearchName, SaleServiceSearchName, SaleServiceRemoveToCart, SaleProductRemoveToCart, AppointmentDetail, OpenClientSearchList, CloseClientSearchList, ClientSearchName, ClientSearchObj } = saleSlice.actions;
export default saleSlice.reducer;
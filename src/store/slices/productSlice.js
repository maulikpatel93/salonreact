import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productApiController from "../../services/product.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const productStoreApi = createAsyncThunk("product/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const productUpdateApi = createAsyncThunk("product/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const productListViewApi = createAsyncThunk("product/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productDetailApi = createAsyncThunk("product/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productDeleteApi = createAsyncThunk("product/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productSuggetionListApi = createAsyncThunk("product/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ProductOptionsDropdown = createAsyncThunk("product/ProductOptionsDropdown", async (formValues, thunkAPI) => {
  try {
    const resposedata = await productApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "ProductOptionsDropdown"))
      .catch((error) => HandleError(thunkAPI, error, "ProductOptionsDropdown"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isOpenedAddForm: "",
  isOpenedEditForm: "",
  isOpenedDetailModal: "",
  isListView: [],
  isSuggetionListView: [],
  isDetailData: "",
  isTabView: "product",
  isSort: "",
  isSearchList: "",
  isSearchName: "",
  isProductManageStock: 0,
  isProductOptionDropdown: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
    productTabView: (state, action) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
      state.isTabView = action.payload;
    },
    openAddProductForm: (state = initialState) => {
      state.isOpenedAddForm = "open";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    closeAddProductForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openEditProductForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
      state.isOpenedDetailModal = "";
    },
    closeEditProductForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    openProductDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeProductDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
      state.isOpenedDetailModal = "";
    },
    productSort: (state, action) => {
      // let sort = state.isSort ? state.isSort : {};
      // state.isSort = Object.assign(sort, action.payload);
      state.isSort = action.payload;
    },
    productSortRemove: (state) => {
      state.isSort = "";
    },
    openProductSearchList: (state) => {
      state.isSearchList = "open";
    },
    closeProductSearchList: (state) => {
      state.isSearchList = "";
    },
    productSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    productManageStock: (state, action) => {
      state.isProductManageStock = action.payload;
    },
  },
  extraReducers: {
    [productStoreApi.pending]: () => {},
    [productStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [productStoreApi.rejected]: () => {},
    [productUpdateApi.pending]: () => {},
    [productUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [productUpdateApi.rejected]: () => {},
    [productListViewApi.pending]: () => {},
    [productListViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isListView.current_page ? state.isListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isListView && state.isListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isListView = action.payload;
    },
    [productListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [productSuggetionListApi.pending]: () => {},
    [productSuggetionListApi.fulfilled]: (state, action) => {
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
    [productSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [productDetailApi.pending]: () => {},
    [productDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [productDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [productDeleteApi.pending]: () => {},
    [productDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [productDeleteApi.rejected]: () => {},
    [ProductOptionsDropdown.pending]: () => {},
    [ProductOptionsDropdown.fulfilled]: (state, action) => {
      state.isProductOptionDropdown = action.payload;
    },
    [ProductOptionsDropdown.rejected]: (state) => {
      state.isProductOptionDropdown = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, productTabView, openAddProductForm, closeAddProductForm, openEditProductForm, closeEditProductForm, productTabGridView, openProductDetailModal, closeProductDetailModal, productDetailTab, productSort, productSortRemove, openProductSearchList, closeProductSearchList, productSearchName, productManageStock } = productSlice.actions;
export default productSlice.reducer;

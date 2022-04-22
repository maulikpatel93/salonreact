import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import subscriptionApiController from "../../services/subscription.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const SubscriptionStoreApi = createAsyncThunk("subscription/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const SubscriptionUpdateApi = createAsyncThunk("subscription/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const SubscriptionGridViewApi = createAsyncThunk("subscription/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SubscriptionOptions = createAsyncThunk("subscription/SubscriptionOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "SubscriptionOptions"))
      .catch((error) => HandleError(thunkAPI, error, "SubscriptionOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SubscriptionDetailApi = createAsyncThunk("subscription/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SubscriptionDeleteApi = createAsyncThunk("subscription/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SubscriptionServiceApi = createAsyncThunk("subscription/services", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .services(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "services"))
      .catch((error) => HandleError(thunkAPI, error, "services"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const SubscriptionServiceCartApi = createAsyncThunk("subscription/subscriptionservicecart", async (formValues, thunkAPI) => {
  try {
    const resposedata = await subscriptionApiController
      .services(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "subscriptionservicecart"))
      .catch((error) => HandleError(thunkAPI, error, "subscriptionservicecart"));
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
  isGridView: [],
  isSuggetionListView: [],
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isSubscriptionOption: [],
  isServices: [],
  isSubscriptionServices: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddSubscriptionForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddSubscriptionForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditSubscriptionForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditSubscriptionForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenSubscriptionDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseSubscriptionDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    SubscriptionServiceRemoveToCart: (state, action) => {
      const { id } = action.payload;
      state.isSubscriptionServices = state.isSubscriptionServices ? state.isSubscriptionServices.filter((item) => item.id != id) : [];
    },
    EditSubscriptionServiceCartApi: (state, action) => {
      state.isSubscriptionServices = action.payload;
    },
  },
  extraReducers: {
    [SubscriptionStoreApi.pending]: () => {},
    [SubscriptionStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [SubscriptionStoreApi.rejected]: () => {},
    [SubscriptionUpdateApi.pending]: () => {},
    [SubscriptionUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [SubscriptionUpdateApi.rejected]: () => {},
    [SubscriptionGridViewApi.pending]: () => {},
    [SubscriptionGridViewApi.fulfilled]: (state, action) => {
      let old_current_page = state.isGridView.current_page ? state.isGridView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isGridView && state.isGridView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isGridView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isGridView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isGridView = action.payload;
    },
    [SubscriptionGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [SubscriptionDetailApi.pending]: () => {},
    [SubscriptionDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [SubscriptionDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [SubscriptionDeleteApi.pending]: () => {},
    [SubscriptionDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [SubscriptionDeleteApi.rejected]: () => {},
    [SubscriptionOptions.pending]: () => {},
    [SubscriptionOptions.fulfilled]: (state, action) => {
      state.isSubscriptionOption = action.payload;
    },
    [SubscriptionOptions.rejected]: (state) => {
      state.isSubscriptionOption = [];
    },
    [SubscriptionServiceApi.pending]: () => {},
    [SubscriptionServiceApi.fulfilled]: (state, action) => {
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
    [SubscriptionServiceApi.rejected]: (state) => {
      state.isServices = [];
    },
    [SubscriptionServiceCartApi.pending]: () => {},
    [SubscriptionServiceCartApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isSubscriptionServices && state.isSubscriptionServices.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        const subscription = [...state.isSubscriptionServices, action.payload];
        state.isSubscriptionServices = subscription;
      }
    },
    [SubscriptionServiceCartApi.rejected]: (state) => {
      state.isSubscriptionServices = "";
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddSubscriptionForm, CloseAddSubscriptionForm, OpenEditSubscriptionForm, CloseEditSubscriptionForm, OpenSubscriptionDetailModal, CloseSubscriptionDetailModal, openSubscriptionSearchList, closesubscriptionsearchList, subscriptionSearchName, SubscriptionServiceRemoveToCart,EditSubscriptionServiceCartApi } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;

import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import consultationApiController from "../../services/consultation.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const ConsultationStoreApi = createAsyncThunk("consultation/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const ConsultationUpdateApi = createAsyncThunk("consultation/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const ConsultationListViewApi = createAsyncThunk("consultation/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ConsultationOptions = createAsyncThunk("consultation/consultationOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "consultationOptions"))
      .catch((error) => HandleError(thunkAPI, error, "consultationOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ConsultationDetailApi = createAsyncThunk("consultation/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ConsultationDeleteApi = createAsyncThunk("consultation/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ConsultationSuggetionListApi = createAsyncThunk("consultation/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await consultationApiController
      .suggetionlist(formValues, thunkAPI)
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
  isOpenedEditForm: "",
  isOpenedDetailModal: "",
  isListView: [],
  isSuggetionListView: [],
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isHandleFormData: [],
  isOpenedEditHandleForm: "",
};

const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddConsultationForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddConsultationForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditConsultationForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditConsultationForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenConsultationDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseConsultationDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    OpenConsultationSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseConsultationsearchList: (state) => {
      state.isSearchList = "";
    },
    ConsultationSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    HandleFormData: (state, action) => {
      const { uniqueName, ...changes } = action.payload;
      const existingData = state.isHandleFormData.find((event) => event.uniqueName === uniqueName);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        state.isHandleFormData = [...state.isHandleFormData, action.payload];
      }
    },
    HandleFormDataDelete: (state, action) => {
      const uniqueName = action.payload;
      state.isHandleFormData = state.isHandleFormData.length > 0 ? state.isHandleFormData.filter((item) => item.uniqueName != uniqueName) : state.isHandleFormData.filter((item) => item.uniqueName != uniqueName);
    },
    OpenedEditHandleForm: (state, action) => {
      state.isOpenedEditHandleForm = action.payload;
    },
  },
  extraReducers: {
    [ConsultationStoreApi.pending]: () => {},
    [ConsultationStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [ConsultationStoreApi.rejected]: () => {},
    [ConsultationUpdateApi.pending]: () => {},
    [ConsultationUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [ConsultationUpdateApi.rejected]: () => {},
    [ConsultationListViewApi.pending]: () => {},
    [ConsultationListViewApi.fulfilled]: (state, action) => {
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
    [ConsultationListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [ConsultationSuggetionListApi.pending]: () => {},
    [ConsultationSuggetionListApi.fulfilled]: (state, action) => {
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
    [ConsultationSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [ConsultationDetailApi.pending]: () => {},
    [ConsultationDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [ConsultationDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [ConsultationDeleteApi.pending]: () => {},
    [ConsultationDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [ConsultationDeleteApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddConsultationForm, CloseAddConsultationForm, OpenEditConsultationForm, CloseEditConsultationForm, OpenConsultationDetailModal, CloseConsultationDetailModal, OpenConsultationSearchList, CloseConsultationsearchList, ConsultationSearchName, HandleFormData, HandleFormDataDelete, OpenedEditHandleForm } = consultationSlice.actions;
export default consultationSlice.reducer;

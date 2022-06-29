import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import formApiController from "../../services/form.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const FormStoreApi = createAsyncThunk("form/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const FormUpdateApi = createAsyncThunk("form/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const FormListViewApi = createAsyncThunk("form/listview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "listview"))
      .catch((error) => HandleError(thunkAPI, error, "listview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FormOptions = createAsyncThunk("form/formOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "formOptions"))
      .catch((error) => HandleError(thunkAPI, error, "formOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FormDetailApi = createAsyncThunk("form/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FormDeleteApi = createAsyncThunk("form/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FormSuggetionListApi = createAsyncThunk("form/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "suggetionlist"))
      .catch((error) => HandleError(thunkAPI, error, "suggetionlist"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FormElementTypeListApi = createAsyncThunk("form/FormElementType", async (formValues, thunkAPI) => {
  try {
    const resposedata = await formApiController
      .formelementtype(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "FormElementType"))
      .catch((error) => HandleError(thunkAPI, error, "FormElementType"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const UpdateHandleFormDataApi = createAsyncThunk("form/UpdateHandleFormData", async (formValues, thunkAPI) => {
  try {
    const resposedata = formValues;
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  isOpenedAddForm: "",
  isOpenedEditForm: "",
  isOpenedPreviewForm: "",
  isOpenedDetailModal: "",
  isListView: [],
  isSuggetionListView: [],
  isDetailData: "",
  isSearchList: "",
  isSearchName: "",
  isHandleFormData: [],
  isHandleFormDetailData: "",
  isOpenedEditHandleForm: "",
  isFormElementTypeListView: "",
  isFormElementDelete: [],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddFormForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddFormForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditFormForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditFormForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenedPreviewForm: (state, action) => {
      state.isOpenedPreviewForm = action.payload;
    },
    OpenFormDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseFormDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    OpenFormSearchList: (state) => {
      state.isSearchList = "open";
    },
    CloseFormsearchList: (state) => {
      state.isSearchList = "";
    },
    FormSearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
    HandleFormData: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isHandleFormData.find((event) => event.id === id && event.can_repeat === 0);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        state.isHandleFormData = [...state.isHandleFormData, action.payload];
      }
    },
    UpdateHandleFormData: (state, action) => {
      const { id, index, ...changes } = action.payload;
      const existingData = state.isHandleFormData.find((event, i) => event.id === id && i === index);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        state.isHandleFormData = [...state.isHandleFormData, action.payload];
      }
    },
    HandleFormDataDelete: (state, action) => {
      const { id, i } = action.payload;
      state.isHandleFormData = state.isHandleFormData.length > 0 ? state.isHandleFormData.filter((item, index) => (item.id === id && index !== i) || (item.id !== id && index !== i)) : [];
    },
    ResetHandleFormData: (state) => {
      state.isHandleFormData = [];
    },
    OpenedEditHandleForm: (state, action) => {
      state.isOpenedEditHandleForm = action.payload;
    },
    HandleFormDetailData: (state, action) => {
      state.isHandleFormDetailData = action.payload;
    },
    FormElementDelete: (state, action) => {
      if (action.payload) {
        const { form_element_id, ...changes } = action.payload;
        const existingData = state.isFormElementDelete.find((event) => event.form_element_id === form_element_id);
        if (existingData) {
          Object.keys(changes).map((keyName) => {
            existingData[keyName] = changes[keyName];
          });
        } else {
          state.isFormElementDelete = [...state.isFormElementDelete, action.payload];
        }
      } else {
        state.isFormElementDelete = [];
      }
    },
  },
  extraReducers: {
    [FormStoreApi.pending]: () => {},
    [FormStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [FormStoreApi.rejected]: () => {},
    [FormUpdateApi.pending]: () => {},
    [FormUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [FormUpdateApi.rejected]: () => {},
    [FormListViewApi.pending]: () => {},
    [FormListViewApi.fulfilled]: (state, action) => {
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
    [FormListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [FormSuggetionListApi.pending]: () => {},
    [FormSuggetionListApi.fulfilled]: (state, action) => {
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
    [FormSuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [FormDetailApi.pending]: () => {},
    [FormDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [FormDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [FormDeleteApi.pending]: () => {},
    [FormDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [FormDeleteApi.rejected]: () => {},
    [FormElementTypeListApi.pending]: () => {},
    [FormElementTypeListApi.fulfilled]: (state, action) => {
      let old_current_page = state.isFormElementTypeListView.current_page ? state.isFormElementTypeListView.current_page : "";
      let new_current_page = action.payload.current_page ? action.payload.current_page : "";
      let viewdata = state.isFormElementTypeListView && state.isFormElementTypeListView.data;
      let newviewdata = action.payload && action.payload.data;
      state.isFormElementTypeListView = action.payload;
      if (old_current_page && new_current_page && old_current_page < new_current_page && old_current_page != new_current_page) {
        viewdata && newviewdata ? (state.isFormElementTypeListView.data = [...viewdata, ...newviewdata]) : action.payload;
      }
      state.isFormElementTypeListView = action.payload;
    },
    [FormElementTypeListApi.rejected]: (state) => {
      state.isFormElementTypeListView = [];
    },
    [UpdateHandleFormDataApi.pending]: () => {},
    [UpdateHandleFormDataApi.fulfilled]: (state, action) => {
      const { id, index, ...changes } = action.payload;
      const existingData = state.isHandleFormData.find((event, i) => event.id === id && i === index);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      } else {
        state.isHandleFormData = [...state.isHandleFormData, action.payload];
      }
    },
    [UpdateHandleFormDataApi.rejected]: () => {},
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddFormForm, CloseAddFormForm, OpenEditFormForm, CloseEditFormForm, OpenFormDetailModal, CloseFormDetailModal, OpenFormSearchList, CloseFormsearchList, FormSearchName, HandleFormData, HandleFormDataDelete, OpenedEditHandleForm, HandleFormDetailData, UpdateHandleFormData, ResetHandleFormData, FormElementDelete, OpenedPreview, OpenedPreviewForm } = formSlice.actions;
export default formSlice.reducer;

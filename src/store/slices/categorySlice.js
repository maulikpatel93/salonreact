import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import categoryApiController from "../../services/category.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";

export const usersAdapter = createEntityAdapter();

export const categoryStoreApi = createAsyncThunk("category/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'create'))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const categoryUpdateApi = createAsyncThunk("category/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'update'))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const categoryListViewApi = createAsyncThunk("category/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'gridview'))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const categoryOptions = createAsyncThunk("category/categoryOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'categoryOptions'))
      .catch((error) => HandleError(thunkAPI, error, "categoryOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const categoryDetailApi = createAsyncThunk("category/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'detail'))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const categoryDeleteApi = createAsyncThunk("category/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'delete'))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const categoriesuggetionListApi = createAsyncThunk("category/suggetionlist", async (formValues, thunkAPI) => {
  try {
    const resposedata = await categoryApiController
      .suggetionlist(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, 'suggetionlist'))
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
  isCategoryOption: [],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: () => initialState,
    openAddCategoryForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    closeAddCategoryForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    openEditCategoryForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    closeEditCategoryForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    openCategoryDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    closeCategoryDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    },
    openCategorieSearchList: (state) => {
      state.isSearchList = "open";
    },
    closecategoriesearchList: (state) => {
      state.isSearchList = "";
    },
    categoriesearchName: (state, action) => {
      state.isSearchName = action.payload;
    },
  },
  extraReducers: {
    [categoryStoreApi.pending]: () => {},
    [categoryStoreApi.fulfilled]: (state, action) => {
      if (state.isListView && state.isListView.data) {
        state.isListView.data = [action.payload, ...state.isListView.data];
      } else {
        state.isListView = { data: [action.payload] };
      }
    },
    [categoryStoreApi.rejected]: () => {},
    [categoryUpdateApi.pending]: () => {},
    [categoryUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isListView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [categoryUpdateApi.rejected]: () => {},
    [categoryListViewApi.pending]: () => {},
    [categoryListViewApi.fulfilled]: (state, action) => {
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
    [categoryListViewApi.rejected]: (state) => {
      state.isListView = [];
    },
    [categoriesuggetionListApi.pending]: () => {},
    [categoriesuggetionListApi.fulfilled]: (state, action) => {
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
    [categoriesuggetionListApi.rejected]: (state) => {
      state.isSuggetionListView = [];
    },
    [categoryDetailApi.pending]: () => {},
    [categoryDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [categoryDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [categoryDeleteApi.pending]: () => {},
    [categoryDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isListView.data = state.isListView.data ? state.isListView.data.filter((item) => item.id != id) : state.isListView.filter((item) => item.id != id);
    },
    [categoryDeleteApi.rejected]: () => {},
    [categoryOptions.pending]: () => {},
    [categoryOptions.fulfilled]: (state, action) => {
      state.isCategoryOption = action.payload;
    },
    [categoryOptions.rejected]: (state) => {
      state.isCategoryOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, openAddCategoryForm, closeAddCategoryForm, openEditCategoryForm, closeEditCategoryForm, openCategoryDetailModal, closeCategoryDetailModal, openCategorieSearchList, closecategoriesearchList, categoriesearchName } = categorySlice.actions;
export default categorySlice.reducer;

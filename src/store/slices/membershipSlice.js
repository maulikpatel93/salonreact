import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import membershipApiController from "../../services/membership.service";
import HandleError from "../HandleError";
import HandleResponse from "../HandleResponse";
export const usersAdapter = createEntityAdapter();

export const MembershipStoreApi = createAsyncThunk("membership/create", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .create(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "create"))
      .catch((error) => HandleError(thunkAPI, error, "create"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const MembershipUpdateApi = createAsyncThunk("membership/update", async (formvalues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .update(formvalues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "update"))
      .catch((error) => HandleError(thunkAPI, error, "update"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: message });
  }
});

export const MembershipGridViewApi = createAsyncThunk("membership/gridview", async (formValues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "gridview"))
      .catch((error) => HandleError(thunkAPI, error, "gridview"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const MembershipOptions = createAsyncThunk("membership/MembershipOptions", async (formValues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "MembershipOptions"))
      .catch((error) => HandleError(thunkAPI, error, "MembershipOptions"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const MembershipDetailApi = createAsyncThunk("membership/detail", async (formValues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .view(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "detail"))
      .catch((error) => HandleError(thunkAPI, error, "detail"));
    return resposedata;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const MembershipDeleteApi = createAsyncThunk("membership/delete", async (formValues, thunkAPI) => {
  try {
    const resposedata = await membershipApiController
      .deleted(formValues, thunkAPI)
      .then((response) => HandleResponse(thunkAPI, response, "delete"))
      .catch((error) => HandleError(thunkAPI, error, "delete"));
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
  isMembershipOption: []
};

const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    reset: () => initialState,
    OpenAddMembershipForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "open";
    },
    CloseAddMembershipForm: (state = initialState) => {
      state.isOpenedEditForm = "";
      state.isOpenedAddForm = "";
    },
    OpenEditMembershipForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "open";
    },
    CloseEditMembershipForm: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedEditForm = "";
    },
    OpenMembershipDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "open";
    },
    CloseMembershipDetailModal: (state = initialState) => {
      state.isOpenedAddForm = "";
      state.isOpenedDetailModal = "";
    }
  },
  extraReducers: {
    [MembershipStoreApi.pending]: () => {},
    [MembershipStoreApi.fulfilled]: (state, action) => {
      if (state.isGridView && state.isGridView.data) {
        state.isGridView.data = [action.payload, ...state.isGridView.data];
      } else {
        state.isGridView = { data: [action.payload] };
      }
    },
    [MembershipStoreApi.rejected]: () => {},
    [MembershipUpdateApi.pending]: () => {},
    [MembershipUpdateApi.fulfilled]: (state, action) => {
      const { id, ...changes } = action.payload;
      const existingData = state.isGridView.data.find((event) => event.id === id);
      if (existingData) {
        Object.keys(changes).map((keyName) => {
          existingData[keyName] = changes[keyName];
        });
      }
    },
    [MembershipUpdateApi.rejected]: () => {},
    [MembershipGridViewApi.pending]: () => {},
    [MembershipGridViewApi.fulfilled]: (state, action) => {
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
    [MembershipGridViewApi.rejected]: (state) => {
      state.isGridView = [];
    },
    [MembershipDetailApi.pending]: () => {},
    [MembershipDetailApi.fulfilled]: (state, action) => {
      state.isDetailData = action.payload;
    },
    [MembershipDetailApi.rejected]: (state) => {
      state.isDetailData = "";
    },
    [MembershipDeleteApi.pending]: () => {},
    [MembershipDeleteApi.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.isGridView.data = state.isGridView.data ? state.isGridView.data.filter((item) => item.id != id) : state.isGridView.filter((item) => item.id != id);
    },
    [MembershipDeleteApi.rejected]: () => {},
    [MembershipOptions.pending]: () => {},
    [MembershipOptions.fulfilled]: (state, action) => {
      state.isMembershipOption = action.payload;
    },
    [MembershipOptions.rejected]: (state) => {
      state.isMembershipOption = [];
    },
  },
});
// Action creators are generated for each case reducer function
export const { reset, OpenAddMembershipForm, CloseAddMembershipForm, OpenEditMembershipForm, CloseEditMembershipForm, OpenMembershipDetailModal, CloseMembershipDetailModal, openMembershipSearchList, closemembershipsearchList, membershipSearchName } = membershipSlice.actions;
export default membershipSlice.reducer;

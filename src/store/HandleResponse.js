import Unauthorized from "./Unauthorized";

const HandleResponse = (thunkAPI, response, type) => {
  if (response.status == 200) {
    return thunkAPI.fulfillWithValue(response.data);
  } else {
    return thunkAPI.rejectWithValue();
  }
};

export default HandleResponse;

import Unauthorized from "./Unauthorized";

const HandleError = (thunkAPI, error) => {
  if (error.response && error.response.status == 422) {
    const messages = (error.response && error.response.data && error.response.data) || error.message || error.toString();
    return thunkAPI.rejectWithValue({ status: error.response.status, message: messages });
  } else if (error.response.status == 401) {
    Unauthorized(thunkAPI);
  } else if(error.response == undefined){
    Unauthorized(thunkAPI);
  }
  const messages = (error.response && error.response.data && error.response.data) || error.message || error.toString();
  return thunkAPI.rejectWithValue({ status: error.response.status, message: messages });
};

export default HandleError;

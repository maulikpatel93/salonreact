import Unauthorized from "./Unauthorized";
import { setMessage } from "./slices/message";

const HandleError = (thunkAPI, error, type) => {
  if (error.response && error.response.status === 422) {
    const messages = (error.response && error.response.data && error.response.data) || error.message || error.toString();
    if (type === "login" && messages && messages.message) {
      thunkAPI.dispatch(setMessage(messages.message));
    }
    return thunkAPI.rejectWithValue({ status: error.response.status, message: messages });
  } else if (error.response.status === 401) {
    Unauthorized(thunkAPI);
  } else if (error.response === undefined) {
    Unauthorized(thunkAPI);
  }
  const messages = (error.response && error.response.data && error.response.data) || error.message || error.toString();
  return thunkAPI.rejectWithValue({ status: error.response.status, message: messages });
};

export default HandleError;

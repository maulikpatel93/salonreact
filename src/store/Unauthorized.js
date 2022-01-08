const Unauthorized = (thunkAPI) => {
  thunkAPI.dispatch({ type: "auth/logout" });
  window.location.reload(false);
};

export default Unauthorized;

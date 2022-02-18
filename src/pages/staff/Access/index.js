import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

// import config from "../../../config";
// import { salonmoduleAccessViewApi } from "../../../store/slices/salonmoduleSlice";
import AccessForm from "./AcessForm";

const Access = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();

  // const auth = useSelector((state) => state.auth);
  // const currentUser = auth.user;

  useEffect(() => {
    // dispatch(salonmoduleAccessViewApi({ type: "staff_access" }));
  }, []);

  return <>{<AccessForm />}</>;
};

export default Access;

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

// import config from "../../../config";
import { salonmoduleListViewApi } from "../../../store/slices/salonmoduleSlice";
import AccessForm from "./AcessForm";

const Access = () => {
  // const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(salonmoduleListViewApi({ role_id: 5 }));
  }, []);

  return <>{<AccessForm />}</>;
};

export default Access;

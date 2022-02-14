import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import InfiniteScroll from "react-infinite-scroll-component";

// import config from "../../../config";
import { salonpermissionListViewApi } from "../../../store/slices/salonpermissionSlice";
// import { ucfirst } from "helpers/functions";

const Access = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(salonpermissionListViewApi());
  }, []);

  return (
    <>
     
    </>
  );
};

export default Access;

import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const SaleListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  return <>{objectData && Object.keys(objectData).map((item) => {})}</>;
};

SaleListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default SaleListView;

import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import { serviceListViewApi, closeServiceSearchList, serviceSearchName } from "../../../store/slices/serviceSlice";
import { ucfirst } from "../../../helpers/functions";

const ServiceSuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    dispatch(serviceSearchName(suggetionname));
    dispatch(closeServiceSearchList());
    dispatch(serviceListViewApi({ id: suggetionid, result:"result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let category_name = objectData[item].category ? objectData[item].category.name : "";
          return (
            <li className="service-suggetion-li" key={i} data-id={id} data-name={ucfirst(name)}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                {/* <div className="user-img me-2">{<div className="user-initial">{name.charAt(0)}</div>}</div> */}
                <div className="user-id">
                  <span className="user-name">{ucfirst(name)}</span>
                  <span className="user-id">{ucfirst(category_name)}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li>{t("no_data_found")}</li> : ""}
    </>
  );
};
ServiceSuggetionListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};
export default ServiceSuggetionListView;

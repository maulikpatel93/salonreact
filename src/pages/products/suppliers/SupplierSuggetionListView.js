import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import { supplierGridViewApi, closeSupplierSearchList, supplierSearchName } from "../../../store/slices/supplierSlice";
import { ucfirst } from "../../../helpers/functions";

// import ReactPaginate from 'react-paginate';

const SupplierSuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const view = props.view;
  // const view = useSelector((state) => state.supplier.isView);
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    dispatch(supplierSearchName(suggetionname));
    dispatch(closeSupplierSearchList());
    dispatch(supplierGridViewApi({ id: suggetionid, result:"result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let first_name = objectData[item].first_name;
          let last_name = objectData[item].last_name;
          let profile_photo_url = objectData[item].profile_photo_url;
          return (
            <li className="supplier-suggetion-li" key={i} data-id={id} data-name={ucfirst(name)}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                <div className="user-img me-2">{profile_photo_url ? <img src={profile_photo_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>}</div>
                <div className="user-id">
                  <span className="user-name">{ucfirst(name)}</span>
                  <span className="user-id">{ucfirst(first_name + " " + last_name)}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li>{t("No data found")}</li> : ""}
    </>
  );
};
SupplierSuggetionListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};
export default SupplierSuggetionListView;

import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
// import { ClientListViewApi, CloseClientSearchList, ClientSearchName, ClientSearchObj } from "../../../store/slices/saSlice";
import { CreateInvoiceListViewApi, InvoiceListViewApi, ClientSearchName, CloseClientSearchList, ClientSearchObj } from "store/slices/saleSlice";
import { ucfirst } from "../../../helpers/functions";
import PropTypes from "prop-types";
// import ReactPaginate from 'react-paginate';

const SaleClientSuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const view = props.view;
  const page = props.page;
  // const view = useSelector((state) => state.client.isView);
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    let suggetionobj = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && JSON.parse(e.currentTarget.parentElement.dataset.obj);
    dispatch(ClientSearchObj(suggetionobj));
    dispatch(ClientSearchName(suggetionname));
    dispatch(CloseClientSearchList());
    dispatch(InvoiceListViewApi({ client_id: suggetionid, result: "result_array" }));
    dispatch(CreateInvoiceListViewApi({ client_id: suggetionid, result: "result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let first_name = objectData[item].first_name;
          let last_name = objectData[item].last_name;
          let email = objectData[item].email;
          let profile_photo_url = objectData[item].profile_photo_url;
          return (
            <li className="client-suggetion-li" key={i} data-id={id} data-name={ucfirst(first_name + " " + last_name)} data-obj={JSON.stringify(objectData[item])}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                <div className="user-img me-2">{profile_photo_url ? <img src={profile_photo_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>}</div>
                <div className="user-id">
                  {page && page === "saleaddForm" ? <h3 className="user-name mb-1">{ucfirst(first_name + " " + last_name)}</h3> : <span className="user-name">{ucfirst(first_name + " " + last_name)}</span>}
                  <span className="user-id">{email}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li className="fw-bold ps-3">{t("No data found")}</li> : ""}
    </>
  );
};
SaleClientSuggetionListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  page: PropTypes.string,
};
export default SaleClientSuggetionListView;

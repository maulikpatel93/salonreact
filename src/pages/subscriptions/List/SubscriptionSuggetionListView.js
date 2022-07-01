import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import { SubscriptionGridViewApi, CloseSubscriptionSearchList, SubscriptionSearchName, SubscriptionSearchObj } from "../../../store/slices/subscriptionSlice";
import { ucfirst } from "../../../helpers/Functions";
import PropTypes from "prop-types";
// import ReactPaginate from 'react-paginate';

const SubscriptionSuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const view = props.view;
  const page = props.page;
  const formik = props.formik;
  // const view = useSelector((state) => state.subscription.isView);
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    let suggetionobj = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && JSON.parse(e.currentTarget.parentElement.dataset.obj);

    dispatch(SubscriptionSearchObj(suggetionobj));
    dispatch(SubscriptionSearchName(suggetionname));
    dispatch(CloseSubscriptionSearchList());
    dispatch(SubscriptionGridViewApi({ id: suggetionid, result: "result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          return (
            <li className="subscription-suggetion-li" key={i} data-id={id} data-name={ucfirst(name)} data-obj={JSON.stringify(objectData[item])}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                <div className="user-id">
                  <span className="user-name">{ucfirst(name)}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li className="fw-bold ps-3">{t("No data found")}</li> : ""}
    </>
  );
};
SubscriptionSuggetionListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  formik: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  page: PropTypes.string,
};
export default SubscriptionSuggetionListView;

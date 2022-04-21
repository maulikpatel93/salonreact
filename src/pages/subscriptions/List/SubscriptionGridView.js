import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { OpenEditSubscriptionForm, SubscriptionDeleteApi, SubscriptionDetailApi, SubscriptionServiceCartApi } from "../../../store/slices/subscriptionSlice";
import { checkaccess } from "helpers/functions";
import { SaleSubscriptionToCartApi, openAddSaleForm, SaleTabView } from "store/slices/saleSlice";
import config from "../../../config";

const SubscriptionGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const view = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.subscription.isView);

  const objectData = view && view.data ? view.data : view;
  const handleSubscriptionDelete = (e) => {
    const propsobj = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(propsobj.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this subscription?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(SubscriptionDeleteApi({ id: propsobj.id }));
    }
  };

  const handleEditForm = (e) => {
    const id = e.currentTarget.closest(".subscription-grid").dataset.id;
    dispatch(SubscriptionDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(OpenEditSubscriptionForm());
        // dispatch(SubscriptionServiceCartApi({ event: "editClick", data: action.payload }));
      }
    });
  };
  const handleSubscriptionSaleClick = (e) => {
    const subscription_id = e.currentTarget.closest(".subscription-grid").dataset.id;
    dispatch({ type: "sale/reset" });
    dispatch(openAddSaleForm());
    dispatch(SaleTabView("subscriptions"));
    dispatch(SaleSubscriptionToCartApi({ subscription_id: subscription_id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let amount = objectData[item].amount;
          return (
            <div className="box-image-cover client-detail subscription-grid" key={item} data-id={id}>
              <div className="tabs-image user-initial mx-auto fw-semibold">{`$${amount}`}</div>
              <div className="image-content">
                <h5 className="fw-semibold mb-2">{name}</h5>
                <a className="edit me-1 cursor-pointer" onClick={handleEditForm}>
                  {t("Edit")}
                </a>
                <a className="sell me-1 cursor-pointer" onClick={handleSubscriptionSaleClick}>
                  {t("Sell")}
                </a>
                <a className="delete cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleSubscriptionDelete}>
                  <img src={config.imagepath + "delete.png"} alt="" />
                </a>
              </div>
            </div>
          );
        })}
    </>
  );
};
SubscriptionGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};
export default SubscriptionGridView;

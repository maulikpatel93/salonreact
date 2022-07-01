import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { ucfirst } from "../../../helpers/Functions";
import { SaleSubscriptionToCartApi } from "store/slices/saleSlice";

const SaleSubscriptionGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;
  const isCartSubscription = useSelector((state) => state.sale.isCart.subscription);

  const handleSubscriptionClick = (e) => {
    const subscriptiondata = JSON.parse(e.currentTarget.dataset.obj);
    const subscription_id = subscriptiondata.id;
    dispatch(SaleSubscriptionToCartApi({ subscription_id: subscription_id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let amount = objectData[item].amount;
          if (isCartSubscription.length > 0) {
            return (
              <div className="col-md-6 text-center mb-3" key={i}>
                <a id="invoice-link" className="d-block subscription-box" data-id={id} data-obj={JSON.stringify(objectData[item])}>
                  <h5 className="mb-1 fw-semibold">{name}</h5>
                  <h6 className="mb-0">{`$${amount}`}</h6>
                </a>
              </div>
            );
          } else {
            return (
              <div className="col-md-6 text-center mb-3 cursor-pointer" key={i}>
                <a id="invoice-link" className="d-block subscription-box cursor-pointer" data-id={id} data-obj={JSON.stringify(objectData[item])} onClick={handleSubscriptionClick}>
                  <h5 className="mb-1 fw-semibold">{name}</h5>
                  <h6 className="mb-0">{`$${amount}`}</h6>
                </a>
              </div>
            );
          }
        })}
    </>
  );
};

SaleSubscriptionGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default SaleSubscriptionGridView;

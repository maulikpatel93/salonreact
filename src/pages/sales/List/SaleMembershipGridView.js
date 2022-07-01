import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { ucfirst } from "../../../helpers/Functions";
import { SaleMembershipToCartApi } from "store/slices/saleSlice";

const SaleMembershipGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;
  const isCartMember = useSelector((state) => state.sale.isCart.membership);

  const handleMembershipClick = (e) => {
    const membershipdata = JSON.parse(e.currentTarget.dataset.obj);
    const membership_id = membershipdata.id;
    dispatch(SaleMembershipToCartApi({ membership_id: membership_id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let credit = objectData[item].credit;
          let cost = objectData[item].cost;
          if (isCartMember.length > 0) {
            return (
              <div className="col-md-6 text-center mb-3" key={i}>
                <a id="invoice-link" className="d-block membership-box" data-id={id} data-obj={JSON.stringify(objectData[item])}>
                  <h5 className="mb-1 fw-semibold">{name}</h5>
                  <h6 className="mb-0">
                    {`$${cost}`} ({`$${credit} ${t("Credit")}`})
                  </h6>
                </a>
              </div>
            );
          } else {
            return (
              <div className="col-md-6 text-center mb-3" key={i}>
                <a id="invoice-link" className="d-block membership-box cursor-pointer" data-id={id} data-obj={JSON.stringify(objectData[item])} onClick={handleMembershipClick}>
                  <h5 className="mb-1 fw-semibold">{name}</h5>
                  <h6 className="mb-0">
                    {`$${cost}`} ({`$${credit} ${t("Credit")}`})
                  </h6>
                </a>
              </div>
            );
          }
        })}
    </>
  );
};

SaleMembershipGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default SaleMembershipGridView;

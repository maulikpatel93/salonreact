import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { ucfirst } from "../../../helpers/functions";
import { SaleVoucherToCartApi } from "store/slices/saleSlice";

const SaleVoucherGridView = (props) => {
  const dispatch = useDispatch();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  const handleVoucherClick = (e) => {
    const voucherdata = JSON.parse(e.currentTarget.dataset.obj);
    const voucher_id = voucherdata.id;
    dispatch(SaleVoucherToCartApi({ voucher_id: voucher_id }));
  };
  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-6 mb-3">
        <div className="vouchre-grid box-image-cover text-center m-0 w-100">
          <div className="tabs-image user-initial mx-auto">
            <i className="fas fa-gift fa-2x"></i>
          </div>
          <div className="image-content">
            <h5 className="fw-semibold mb-3">{"One-Off Voucher"}</h5>
          </div>
        </div>
      </div>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let amount = objectData[item].amount;
          return (
            // <div className="col-md-4 text-center mb-3" key={i} data-id={id} data-obj={JSON.stringify(objectData[item])} onClick={handleVoucherClick}>
            //   <div className="tabs-image user-initial mx-auto">{"$" + amount}</div>
            //   <div className="image-content">
            //     <h5 className="fw-semibold mb-3">{name}</h5>
            //   </div>
            // </div>
            <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={i}>
              <div className="vouchre-grid box-image-cover text-center m-0 w-100 cursor-pointer" data-id={id} data-obj={JSON.stringify(objectData[item])} onClick={handleVoucherClick}>
                <div className="tabs-image user-initial mx-auto">{"$" + amount}</div>
                <div className="image-content">
                  <h5 className="fw-semibold mb-3">{name}</h5>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

SaleVoucherGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default SaleVoucherGridView;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { OpenVoucherToForm, VoucherToFormData } from "store/slices/saleSlice";

const SaleVoucherGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;
  const isCartVoucher = useSelector((state) => state.sale.isCart.vouchers);
  const handleVoucherClick = (e) => {
    const voucherdata = JSON.parse(e.currentTarget.dataset.obj);
    dispatch(OpenVoucherToForm());
    dispatch(VoucherToFormData({ type: "Voucher", voucher: voucherdata }));
  };
  const handleOneOffVoucherClick = () => {
    dispatch(OpenVoucherToForm());
    dispatch(VoucherToFormData({ type: "OneOffVoucher" }));
  };

  return (
    <>
      <div className="col-xxl-3 col-lg-4 col-md-6 text-center mb-3">
        <a id="invoice-link" className="d-block voucher-box" onClick={handleOneOffVoucherClick}>
          <div className="voucher-center-box">
            <img src={config.imagepath + "Frame.png"} alt="icon" />
          </div>
          <h5 className="mb-1 fw-semibold">{"One-Off Voucher"}</h5>
        </a>
      </div>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let amount = objectData[item].amount;

          let cartvoucher = isCartVoucher.filter((item) => item.id === id);
          let dataObj = objectData[item];
          if (cartvoucher.length === 1) {
            dataObj = { ...objectData[item], voucher_to: cartvoucher[0] && cartvoucher[0].voucher_to ? cartvoucher[0].voucher_to : "" };
          }
          if (isCartVoucher.length > 0) {
            return (
              <div className="col-xxl-3 col-lg-4 col-md-6 text-center mb-3" key={i}>
                {cartvoucher.length === 1 ? (
                  <a id="invoice-link" className="d-block voucher-box birthday_vocher cursor-pointer" data-id={id} data-obj={JSON.stringify(dataObj)} onClick={handleVoucherClick}>
                    <div className="voucher-center-box ">
                      <span>{"$" + amount}</span>
                    </div>
                    <h5 className="mb-1 fw-semibold">{name}</h5>
                    {cartvoucher.length === 1 && (
                      <div className="birdthday_addtop">
                        <img src={config.imagepath + "check.png"} alt="chek-icon" />
                        <p>{t("Added")}</p>
                      </div>
                    )}
                  </a>
                ) : (
                  <a id="invoice-link" className="d-block voucher-box birthday_vocher" data-id={id} data-obj={JSON.stringify(dataObj)}>
                    <div className="voucher-center-box ">
                      <span>{"$" + amount}</span>
                    </div>
                    <h5 className="mb-1 fw-semibold">{name}</h5>
                  </a>
                )}
              </div>
            );
          } else {
            return (
              <div className="col-xxl-3 col-lg-4 col-md-6 text-center mb-3" key={i}>
                <a id="invoice-link" className="d-block voucher-box birthday_vocher cursor-pointer" data-id={id} data-obj={JSON.stringify(dataObj)} onClick={handleVoucherClick}>
                  <div className="voucher-center-box ">
                    <span>{"$" + amount}</span>
                  </div>
                  <h5 className="mb-1 fw-semibold">{name}</h5>
                </a>
              </div>
            );
          }
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

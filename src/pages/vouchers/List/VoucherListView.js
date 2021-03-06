import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import { ucfirst } from "../../../helpers/Functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { openEditVoucherForm, voucherDeleteApi, voucherDetailApi } from "../../../store/slices/voucherSlice";
import { checkaccess } from "helpers/Functions";
import { openAddSaleForm, SaleTabView } from "store/slices/saleSlice";

const VoucherListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const view = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.voucher.isView);

  const objectData = view && view.data ? view.data : view;
  const handleVoucherDelete = (e) => {
    const propsobj = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(propsobj.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this voucher?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(voucherDeleteApi({ id: propsobj.id }));
    }
  };

  const handleEditForm = (e) => {
    const id = e.currentTarget.closest(".voucher-action").dataset.id;
    dispatch(voucherDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(openEditVoucherForm());
      }
    });
  };
  const handleVoucherSaleClick = (e) => {
    const voucher_id = e.currentTarget.closest(".voucher-action").dataset.id;
    console.log(voucher_id);
    dispatch({ type: "sale/reset" });
    dispatch(openAddSaleForm());
    dispatch(SaleTabView("vouchers"));
    // dispatch(SaleVoucherToCartApi({ voucher_id: voucher_id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let amount = objectData[item].amount;
          return (
            <div className="voucher-action p-3 mb-3" key={item} data-id={id}>
              <div className="row gx-2">
                <div className="col-9">
                  <h5 className="fw-semibold mb-md-3 mb-2">{t("{{amount}} off {{name}}", { amount: "$" + amount, name: name })}</h5>
                </div>
                <div className="col-3">
                  <h5 className="fw-semibold text-end mb-md-3 mb-2">${amount}</h5>
                </div>
              </div>
              <a className="edit me-1 cursor-pointer" onClick={handleEditForm}>
                {t("Edit")}
              </a>
              <a id="salevoucher-link" className="sell me-1 cursor-pointer" onClick={handleVoucherSaleClick}>
                {t("Sell")}
              </a>
              <a className="delete cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleVoucherDelete}>
                {t("Delete")}
              </a>
            </div>
          );
        })}
    </>
  );
};
VoucherListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  role_id: PropTypes.number,
};
export default VoucherListView;

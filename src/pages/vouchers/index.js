import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import VoucherList from "./List";
import VoucherPreview from "./List/VoucherPreview";
import VoucherAddForm from "./Form/VoucherAddForm";
import VoucherEditForm from "./Form/VoucherEditForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { openAddVoucherForm, voucherListViewApi } from "store/slices/voucherSlice";

const Vouchers = () => {
  SalonModule();
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  const isVoucherPreview = useSelector((state) => state.voucher.isVoucherPreview);
  const isOpenedAddForm = useSelector((state) => state.voucher.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.voucher.isOpenedEditForm);

  useEffect(() => {
    dispatch(openAddVoucherForm());
    dispatch(voucherListViewApi());
    dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
  }, []);

  return (
    <>
      <div className="page-content">
        <div className="vouchers">
          <div className="d-flex flex-wrap">
            <VoucherList />
            {isOpenedAddForm && <VoucherAddForm service={isServiceOption} />}
            {isOpenedEditForm && <VoucherEditForm service={isServiceOption} />}
            <VoucherPreview preview={isVoucherPreview} service={isServiceOption} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Vouchers;

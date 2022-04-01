import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";
import VoucherPreview from "./List/VoucherPreview";
import VoucherAddForm from "./Form/VoucherAddForm";
import VoucherEditForm from "./Form/VoucherEditForm";
import { serviceOptions } from "store/slices/serviceSlice";
import { OpenAddVoucherForm, VoucherGridViewApi } from "store/slices/voucherSlice";

const VoucherDrawer = () => {
  SalonModule();
  // const { t } = useTranslation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const rightDrawerOpened = useSelector((state) => state.voucher.isOpenedAddForm);
  const isServiceOption = useSelector((state) => state.service.isServiceOption);
  const isVoucherPreview = useSelector((state) => state.voucher.isVoucherPreview);
  const isOpenedAddForm = useSelector((state) => state.voucher.isOpenedAddForm);
  const isOpenedEditForm = useSelector((state) => state.voucher.isOpenedEditForm);

  useEffect(() => {
    dispatch(OpenAddVoucherForm());
    dispatch(VoucherGridViewApi());
    dispatch(serviceOptions({ option: { valueField: "id", labelField: "name" } }));
  }, []);

  return (
    <>
      <div className={(rightDrawerOpened ? "full-screen-drawer p-0 " : "") + rightDrawerOpened} id="addproduct-drawer">
        <div className="drawer-wrp position-relative">
          <div className="vouchers">
            <div className="d-flex flex-wrap">
              {isOpenedAddForm && <VoucherAddForm service={isServiceOption} />}
              {isOpenedEditForm && <VoucherEditForm service={isServiceOption} />}
              <VoucherPreview preview={isVoucherPreview} service={isServiceOption} currentUser={currentUser} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VoucherDrawer;

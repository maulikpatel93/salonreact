import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import Appointment from "./Appointment";
import ClientEditForm from "../Form/ClientEditForm";
import Voucher from "./Voucher";
import Subscription from "./Subscription";
import Membership from "./Membership";
import Photos from "./Photos";
import Invoices from "./Invoices";
import Documents from "./Documents";
import Notes from "./Notes";
import { CloseClientDetailModal, ClientDetailTab } from "../../../store/slices/clientSlice";
import { ucfirst } from "../../../helpers/Functions";
import { ClientphotoGridViewApi } from "store/slices/clientphotoSlice";
import { ClientdocumentGridViewApi } from "store/slices/clientdocumentSlice";
import { ClientnoteGridViewApi } from "store/slices/clientnoteSlice";
import { checkaccess } from "helpers/Functions";
import { ClientAppointmentListViewApi, openAppointmentFilter } from "store/slices/appointmentSlice";
import { ClientMembershipListViewApi } from "store/slices/clientmembershipSlice";
import { ClientInvoiceListViewApi } from "store/slices/clientinvoiceSlice";
import { ClientVoucherListViewApi } from "store/slices/clientvoucherSlice";

const ClientDetailModal = () => {
  const rightDrawerOpened = useSelector((state) => state.client.isOpenedDetailModal);
  const detailTab = useSelector((state) => state.client.isClientDetailTab);
  const detail = useSelector((state) => state.client.isDetailData);

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const isFilter = useSelector((state) => state.appointment.isFilter);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleCloseClientDetailModal = () => {
    dispatch(CloseClientDetailModal());
    dispatch({ type: "client/detail/rejected" });
  };
  const first_name = detail.first_name;
  const last_name = detail.last_name;
  const email = detail.email;
  // let phone_number = detail.phone_number;
  const profile_photo_url = detail.profile_photo_url;
  const filterOption = [
    { value: "", label: t("All") },
    { value: "Scheduled", label: t("Scheduled") },
    { value: "Confirmed", label: t("Confirmed") },
    { value: "Completed", label: t("Completed") },
    { value: "Cancelled", label: t("Cancelled") },
  ];
  return (
    <React.Fragment>
      <div className={"drawer client-detaildrawer p-0 " + rightDrawerOpened}>
        <div className="drawer-wrp">
          <a className="close-drawer cursor-pointer" onClick={handleCloseClientDetailModal}>
            <img src={config.imagepath + "close-icon.svg"} alt="" />
          </a>
          <div className="drawer-body row">
            <div className="left-menu col-md-5">
              <div className="d-flex mb-3">
                {profile_photo_url ? (
                  <div className="user me-md-3 me-2">
                    <a data-fancybox="" data-src={profile_photo_url}>
                      <img src={profile_photo_url} alt="" className="rounded-circle wh-40" />
                    </a>
                  </div>
                ) : (
                  <div className="user-initial me-md-3 me-2">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>
                )}
                <div className="user-id">
                  <h3 className="user-name mb-0">{ucfirst(first_name + " " + last_name)}</h3>
                  <span className="user-id">{email}</span>
                </div>
              </div>
              <div className="row gx-2 action-box mb-3 align-items-end">
                <a href="#" className="col text-center text-decoration-none">
                  <img src={config.imagepath + "appoinment.png"} alt="" />
                  <span className="d-block">{t("Appointment")}</span>
                </a>
                <a href="#" className="col text-center text-decoration-none">
                  <img src={config.imagepath + "sale-light.png"} alt="" />
                  <span className="d-block">{t("Sale")}</span>
                </a>
                <a href="#" className="col text-center text-decoration-none">
                  <img src={config.imagepath + "email.png"} alt="" />
                  <span className="d-block">{t("Email Address")}</span>
                </a>
                <a href="#" className="col text-center text-decoration-none">
                  <img src={config.imagepath + "sms.png"} alt="" />
                  <span className="d-block">{t("SMS")}</span>
                </a>
              </div>
              <ul className="nav flex-md-column nav-pills mb-0 list-unstyled" id="myTab" role="tablist">
                {checkaccess({ name: "list", role_id: role_id, controller: "appointment", access }) && (
                  <li className="nav-item" role="presentation">
                    <button
                      className={"nav-link" + (detailTab && detailTab == "appointment" ? " active" : "")}
                      id="appoinment"
                      data-bs-toggle="tab"
                      data-bs-target="#appoinment-tab"
                      type="button"
                      role="tab"
                      onClick={() => {
                        dispatch(ClientDetailTab("appointment"));
                        dispatch(ClientAppointmentListViewApi({ client_id: detail.id, isFilter: isFilter }));
                      }}
                    >
                      {t("Appointments")}
                    </button>
                  </li>
                )}
                {checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) && (
                  <li className="nav-item" role="presentation">
                    <button className={"nav-link" + (detailTab && detailTab == "clientdetail" ? " active" : "")} id="client-detail" data-bs-toggle="tab" data-bs-target="#client-detail-tab" type="button" role="tab" onClick={() => dispatch(ClientDetailTab("clientdetail"))}>
                      {t("Client Details")}
                    </button>
                  </li>
                )}
                <li className="nav-item" role="presentation">
                  <button
                    className={"nav-link" + (detailTab && detailTab == "vouchers" ? " active" : "")}
                    id="vouchers"
                    data-bs-toggle="tab"
                    data-bs-target="#vouchers-tab"
                    type="button"
                    role="tab"
                    onClick={() => {
                      dispatch(ClientDetailTab("vouchers"));
                      dispatch(ClientVoucherListViewApi({ client_id: detail.id }));
                    }}
                  >
                    {t("Vouchers")}
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={"nav-link" + (detailTab && detailTab == "subscriptions" ? " active" : "")} id="subscriptions" data-bs-toggle="tab" data-bs-target="#subscriptions-tab" type="button" role="tab" onClick={() => dispatch(ClientDetailTab("subscriptions"))}>
                    {t("Subscriptions")}
                  </button>
                </li>
                {checkaccess({ name: "list", role_id: role_id, controller: "clientmembership", access }) && (
                  <li className="nav-item" role="presentation">
                    <button
                      className={"nav-link" + (detailTab && detailTab == "memberships" ? " active" : "")}
                      id="memberships"
                      data-bs-toggle="tab"
                      data-bs-target="#memberships-tab"
                      type="button"
                      role="tab"
                      onClick={() => {
                        dispatch(ClientDetailTab("memberships"));
                        dispatch(ClientMembershipListViewApi({ client_id: detail.id }));
                      }}
                    >
                      {t("Memberships")}
                    </button>
                  </li>
                )}
                {checkaccess({ name: "list", role_id: role_id, controller: "clientphotos", access }) && (
                  <li className="nav-item" role="presentation">
                    <button
                      className={"nav-link" + (detailTab && detailTab == "photos" ? " active" : "")}
                      id="photos"
                      data-bs-toggle="tab"
                      data-bs-target="#photos-tab"
                      type="button"
                      role="tab"
                      onClick={() => {
                        dispatch(ClientDetailTab("photos"));
                        dispatch(ClientphotoGridViewApi({ client_id: detail.id }));
                      }}
                    >
                      {t("Photos")}
                    </button>
                  </li>
                )}
                <li className="nav-item" role="presentation">
                  <button
                    className={"nav-link" + (detailTab && detailTab == "invoices" ? " active" : "")}
                    id="invoices"
                    data-bs-toggle="tab"
                    data-bs-target="#invoices-tab"
                    type="button"
                    role="tab"
                    onClick={() => {
                      dispatch(ClientDetailTab("invoices"));
                      dispatch(ClientInvoiceListViewApi({ client_id: detail.id }));
                    }}
                  >
                    {t("Invoices")}
                  </button>
                </li>
                {checkaccess({ name: "list", role_id: role_id, controller: "clientdocuments", access }) && (
                  <li className="nav-item" role="presentation">
                    <button
                      className={"nav-link" + (detailTab && detailTab == "documents" ? " active" : "")}
                      id="documents"
                      data-bs-toggle="tab"
                      data-bs-target="#documents-tab"
                      type="button"
                      role="tab"
                      onClick={() => {
                        dispatch(ClientDetailTab("documents"));
                        dispatch(ClientdocumentGridViewApi({ client_id: detail.id }));
                      }}
                    >
                      {t("Documents")}
                    </button>
                  </li>
                )}
                {checkaccess({ name: "list", role_id: role_id, controller: "clientnotes", access }) && (
                  <li className="nav-item" role="presentation">
                    <button
                      className={"nav-link" + (detailTab && detailTab == "notes" ? " active" : "")}
                      id="notes"
                      data-bs-toggle="tab"
                      data-bs-target="#notes-tab"
                      type="button"
                      role="tab"
                      onClick={() => {
                        dispatch(ClientDetailTab("notes"));
                        dispatch(ClientnoteGridViewApi({ client_id: detail.id }));
                      }}
                    >
                      {t("Notes")}
                    </button>
                  </li>
                )}
              </ul>
            </div>
            <div className="content col-md-7 position-relative">
              <div className="tab-content" id="myTabContent">
                {checkaccess({ name: "list", role_id: role_id, controller: "appointment", access }) && (
                  <div className={"tab-pane fade" + (detailTab && detailTab == "appointment" ? " show active" : "")} id="appoinment-tab" role="tabpanel" aria-labelledby="appoinment-tab">
                    <div className="drawer-header">
                      <h2 className="mb-4 pe-md-5">
                        {t("Appointments")} <img src={config.imagepath + "print.png"} alt="" className="ms-md-2 ms-1" />
                      </h2>
                      <div className="row justify-content-end">
                        <div className="col-4 mb-3">
                          <select
                            className="form-control"
                            onChange={(e) => {
                              const filter = { status: e.currentTarget.value };
                              dispatch(openAppointmentFilter(filter));
                              dispatch(ClientAppointmentListViewApi({ client_id: detail.id, filter: filter }));
                            }}
                            value={isFilter && isFilter.status}
                          >
                            {filterOption &&
                              Object.keys(filterOption).map((item, i) => {
                                let value = filterOption[item].value;
                                let label = filterOption[item].label;
                                return (
                                  <option value={value} key={i}>
                                    {label}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="content-wrp" id={detailTab && "clientdetail_" + detailTab}>
                      {detailTab && detailTab == "appointment" && <Appointment role_id={role_id} access={access} />}
                    </div>
                  </div>
                )}
                {checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) && (
                  <div className={"tab-pane fade" + (detailTab && detailTab == "clientdetail" ? " show active" : "")} id="client-detail-tab" role="tabpanel" aria-labelledby="client-detail-tab">
                    <div className="drawer-header">
                      <h2 className="mb-4 pe-md-5">
                        {t("Edit Client")} <img src={config.imagepath + "print.png"} alt="" className="ms-md-2 ms-1" />
                      </h2>
                    </div>
                    <div className="content-wrp">
                      <ClientEditForm />
                    </div>
                  </div>
                )}
                <div className={"tab-pane fade" + (detailTab && detailTab == "vouchers" ? " show active" : "")} id="vouchers-tab" role="tabpanel" aria-labelledby="vouchers-tab">
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 mb-lg-5">
                      {t("Vouchers")}
                      <a href="#" className="btn sell-gift-voucher ms-2">
                        {t("Sell Gift Voucher")}
                      </a>
                    </h2>
                  </div>
                  <div className="content-wrp">
                    <Voucher />
                  </div>
                </div>
                <div className={"tab-pane fade" + (detailTab && detailTab == "subscriptions" ? " show active" : "")} id="subscriptions-tab" role="tabpanel" aria-labelledby="subscriptions-tab">
                  <div className="drawer-header">
                    <h2 className="mb-4 pe-md-5 mb-lg-5">{t("Subscriptions")}</h2>
                  </div>
                  <div className="content-wrp">
                    <Subscription />
                  </div>
                </div>
                <div className={"tab-pane fade" + (detailTab && detailTab == "memberships" ? " show active" : "")} id="memberships-tab" role="tabpanel" aria-labelledby="memberships-tab">
                  {detailTab && detailTab == "memberships" && <Membership role_id={role_id} access={access} />}
                </div>
                {checkaccess({ name: "list", role_id: role_id, controller: "clientphotos", access }) && (
                  <div className={"tab-pane fade" + (detailTab && detailTab == "photos" ? " show active" : "")} id="photos-tab" role="tabpanel" aria-labelledby="photos-tab">
                    {detailTab && detailTab == "photos" && <Photos role_id={role_id} access={access} />}
                  </div>
                )}
                <div className={"tab-pane fade" + (detailTab && detailTab == "invoices" ? " show active" : "")} id="invoices-tab" role="tabpanel" aria-labelledby="invoices-tab">
                  {detailTab && detailTab == "invoices" && <Invoices role_id={role_id} access={access} />}
                </div>
                {checkaccess({ name: "list", role_id: role_id, controller: "clientdocuments", access }) && (
                  <div className={"tab-pane fade" + (detailTab && detailTab == "documents" ? " show active" : "")} id="documents-tab" role="tabpanel" aria-labelledby="documents-tab">
                    {detailTab && detailTab == "documents" && <Documents role_id={role_id} access={access} />}
                  </div>
                )}
                {checkaccess({ name: "list", role_id: role_id, controller: "clientnotes", access }) && (
                  <div className={"tab-pane fade" + (detailTab && detailTab == "notes" ? " show active" : "")} id="notes-tab" role="tabpanel" aria-labelledby="notes-tab">
                    {detailTab && detailTab == "notes" && <Notes role_id={role_id} access={access} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClientDetailModal;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { OpenListModal, ProductFilter, ReportListViewApi, ResetProductFilter, ResetServiceFilter, ResetStaffFilter, ResetSupplierFilter, ServiceFilter, StaffFilter, SupplierFilter } from "store/slices/reportSlice";
import { staffOptionsDropdown } from "../../../store/slices/staffSlice";
import { ucfirst } from "helpers/functions";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import PerformanceSummary from "./PerformanceSummary";
import SpinLoader from "component/SpinLoader";
import Clientretention from "./Clientretention";
import CancelledAppointments from "./CancelledAppointments";
import AppointmentSchedule from "./AppointmentSchedule";
import ProductStockLevel from "./ProductStockLevel";
import { SupplierOptionsDropdown } from "store/slices/supplierSlice";
import ClientList from "./ClientList";
import ClientBirthdays from "./ClientBirthdays";
import GiftVouchers from "./GiftVouchers";
import AbsentClients from "./AbsentClients";
import ClientsByService from "./ClientsByService";
import ClientsByProduct from "./ClientsByProduct";
import GiftVouchersActivity from "./GiftVouchersActivity";
import SalesByDay from "./SalesByDay";
import SalesByStaff from "./SalesByStaff";
import SalesByProduct from "./SalesByProduct";
import SalesByService from "./SalesByService";
import SalesByType from "./SalesByType";
import { ServiceOptionsDropdown } from "store/slices/serviceSlice";
import { ProductOptionsDropdown } from "store/slices/productSlice";

const ReportListView = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [state, setState] = useState({ start: "", end: "" });
  const { start, end } = state;

  const rightDrawerOpened = useSelector((state) => state.report.isOpenListModal);
  const isScreenReport = useSelector((state) => state.report.isScreenReport);
  const isStaffFilter = useSelector((state) => state.report.isStaffFilter);
  const isSupplierFilter = useSelector((state) => state.report.isSupplierFilter);
  const isServiceFilter = useSelector((state) => state.report.isServiceFilter);
  const isProductFilter = useSelector((state) => state.report.isProductFilter);
  const isStaffOptionDropdown = useSelector((state) => state.staff.isStaffOptionDropdown);
  const isSupplierOptionDropdown = useSelector((state) => state.supplier.isSupplierOptionDropdown);
  const isServiceOptionDropdown = useSelector((state) => state.service.isServiceOptionDropdown);
  const isProductOptionDropdown = useSelector((state) => state.product.isProductOptionDropdown);
  const labeldaterange = start && end ? start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD") : "";

  const [isLoaderList, setIsLoaderList] = useState(true);

  useEffect(() => {
    if (isScreenReport.uniquename === "performance_summary" || isScreenReport.uniquename === "cancelled_appointments" || isScreenReport.uniquename === "appointment_schedule") {
      dispatch(staffOptionsDropdown({ dropdown: true }));
    }
    if (isScreenReport.uniquename === "stock_levels") {
      dispatch(SupplierOptionsDropdown({ dropdown: true }));
    }
    if (isScreenReport.uniquename === "clients_by_service") {
      dispatch(ServiceOptionsDropdown({ dropdown: true }));
    }
    if (isScreenReport.uniquename === "clients_by_product") {
      dispatch(ProductOptionsDropdown({ dropdown: true }));
    }
    if (isStaffFilter) {
      dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, staff_id: isStaffFilter.id, daterange: labeldaterange })).then(() => {
        setIsLoaderList(false);
      });
    } else if (isSupplierFilter) {
      dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, staff_id: isSupplierFilter.id, daterange: labeldaterange })).then(() => {
        setIsLoaderList(false);
      });
    } else {
      dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange })).then(() => {
        setIsLoaderList(false);
      });
    }
  }, [labeldaterange, isScreenReport]);

  const handleCallback = (start, end) => {
    setState({ start, end });
  };

  const handleCancel = () => {
    //picker.element.val("");
    setState({ start: "", end: "" });
  };
  const ListView = useSelector((state) => state.report.isListView);

  const fetchDataList = () => {
    dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, next_page_url: ListView.next_page_url }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return (
    <>
      <div className={rightDrawerOpened + " full-screen-drawer p-0 Reports-drawer"} id="PerformanceSummary-drawer">
        <div className="drawer-wrp position-relative">
          <div className="drawer-header px-md-4 px-3 py-3 d-flex flex-wrap align-items-center">
            <h3 className="mb-0 fw-semibold">{isScreenReport.title}</h3>
            <div className="ms-auto">
              <a className="close btn me-1 cursor-pointer btn-cancel" onClick={() => dispatch(OpenListModal(""))}>
                {t("Cancel")}
              </a>
            </div>
          </div>
          <div className="drawer-body">
            <div className="drawer-panel-header">
              <div className="row">
                <div className="col-md-7">
                  <div className="d-flex flex-wrap align-items-center">
                    <form action="" className="d-inline-block me-3">
                      {isScreenReport.uniquename === "client_birthdays" ? (
                        <select
                          className="form-select"
                          onChange={(e) => {
                            const selectedMonth = e.target.value;
                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, month: selectedMonth, daterange: labeldaterange }));
                          }}
                        >
                          <option value="">{t("--Select Months--")}</option>
                          {month.length > 0 &&
                            Object.keys(month).map((item) => {
                              return (
                                <option value={parseInt(item) + parseInt(1)} key={item}>
                                  {month[item]}
                                </option>
                              );
                            })}
                        </select>
                      ) : (
                        <DateRangePicker
                          initialSettings={{
                            startDate: start ? start.toDate() : moment().subtract(29, "days"),
                            endDate: end ? end.toDate() : moment(),
                            locale: {
                              format: "Do MMMM YYYY",
                            },
                            // ranges: {
                            //   Today: [moment().toDate(), moment().toDate()],
                            //   Yesterday: [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()],
                            //   "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
                            //   "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
                            //   "This Month": [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
                            //   "Last Month": [moment().subtract(1, "month").startOf("month").toDate(), moment().subtract(1, "month").endOf("month").toDate()],
                            // },
                          }}
                          onCallback={handleCallback}
                          // onEvent={handleEvent}
                          onCancel={handleCancel}
                        >
                          <div className="input-group" id="reportrange">
                            <input type="text" className="form-control date" defaultValue={labeldaterange} />
                            <span className="input-group-text cursor-pointer" id="basic-addon1" onClick={handleCancel}>
                              <i className="fas fa-times"></i>
                            </span>
                          </div>
                        </DateRangePicker>
                      )}
                    </form>

                    {isScreenReport.uniquename === "performance_summary" || isScreenReport.uniquename === "cancelled_appointments" || isScreenReport.uniquename === "appointment_schedule" ? (
                      <div className="col-sm-3">
                        <div className="dropdown staff-dropdown">
                          <div className="btn-group w-100">
                            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              {isStaffFilter ? isStaffFilter.name : t("All Staff")}
                            </button>
                            <span
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(ResetStaffFilter());
                                dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange }));
                              }}
                            >
                              x
                            </span>
                            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                              <ul className="p-0 m-0 list-unstyled">
                                {isStaffOptionDropdown &&
                                  Object.keys(isStaffOptionDropdown).map((item, i) => {
                                    let id = isStaffOptionDropdown[item].id;
                                    let first_name = isStaffOptionDropdown[item].first_name;
                                    let last_name = isStaffOptionDropdown[item].last_name;
                                    let image_url = isStaffOptionDropdown[item].profile_photo_url;
                                    let name = ucfirst(first_name) + " " + ucfirst(last_name);
                                    return (
                                      <li key={i} data-id={id}>
                                        <a
                                          className="d-flex align-items-center cursor-pointer"
                                          onClick={() => {
                                            dispatch(StaffFilter({ id, name }));
                                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, staff_id: id, daterange: labeldaterange }));
                                          }}
                                        >
                                          <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + last_name.charAt(0)}</div>}</div>
                                          <div className="user-id">
                                            <span className="user-name">{name}</span>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {isScreenReport.uniquename === "stock_levels" ? (
                      <div className="col-sm-3">
                        <div className="dropdown staff-dropdown">
                          <div className="btn-group w-100">
                            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              {isSupplierFilter ? isSupplierFilter.name : t("All Suppliers")}
                            </button>
                            <span
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(ResetSupplierFilter());
                                dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange }));
                              }}
                            >
                              x
                            </span>
                            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                              <ul className="p-0 m-0 list-unstyled">
                                {isSupplierOptionDropdown &&
                                  Object.keys(isSupplierOptionDropdown).map((item, i) => {
                                    let id = isSupplierOptionDropdown[item].id;
                                    let name = isSupplierOptionDropdown[item].name;
                                    let first_name = isSupplierOptionDropdown[item].first_name;
                                    let last_name = isSupplierOptionDropdown[item].last_name;
                                    let image_url = isSupplierOptionDropdown[item].logo_url;
                                    name = ucfirst(name);
                                    return (
                                      <li key={i} data-id={id}>
                                        <a
                                          className="d-flex align-items-center cursor-pointer"
                                          onClick={() => {
                                            dispatch(SupplierFilter({ id, name }));
                                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, supplier_id: id, daterange: labeldaterange }));
                                          }}
                                        >
                                          <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{first_name.charAt(0) + last_name.charAt(0)}</div>}</div>
                                          <div className="user-id">
                                            <span className="user-name">{name}</span>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {isScreenReport.uniquename === "clients_by_service" ? (
                      <div className="col-sm-3">
                        {/* <select
                          className="form-select"
                          onChange={(e) => {
                            var index = e.target.selectedIndex;
                            var optionElement = e.target.childNodes[index];
                            const id = e.target.value;
                            const name = optionElement.getAttribute("data-name");
                            dispatch(ServiceFilter({ id, name }));
                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, service_id: id, daterange: labeldaterange }));
                          }}
                        >
                          <option value="">{t("All Services")}</option>
                          {isServiceOptionDropdown &&
                            Object.keys(isServiceOptionDropdown).map((item, i) => {
                              let id = isServiceOptionDropdown[item].id;
                              let name = isServiceOptionDropdown[item].name;
                              name = ucfirst(name);
                              return (
                                <option key={i} data-id={id} value={id} data-name={name}>
                                  {name}
                                </option>
                              );
                            })}
                        </select> */}
                        <div className="dropdown staff-dropdown">
                          <div className="btn-group w-100">
                            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              {isServiceFilter ? isServiceFilter.name : t("All Services")}
                            </button>
                            <span
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(ResetServiceFilter());
                                dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange }));
                              }}
                            >
                              x
                            </span>
                            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                              <ul className="p-0 m-0 list-unstyled">
                                {isServiceOptionDropdown &&
                                  Object.keys(isServiceOptionDropdown).map((item, i) => {
                                    let id = isServiceOptionDropdown[item].id;
                                    let name = isServiceOptionDropdown[item].name;
                                    name = ucfirst(name);
                                    return (
                                      <li key={i} data-id={id}>
                                        <a
                                          className="d-flex align-items-center cursor-pointer"
                                          onClick={() => {
                                            dispatch(ServiceFilter({ id, name }));
                                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, service_id: id, daterange: labeldaterange }));
                                          }}
                                        >
                                          <div className="user-id">
                                            <span className="user-name">{name}</span>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {isScreenReport.uniquename === "clients_by_product" ? (
                      <div className="col-sm-3">
                        {/* <select
                          className="form-select"
                          onChange={(e) => {
                            var index = e.target.selectedIndex;
                            var optionElement = e.target.childNodes[index];
                            const id = e.target.value;
                            const name = optionElement.getAttribute("data-name");
                            dispatch(ServiceFilter({ id, name }));
                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, service_id: id, daterange: labeldaterange }));
                          }}
                        >
                          <option value="">{t("All Services")}</option>
                          {isServiceOptionDropdown &&
                            Object.keys(isServiceOptionDropdown).map((item, i) => {
                              let id = isServiceOptionDropdown[item].id;
                              let name = isServiceOptionDropdown[item].name;
                              name = ucfirst(name);
                              return (
                                <option key={i} data-id={id} value={id} data-name={name}>
                                  {name}
                                </option>
                              );
                            })}
                        </select> */}
                        <div className="dropdown staff-dropdown">
                          <div className="btn-group w-100">
                            <button className="dropdown-toggle color-wine w-100" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              {isProductFilter ? isProductFilter.name : t("All Products")}
                            </button>
                            <span
                              className="btn btn-primary"
                              onClick={() => {
                                dispatch(ResetProductFilter());
                                dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, daterange: labeldaterange }));
                              }}
                            >
                              x
                            </span>
                            <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                              <ul className="p-0 m-0 list-unstyled">
                                {isProductOptionDropdown &&
                                  Object.keys(isProductOptionDropdown).map((item, i) => {
                                    let id = isProductOptionDropdown[item].id;
                                    let name = isProductOptionDropdown[item].name;
                                    name = ucfirst(name);
                                    return (
                                      <li key={i} data-id={id}>
                                        <a
                                          className="d-flex align-items-center cursor-pointer"
                                          onClick={() => {
                                            dispatch(ProductFilter({ id, name }));
                                            dispatch(ReportListViewApi({ ScreenReport: isScreenReport.uniquename, product_id: id, daterange: labeldaterange }));
                                          }}
                                        >
                                          <div className="user-id">
                                            <span className="user-name">{name}</span>
                                          </div>
                                        </a>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="text-end">
                    <a href="#" className="me-1 print-img" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-original-title="Print Calendar">
                      <img src={config.imagepath + "print.png"} alt="" />
                    </a>
                    <div className="dropdown d-inline-block export-dropdown">
                      <button className="dropdown-toggle btn dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {t("Export")}
                      </button>
                      <div className="dropdown-menu dropdown-box" aria-labelledby="dropdownMenuButton1">
                        <ul className="p-0 m-0 list-unstyled">
                          <li>
                            <a id="addbusytime-drawer-link" className="d-flex align-items-center">
                              {t("Export to CSV")}
                            </a>
                          </li>
                          <li>
                            <a id="addappoinment-drawer-link" className="d-flex align-items-center">
                              {t("Export to Excel")}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="drawer-panel-body mt-4">
              <InfiniteScroll dataLength={ListView && ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />} style={{ overflow: ListView.next_page_url ? "auto" : "inherit" }}>
                {isLoaderList === true ? (
                  <SpinLoader />
                ) : (
                  <>
                    {isScreenReport.uniquename === "performance_summary" ? <PerformanceSummary view={ListView} /> : ""}
                    {isScreenReport.uniquename === "client_retention" ? <Clientretention view={ListView} /> : ""}
                    {isScreenReport.uniquename === "cancelled_appointments" ? <CancelledAppointments view={ListView} /> : ""}
                    {isScreenReport.uniquename === "appointment_schedule" ? <AppointmentSchedule view={ListView} /> : ""}
                    {isScreenReport.uniquename === "stock_levels" ? <ProductStockLevel view={ListView} /> : ""}
                    {isScreenReport.uniquename === "client_list" ? <ClientList view={ListView} /> : ""}
                    {isScreenReport.uniquename === "client_birthdays" ? <ClientBirthdays view={ListView} /> : ""}
                    {isScreenReport.uniquename === "gift_vouchers" ? <GiftVouchers view={ListView} /> : ""}
                    {isScreenReport.uniquename === "absent_clients" ? <AbsentClients view={ListView} /> : ""}
                    {isScreenReport.uniquename === "clients_by_service" ? <ClientsByService view={ListView} /> : ""}
                    {isScreenReport.uniquename === "clients_by_product" ? <ClientsByProduct view={ListView} /> : ""}
                    {isScreenReport.uniquename === "sales_by_type" ? <SalesByType view={ListView} /> : ""}
                    {isScreenReport.uniquename === "sales_by_service" ? <SalesByService view={ListView} /> : ""}
                    {isScreenReport.uniquename === "sales_by_product" ? <SalesByProduct view={ListView} /> : ""}
                    {isScreenReport.uniquename === "sales_by_staffmember" ? <SalesByStaff view={ListView} /> : ""}
                    {isScreenReport.uniquename === "sales_by_day" ? <SalesByDay view={ListView} /> : ""}
                    {isScreenReport.uniquename === "gift_voucher_activity" ? <GiftVouchersActivity view={ListView} /> : ""}
                  </>
                )}
                {!isFetching && ListView.next_page_url && (
                  <div className="col-2 m-auto p-3 text-center">
                    <button onClick={loadMoreItems} className="btn btn-primary">
                      {t("More")}
                    </button>
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportListView;

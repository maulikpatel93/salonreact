import React, { useState, useEffect } from "react";
import { SalonModule } from "pages";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InvoiceListView from "./Invoice/InvoiceListView";
import CreateInvoiceListView from "./Invoice/CreateInvoiceListView";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { CreateInvoiceListViewApi, InvoiceListViewApi, InvoiceTabView, ClientSuggetionListApi, ClientSearchName, OpenClientSearchList, CloseClientSearchList } from "store/slices/saleSlice";
import SaleClientSuggetionListView from "./List/SaleClientSuggetionListView";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import SaleCompleted from "./Drawer/SaleCompleted";
// import { checkaccess } from "helpers/functions";

const Sales = () => {
  SalonModule();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const [state, setState] = useState({
  //   start: moment().subtract(29, "days"),
  //   end: moment(),
  // });
  const [state, setState] = useState({ start: "", end: "" });
  const { start, end } = state;
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const tabview = useSelector((state) => state.sale.isTabView);
  const ViewInvoiceList = useSelector((state) => state.sale.isInvoiceListView);
  const CreateInvoiceList = useSelector((state) => state.sale.isCreateInvoiceListView);
  const isOpenedSaleCompleted = useSelector((state) => state.sale.isOpenedSaleCompleted);

  const isSearchList = useSelector((state) => state.sale.isSearchList);
  const isSearchName = useSelector((state) => state.sale.isSearchName);
  const isSearchObj = useSelector((state) => state.sale.isSearchObj);
  const SuggetionView = useSelector((state) => state.sale.isSuggetionListView);
  const labeldaterange = start && end ? start.format("YYYY-MM-DD") + " - " + end.format("YYYY-MM-DD") : "";
  useEffect(() => {
    if (tabview === "viewinvoice") {
      if (isSearchObj && isSearchObj.id) {
        dispatch(InvoiceListViewApi({ client_id: isSearchObj.id, result: "result_array", daterange: labeldaterange }));
      } else {
        dispatch(InvoiceListViewApi({ daterange: labeldaterange }));
      }
    }
    if (tabview === "createinvoice") {
      if (isSearchObj && isSearchObj.id) {
        dispatch(CreateInvoiceListViewApi({ client_id: isSearchObj.id, result: "result_array", daterange: labeldaterange }));
      } else {
        dispatch(CreateInvoiceListViewApi({ daterange: labeldaterange }));
      }
    }
  }, [tabview, labeldaterange]);

  const fetchDataGridView = () => {
    dispatch(InvoiceListViewApi({ next_page_url: ListView.next_page_url }));
  };
  const [isFetchingView, setIsFetchingView] = useState(false);
  const loadMoreItemView = () => {
    setIsFetchingView(true);
    dispatch(InvoiceListViewApi({ next_page_url: ViewInvoiceList.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingView(false);
    }, 1000);
  };

  const fetchDataGridCreate = () => {
    dispatch(InvoiceListViewApi({ next_page_url: ListView.next_page_url }));
  };
  const [isFetchingCreate, setIsFetchingCreate] = useState(false);
  const loadMoreItemCreate = () => {
    setIsFetchingCreate(true);
    dispatch(CreateInvoiceListViewApi({ next_page_url: CreateInvoiceList.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetchingCreate(false);
    }, 1000);
  };

  const fetchDataSuggetionList = () => {
    dispatch(ClientSuggetionListApi({ next_page_url: SuggetionView.next_page_url, q: isSearchName }));
  };

  const handleClickSearch = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(OpenClientSearchList());
      dispatch(ClientSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearch = (e) => {
    let q = e.currentTarget.value;
    dispatch(ClientSearchName(q));
    if (q && q.length > 0) {
      dispatch(OpenClientSearchList());
      dispatch(ClientSuggetionListApi({ q: q }));
    } else {
      if (tabview === "viewinvoice") {
        dispatch(InvoiceListViewApi());
      }
      if (tabview === "createinvoice") {
        dispatch(CreateInvoiceListViewApi());
      }
      dispatch(CloseClientSearchList());
    }
  };
  const handleCloseSearch = () => {
    dispatch(ClientSearchName(""));
    dispatch(CloseClientSearchList());
    if (tabview === "viewinvoice") {
      dispatch(InvoiceListViewApi());
    }
    if (tabview === "createinvoice") {
      dispatch(CreateInvoiceListViewApi());
    }
  };
  const handleOnBlur = () => {
    // setTimeout(() => {
    //   dispatch(CloseClientSearchList());
    // }, 200);
  };

  const handleCallback = (start, end) => {
    setState({ start, end });
  };

  const handleCancel = () => {
    //picker.element.val("");
    setState({ start: "", end: "" });
  };
  return (
    <>
      <div className="page-content">
        <section className="sales-list">
          <div className="container">
            <div className="row justify-content-between py-3 sales-list-header sticky-top">
              <div className="col-xl-8 col-lg-7 d-md-flex align-items-center">
                <div className="list-group custom-tab me-sm-2 mb-sm-0 mb-2" id="myList" role="tablist">
                  <a className={"list-group-item list-group-item-action " + (tabview && tabview === "viewinvoice" ? " active" : "")} data-bs-toggle="list" href="#viewinvoices" role="tab" onClick={() => dispatch(InvoiceTabView("viewinvoice"))}>
                    {t("View Invoices")}
                  </a>
                  <a className={"list-group-item list-group-item-action " + (tabview && tabview === "createinvoice" ? " active" : "")} data-bs-toggle="list" href="#createinvoice" role="tab" onClick={() => dispatch(InvoiceTabView("createinvoice"))}>
                    {t("Create Invoice")}
                  </a>
                </div>
                <form action="#" className="d-inline-block">
                  <DateRangePicker
                    initialSettings={{
                      startDate: start ? start.toDate() : moment().subtract(29, "days"),
                      endDate: end ? end.toDate() : moment(),
                      locale: {
                        format: "Do MMMM YYYY",
                      },
                      ranges: {
                        Today: [moment().toDate(), moment().toDate()],
                        Yesterday: [moment().subtract(1, "days").toDate(), moment().subtract(1, "days").toDate()],
                        "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
                        "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
                        "This Month": [moment().startOf("month").toDate(), moment().endOf("month").toDate()],
                        "Last Month": [moment().subtract(1, "month").startOf("month").toDate(), moment().subtract(1, "month").endOf("month").toDate()],
                      },
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
                </form>
              </div>
              <div className="col-xl-4 col-lg-5 mt-lg-0 mt-2">
                <div className="search ms-auto">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="far fa-search"></i>
                    </span>
                    <input type="text" className="form-control search-input" placeholder={t("Search by invoice # or customer name")} value={isSearchName} onInput={(e) => dispatch(ClientSearchName(e.target.value))} onClick={handleClickSearch} onKeyUp={handleKeyUpSearch} onBlur={handleOnBlur} />
                    <a className="close cursor-pointer" style={{ display: isSearchName ? "block" : "none" }} onClick={handleCloseSearch}>
                      <i className="fal fa-times"></i>
                    </a>
                  </div>
                  <div className={"search-result dropdown-box " + isSearchList} id="search-content">
                    <InfiniteScroll className="" dataLength={SuggetionView && SuggetionView.data && SuggetionView.data.length ? SuggetionView.data.length : "0"} next={fetchDataSuggetionList} scrollableTarget="search-content" hasMore={SuggetionView.next_page_url ? true : false} loader={<PaginationLoader />}>
                      <ul className="p-0 m-0 list-unstyled">
                        <SaleClientSuggetionListView view={SuggetionView} page={tabview} />
                      </ul>
                    </InfiniteScroll>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-content">
            <div className={"tab-pane" + (tabview && tabview === "viewinvoice" ? " show active" : "")} id="viewinvoices" role="tabpanel">
              {tabview && tabview == "viewinvoice" && (
                <div className="row">
                  <div className="col-12">
                    <InfiniteScroll className="" dataLength={ViewInvoiceList && ViewInvoiceList.data && ViewInvoiceList.data.length ? ViewInvoiceList.data.length : "0"} next={fetchDataGridView} scrollableTarget="page-content-category" hasMore={ViewInvoiceList.next_page_url ? true : false} loader={<PaginationLoader />}>
                      <div className="table-responsive">
                        <table className="table mb-0 table-hover">
                          <thead>
                            <tr>
                              <th>{t("Invoice")}</th>
                              <th>{t("Client")}</th>
                              <th>{t("Status")}</th>
                              {/* <th>{t("Service")}</th>
                              <th>{t("Staff Member")}</th> */}
                              <th>{t("Date")}</th>
                              <th>{t("Amount")}</th>
                            </tr>
                          </thead>
                          <tbody className="services-table-data">
                            <InvoiceListView currentUser={currentUser} view={ViewInvoiceList} role_id={role_id} access={access} />
                          </tbody>
                        </table>
                      </div>
                      {!isFetchingView && ViewInvoiceList.next_page_url && (
                        <div className="col-2 m-auto text-center">
                          <button onClick={loadMoreItemView} className="btn btn-primary m-4">
                            {t("More")}
                          </button>
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                </div>
              )}
            </div>
            <div className={"tab-pane" + (tabview && tabview === "createinvoice" ? " show active" : "")} id="createinvoice" role="tabpanel">
              {tabview && tabview == "createinvoice" && (
                <div className="row">
                  <div className="col-12">
                    <InfiniteScroll className="" dataLength={CreateInvoiceList && CreateInvoiceList.data && CreateInvoiceList.data.length ? CreateInvoiceList.data.length : "0"} next={fetchDataGridCreate} scrollableTarget="page-content-category" hasMore={CreateInvoiceList.next_page_url ? true : false} loader={<PaginationLoader />}>
                      <div className="table-responsive">
                        <table className="table mb-0 table-hover">
                          <thead>
                            <tr>
                              <th>{t("Date")}</th>
                              <th>{t("Client")}</th>
                              <th>{t("Service")}</th>
                              <th>{t("Staff Member")}</th>
                              <th>{t("Amount")}</th>
                            </tr>
                          </thead>
                          <tbody className="services-table-data">
                            <CreateInvoiceListView currentUser={currentUser} view={CreateInvoiceList} role_id={role_id} access={access} />
                          </tbody>
                        </table>
                      </div>
                      {!isFetchingCreate && ViewInvoiceList.next_page_url && (
                        <div className="col-2 m-auto text-center">
                          <button onClick={loadMoreItemCreate} className="btn btn-primary m-4">
                            {t("More")}
                          </button>
                        </div>
                      )}
                    </InfiniteScroll>
                  </div>
                </div>
              )}
            </div>
          </div>
          {isOpenedSaleCompleted && <SaleCompleted />}
        </section>
      </div>
    </>
  );
};

export default Sales;

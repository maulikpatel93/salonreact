import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { ClientInvoiceListViewApi } from "store/slices/clientinvoiceSlice";
import config from "../../../../config";
import Moment from "react-moment";

const Invoices = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);

  const invoiceViews = useSelector((state) => state.clientinvoice.isListView);
  const invoiceObjectData = invoiceViews && invoiceViews.data ? invoiceViews.data : invoiceViews;
  const detail = useSelector((state) => state.client.isDetailData);

  const fetchDataInvoiceList = () => {
    dispatch(ClientInvoiceListViewApi({ client_id: detail.id, next_page_url: invoiceViews.next_page_url }));
  };
  return (
    <>
      <div className="drawer-header">
        <h2 className="mb-4 pe-md-5 mb-lg-5">
          {t("Invoices")}
          <a href="#" className="btn btn-outline btn-sm ms-2">
            {t("Print Statement")}
          </a>
        </h2>
      </div>

      <div className="content-wrp" id="invoicelist">
        <InfiniteScroll className="row gx-0" dataLength={invoiceObjectData && invoiceObjectData.length ? invoiceObjectData.length : "0"} next={fetchDataInvoiceList} scrollableTarget="invoicelist" hasMore={invoiceViews.next_page_url ? true : false} loader={<PaginationLoader />}>
          {invoiceObjectData.length > 0 ? (
            <>
              {Object.keys(invoiceObjectData).map((item, i) => {
                let id = invoiceObjectData[item].id;
                // let invoice = invoiceObjectData[item].invoice;
                console.log(invoiceObjectData[item]);
                // let invoice_name = invoice && invoice.name;
                // let invoice_credit = invoice && invoice.credit;
                // let cost = invoiceObjectData[item].cost;
                //let client_id = invoiceObjectData[item].client_id;
                //let note = invoiceObjectData[item].note;
                let invoicedate = invoiceObjectData[item].invoicedate;
                let totalprice = invoiceObjectData[item].totalprice;
                let status = invoiceObjectData[item].status;
                return (
                  <div className="event-box" key={i} data-id={id}>
                    <div className="d-flex align-items-start">
                      <a className="ms-auto invoice-link">
                        <img src="assets/images/past.png" alt="" />
                      </a>
                      <div className="w-100 px-md-3 px-2">
                        <h6 className="mb-1 color-wine fw-semibold">{"00" + id}</h6>
                        <h6 className="mb-1">
                          {t("Invoice date:")} <Moment format="do MMMM YYYY">{invoicedate}</Moment>
                        </h6>
                        <h6 className="mb-0 fw-semibold">${totalprice}</h6>
                      </div>
                      <span className="active">{status}</span>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
              <div className="complete-box-wrp text-center">
                <img src={config.imagepath + "nots.png"} alt="" className="mb-md-4 mb-3" />
                <h5 className="mb-2 fw-semibold">{t("There are no invoices available.")}</h5>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Invoices;

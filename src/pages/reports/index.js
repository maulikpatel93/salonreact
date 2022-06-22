import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { SalonModule } from "pages";
import { OpenListModal, ScreenReport } from "store/slices/reportSlice";
import ReportListView from "./List/ReportListView";

const Reports = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const isOpenListModal = useSelector((state) => state.report.isOpenListModal);

  const BusinessPerfomance = [
    {
      uniquename: "performance_summary",
      title: t("Performance summary"),
      shortdescription: t("View a summary of sales, customers and appointments."),
    },
    {
      uniquename: "client_retention",
      title: t("Client retention"),
      shortdescription: t("View your overall client retention rates, as well as retention rates by each staff member."),
    },
  ];

  const Appointments = [
    {
      uniquename: "cancelled_appointments",
      title: t("Cancelled appointments"),
      shortdescription: t("View a list of all of the cancelled appointments. Includes date cancelled and cancellation reason."),
    },
    {
      uniquename: "appointment_schedule",
      title: t("Appointment schedule"),
      shortdescription: t("View a full list of appointments between two selected dates."),
    },
  ];

  const Products = [
    {
      uniquename: "stock_levels",
      title: t("Stock levels"),
      shortdescription: t("View a list of all your products including current stock levels."),
    },
  ];

  const Sales = [
    {
      uniquename: "sales_by_type",
      title: t("Sales by type"),
      shortdescription: t("View a summary of sales by type"),
    },
    {
      uniquename: "sales_by_service",
      title: t("Sales by service"),
      shortdescription: t("View a summary of sales by service"),
    },
    {
      uniquename: "sales_by_product",
      title: t("Sales by product"),
      shortdescription: t("View a summary of product sales"),
    },
    {
      uniquename: "sales_by_staffmember",
      title: t("Sales by staff member"),
      shortdescription: t("View a summary of sales by each team member"),
    },
    {
      uniquename: "sales_by_day",
      title: t("Sales by day"),
      shortdescription: t("View a summary of sales by day"),
    },
    {
      uniquename: "gift_voucher_activity",
      title: t("Gift voucher activity"),
      shortdescription: t("View which gift vouchers your clients have been buying and redeeming."),
    },
  ];

  const Clients = [
    {
      uniquename: "client_list",
      title: t("Client list"),
      shortdescription: t("Client birthdays"),
    },
    {
      uniquename: "client_birthdays",
      title: t("Client birthdays"),
      shortdescription: t("View a list of all your clients with upcoming birthdays."),
    },
    {
      uniquename: "gift_vouchers",
      title: t("Gift vouchers"),
      shortdescription: t("A list of clients with gift vouchers and details of use."),
    },
    {
      // uniquename: "absent_clients", same ass client_retention data
      uniquename: "client_retention",
      title: t("Absent clients"),
      shortdescription: t("View clients who haven't had a booking between two selected dates."),
    },
    {
      uniquename: "clients_by_service",
      title: t("Clients by service"),
      shortdescription: t("View clients who booked a specific service between two selected dates."),
    },
    {
      uniquename: "clients_by_product",
      title: t("Clients by product"),
      shortdescription: t("View clients who have purchased a specific product between two selected dates."),
    },
  ];

  return (
    <>
      <div className="page-content reports-page">
        <div className="w-100 reports-content">
          <div className="row g-0">
            <div className="col-lg-4">
              <div className="report-box border-bottom">
                <h3 className="sec-heading">{t("Business Performance")}</h3>
                <div>
                  {Object.keys(BusinessPerfomance).map((item, i) => {
                    let title = BusinessPerfomance[item].title;
                    let shortdescription = BusinessPerfomance[item].shortdescription;
                    let uniquename = BusinessPerfomance[item].uniquename;
                    let lastindex = BusinessPerfomance.length - 1 == i ? "" : "mb-4 ";
                    return (
                      <a className={lastindex + "cursor-pointer"} key={i}>
                        <h4
                          onClick={() => {
                            dispatch(OpenListModal("open"));
                            dispatch(ScreenReport(BusinessPerfomance[item]));
                          }}
                        >
                          {title}
                        </h4>
                        <p>{shortdescription}</p>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="report-box border-bottom">
                <h3 className="sec-heading">{t("Appointments")}</h3>
                <div className="cursor-pointer">
                  {Object.keys(Appointments).map((item, i) => {
                    let title = Appointments[item].title;
                    let shortdescription = Appointments[item].shortdescription;
                    let uniquename = Appointments[item].uniquename;
                    let lastindex = Appointments.length - 1 == i ? "" : "mb-4 ";
                    return (
                      <a className={lastindex + "cursor-pointer"} key={i}>
                        <h4
                          onClick={() => {
                            dispatch(OpenListModal("open"));
                            dispatch(ScreenReport(Appointments[item]));
                          }}
                        >
                          {title}
                        </h4>
                        <p>{shortdescription}</p>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="report-box border-lg-0 border-bottom">
                <h3 className="sec-heading">{t("Products")}</h3>
                {Object.keys(Products).map((item, i) => {
                  let title = Products[item].title;
                  let shortdescription = Products[item].shortdescription;
                  let uniquename = Products[item].uniquename;
                  let lastindex = Products.length - 1 == i ? "" : "mb-4 ";
                  return (
                    <a className={lastindex + "cursor-pointer"} key={i}>
                      <h4
                        onClick={() => {
                          dispatch(OpenListModal("open"));
                          dispatch(ScreenReport(Products[item]));
                        }}
                      >
                        {title}
                      </h4>
                      <p>{shortdescription}</p>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-4 border-left-right">
              <div className="report-box border-lg-0 border-bottom">
                <h3 className="sec-heading">{t("Sales")}</h3>
                {Object.keys(Sales).map((item, i) => {
                  let title = Sales[item].title;
                  let shortdescription = Sales[item].shortdescription;
                  let uniquename = Sales[item].uniquename;
                  let lastindex = Sales.length - 1 == i ? "" : "mb-4 ";
                  return (
                    <a className={lastindex + "cursor-pointer"} key={i}>
                      <h4
                        onClick={() => {
                          dispatch(OpenListModal("open"));
                          dispatch(ScreenReport(Sales[item]));
                        }}
                      >
                        {title}
                      </h4>
                      <p>{shortdescription}</p>
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="report-box">
                <h3 className="sec-heading">{t("Clients")}</h3>
                {Object.keys(Clients).map((item, i) => {
                  let title = Clients[item].title;
                  let shortdescription = Clients[item].shortdescription;
                  let uniquename = Clients[item].uniquename;
                  let lastindex = Clients.length - 1 == i ? "" : "mb-4 ";
                  return (
                    <a className={lastindex + "cursor-pointer"} key={i}>
                      <h4
                        onClick={() => {
                          dispatch(OpenListModal("open"));
                          dispatch(ScreenReport(Clients[item]));
                        }}
                      >
                        {title}
                      </h4>
                      <p>{shortdescription}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenListModal && <ReportListView />}
    </>
  );
};

export default Reports;

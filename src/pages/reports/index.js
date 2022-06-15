import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../config";
import { SalonModule } from "pages";

const Reports = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  return (
    <>
      <div className="page-content reports-page">
        <div className="w-100 reports-content">
          <div className="row g-0">
            <div className="col-lg-4">
              <div className="report-box border-bottom">
                <h3 className="sec-heading">{t("Business Performance")}</h3>
                <div>
                  <a className="mb-4 cursor-pointer" id="editPerformanceSummary">
                    <h4>{t("Performance summary")}</h4>
                    <p>{t("View a summary of sales, customers and appointments.")}</p>
                  </a>
                  <a className="cursor-pointer" id="editClientRetention">
                    <h4>{t("Client retention")}</h4>
                    <p className="mb-0">{t("View your overall client retention rates, as well as retention rates by each staff member.")}</p>
                  </a>
                </div>
              </div>
              <div className="report-box border-bottom">
                <h3 className="sec-heading">{t("Appointments")}</h3>
                <div className="cursor-pointer">
                  <a className="mb-4 cursor-pointer" id="CancelledAppointments">
                    <h4>{t("Cancelled appointments")}</h4>
                    <p>{t("View a list of all of the cancelled appointments. Includes date cancelled and cancellation reason.")}</p>
                  </a>
                  <a className="cursor-pointer" id="AppointmentSchedule">
                    <h4>{t("Appointment schedule")}</h4>
                    <p className="mb-0">{t("View a full list of appointments between two selected dates.")}</p>
                  </a>
                </div>
              </div>

              <div className="report-box border-lg-0 border-bottom">
                <h3 className="sec-heading">{t("Products")}</h3>
                <a className="cursor-pointer" id="#StockLevels">
                  <h4>{t("Stock levels")}</h4>
                  <p>{t("View a list of all your products including current stock levels.")}</p>
                </a>
              </div>
            </div>

            <div className="col-lg-4 border-left-right">
              <div className="report-box border-lg-0 border-bottom">
                <h3 className="sec-heading">{t("Sales")}</h3>
                <a className="cursor-pointer mb-4" id="SalesbyType">
                  <h4>{t("Sales by type")}</h4>
                  <p>{t("View a summary of sales by type")}</p>
                </a>
                <a className="cursor-pointer mb-4" id="SalesbyService">
                  <h4>{t("Sales by service")}</h4>
                  <p>{t("View a summary of sales by service")}</p>
                </a>
                <a className="cursor-pointer mb-4" id="SalesbyProduct">
                  <h4>{t("Sales by product")}</h4>
                  <p>{t("View a summary of product sales")}</p>
                </a>
                <a className="cursor-pointer mb-4" id="SalesbyMStaffMember">
                  <h4>{t("Sales by staff member")}</h4>
                  <p>{t("View a summary of sales by each team member")}</p>
                </a>
                <a className="cursor-pointer mb-4" id="SalesbyDay">
                  <h4>{t("Sales by day")}</h4>
                  <p>{t("View a summary of sales by day")}</p>
                </a>
                <a className="cursor-pointer mb-4" id="GiftVoucherActivity">
                  <h4>{t("Gift voucher activity")}</h4>
                  <p>{t("View which gift vouchers your clients have been buying and redeeming.")}</p>
                </a>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="report-box">
                <h3 className="sec-heading">{t("Clients")}</h3>
                <a className="cursor-pointer mb-4" href="#ClientList-drawer">
                  <h4>{t("Client list")}</h4>
                  <p>{t("View a list of all your clients and their details, including if they have opted in for marketing.")}</p>
                </a>
                <a className="cursor-pointer mb-4" href="#ClientBirthdays-drawer">
                  <h4>{t("Client birthdays")}</h4>
                  <p>{t("View a list of all your clients with upcoming birthdays.")}</p>
                </a>
                <a className="cursor-pointer mb-4" href="#GiftVouchers-drawer">
                  <h4>{t("Gift vouchers")}</h4>
                  <p>{t("A list of clients with gift vouchers and details of use.")}</p>
                </a>
                <a className="cursor-pointer mb-4" href="#AbsentClients-drawer">
                  <h4>{t("Absent clients")}</h4>
                  <p>{t("View clients who haven't had a booking between two selected dates.")}</p>
                </a>
                <a className="cursor-pointer mb-4" href="#ClientsbyService-drawer">
                  <h4>{t("Clients by service")}</h4>
                  <p>{t("View clients who booked a specific service between two selected dates.")}</p>
                </a>
                <a className="cursor-pointer mb-4" href="#ClientsbyProduct-drawer">
                  <h4>{t("Clients by product")}</h4>
                  <p>{t("View clients who have purchased a specific product between two selected dates.")}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";

const PerformanceSummary = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reportlist = useSelector((state) => state.report.isListView);
  const objectData = reportlist && reportlist.data ? reportlist.data : reportlist;

  let sumTotalCustomer = 0;
  let sumNewCustomer = 0;
  let sumTotalAppointment = 0;
  let sumTotalServicesBooked = 0;
  let sumTotalValue = 0;
  let sumServicesInvoiced = 0;
  let sumSalesTotal = 0;
  return (
    <>
      <div className="table-responsive">
        <table className="table bg-white">
          <thead className="">
            <tr>
              <th>{t("Staff")}</th>
              <th colSpan="2">{t("Customers")}</th>
              <th colSpan="5">{t("Appointments")}</th>
              <th colSpan="3">{t("Sales")}</th>
            </tr>
            <tr>
              <th className="fw-500">{t("Staff Name")}</th>
              <th className="fw-600">{t("Total")}</th>
              <th className="fw-600">{t("New")}</th>
              <th className="fw-600">{t("Total")}</th>
              <th className="fw-600">{t("Services Booked")}</th>
              <th className="fw-600">{t("Retained")}</th>
              <th className="fw-600">{t("Online Bookings")}</th>
              <th className="fw-600">{t("Total Value")}</th>
              <th className="fw-600">{t("Services Invoiced")}</th>
              <th className="fw-600">{t("Products Invoiced")}</th>
              <th className="fw-600">{t("Sales Total")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let first_name = objectData[item].first_name;
                let last_name = objectData[item].last_name;
                let name = ucfirst(first_name) + " " + ucfirst(last_name);

                let TotalCustomer = objectData[item].TotalCustomer;
                let NewCustomer = objectData[item].NewCustomer;
                let TotalAppointment = objectData[item].TotalAppointment;
                let TotalServicesBooked = objectData[item].TotalServicesBooked;
                let TotalValue = objectData[item].TotalValue;
                let ServicesInvoiced = objectData[item].ServicesInvoiced;
                let SalesTotal = objectData[item].SalesTotal;

                sumTotalCustomer += TotalCustomer;
                sumNewCustomer += NewCustomer;
                sumTotalAppointment += TotalAppointment;
                sumTotalServicesBooked += TotalServicesBooked;
                sumTotalValue += parseFloat(TotalValue);
                sumServicesInvoiced += parseFloat(ServicesInvoiced);
                sumSalesTotal += parseFloat(SalesTotal);

                return (
                  <tr key={i} data-id={id}>
                    <td className="">{name}</td>
                    <td className="">{TotalCustomer}</td>
                    <td className="">{NewCustomer}</td>
                    <td className="">{TotalAppointment}</td>
                    <td className="">{TotalServicesBooked}</td>
                    <td className="">80%</td>
                    <td className="">3</td>
                    <td className="">${TotalValue}</td>
                    <td className="">${ServicesInvoiced}</td>
                    <td className="">$0</td>
                    <td className="">${SalesTotal}</td>
                  </tr>
                );
              })}
            {objectData.length === 0 && (
              <tr>
                <td className="text-center" colSpan="10">
                  {t("No data found")}
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="fw-bold">
              <td className="">{t("Total")}</td>
              <td className="">{sumTotalCustomer}</td>
              <td className="">{sumNewCustomer}</td>
              <td className="">{sumTotalAppointment}</td>
              <td className="">{sumTotalServicesBooked}</td>
              <td className="">80%</td>
              <td className="">3</td>
              <td className="">${sumTotalValue}</td>
              <td className="">${sumServicesInvoiced}</td>
              <td className="">$0</td>
              <td className="">${sumSalesTotal}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default PerformanceSummary;

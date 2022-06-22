import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";

const SalesByDay = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reportlist = useSelector((state) => state.report.isListView);
  const objectData = reportlist && reportlist.data ? reportlist.data : reportlist;

  return (
    <>
      <div className="table-responsive">
        <table className="table bg-white">
          <thead className="">
            <tr>
              <th className="fw-500">{t("Client Name")}</th>
              <th className="fw-600">{t("Email")}</th>
              <th className="fw-600">{t("Mobile")}</th>
              <th className="fw-600">{t("Last Appointment")}</th>
              <th className="fw-600">{t("Days Absent")}</th>
              <th className="fw-600">{t("Staff")}</th>
              <th className="fw-600">{t("Total Sales")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let first_name = objectData[item].first_name;
                let last_name = objectData[item].last_name;
                let email = objectData[item].email;
                let phone_number = objectData[item].phone_number;
                let lastappointment = objectData[item].lastappointment;
                let TotalSales = objectData[item].TotalSales;
                let TotalStaff = objectData[item].TotalStaff;

                let name = ucfirst(first_name) + " " + ucfirst(last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{name}</td>
                    <td className="">{email}</td>
                    <td className="">{phone_number}</td>
                    <td className="">{lastappointment ? <Moment format="DD MMMM YYYY">{lastappointment.dateof}</Moment> : ""}</td>
                    <td className="">80%</td>
                    <td className="">{TotalStaff}</td>
                    <td className="">${TotalSales}</td>
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
        </table>
      </div>
    </>
  );
};

export default SalesByDay;

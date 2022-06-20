import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";

const CancelledAppointments = () => {
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
              <th className="fw-600">{t("Service")}</th>
              <th className="fw-600">{t("Cancelled Date")}</th>
              <th className="fw-600">{t("Reason")}</th>
              <th className="fw-600">{t("Staff")}</th>
              <th className="fw-600">{t("Price")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let updated_at = objectData[item].updated_at;
                let cancellation_reason = objectData[item].cancellation_reason;
                let price = objectData[item].cost;
                let client = objectData[item].client;
                let staff = objectData[item].staff;
                let service = objectData[item].service;

                let client_name = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
                let staff_name = ucfirst(staff.first_name) + " " + ucfirst(staff.last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{client_name}</td>
                    <td className="">{client.email}</td>
                    <td className="">{client.phone_number}</td>
                    <td className="">{service.name}</td>
                    <td className="">{<Moment format="DD MMMM YYYY">{updated_at}</Moment>}</td>
                    <td className="">{cancellation_reason}</td>
                    <td className="">{staff_name}</td>
                    <td className="">{price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CancelledAppointments;

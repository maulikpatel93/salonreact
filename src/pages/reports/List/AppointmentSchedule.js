import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";
import { PrintContent } from "store/slices/reportSlice";

const AppointmentSchedule = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reportlist = useSelector((state) => state.report.isListView);
  const objectData = reportlist && reportlist.data ? reportlist.data : reportlist;
  return (
    <>
      <div className="table-responsive" id="printtable">
        <table className="table bg-white" id="table-to-xls">
          <thead className="">
            <tr>
              <th className="fw-600">{t("Date")}</th>
              <th className="fw-500">{t("Client Name")}</th>
              <th className="fw-600">{t("Email")}</th>
              <th className="fw-600">{t("Mobile")}</th>
              <th className="fw-600">{t("Service")}</th>
              <th className="fw-600">{t("Status")}</th>
              <th className="fw-600">{t("Start")}</th>
              <th className="fw-600">{t("End")}</th>
              <th className="fw-600">{t("Staff")}</th>
              <th className="fw-600">{t("Price")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let dateof = objectData[item].dateof;
                let start_time = objectData[item].start_time;
                let end_time = objectData[item].end_time;
                let price = objectData[item].cost;
                let status = objectData[item].status;
                let client = objectData[item].client;
                let staff = objectData[item].staff;
                let service = objectData[item].service;

                let client_name = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
                let staff_name = ucfirst(staff.first_name) + " " + ucfirst(staff.last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{<Moment format="DD MMMM YYYY">{dateof}</Moment>}</td>
                    <td className="">{client_name}</td>
                    <td className="">{client.email}</td>
                    <td className="">{client.phone_number}</td>
                    <td className="">{service.name}</td>
                    <td className="">{status}</td>
                    <td className="">{<Moment format="hh:mm a">{dateof + " " + start_time}</Moment>}</td>
                    <td className="">{<Moment format="hh:mm a">{dateof + " " + end_time}</Moment>}</td>
                    <td className="">{staff_name}</td>
                    <td className="">${price}</td>
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

export default AppointmentSchedule;

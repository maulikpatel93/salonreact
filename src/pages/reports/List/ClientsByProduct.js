import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/Functions";
import Moment from "react-moment";

const ClientsByProduct = () => {
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
              <th className="fw-500">{t("Client Name")}</th>
              <th className="fw-600">{t("Email")}</th>
              <th className="fw-600">{t("Mobile")}</th>
              <th className="fw-600">{t("Gender")}</th>
              <th className="fw-600">{t("Added")}</th>
              <th className="fw-600">{t("Purchased")}</th>
              <th className="fw-600">{t("Last Product Purchased")}</th>
              <th className="fw-600">{t("Opt-in Marketing")}</th>
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
                let gender = objectData[item].gender;
                let created_at = objectData[item].created_at;
                let recieve_marketing_email = objectData[item].recieve_marketing_email;
                let lastproduct = objectData[item].lastproduct;
                let TotalSales = objectData[item].TotalSales;
                let TotalProducts = objectData[item].TotalProducts;

                let name = ucfirst(first_name) + " " + ucfirst(last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{name}</td>
                    <td className="">{email}</td>
                    <td className="">{phone_number}</td>
                    <td className="">{gender}</td>
                    <td className="">{created_at ? <Moment format="DD MMMM YYYY">{created_at}</Moment> : ""}</td>
                    <td className="">{TotalProducts}</td>
                    <td className="">{lastproduct ? <Moment format="DD MMMM YYYY">{lastproduct.created_at}</Moment> : "-"}</td>
                    <td className="">{recieve_marketing_email === 1 ? t("Yes") : t("No")}</td>
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

export default ClientsByProduct;

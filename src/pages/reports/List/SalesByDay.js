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

  let total_item_sold = 0;
  let total_service_sold = 0;
  let total_product_sold = 0;
  let total_net_sales = 0;
  let total_tax = 0;
  let total_gross_sale = 0;
  return (
    <>
      <div className="table-responsive" id="printtable">
        <table className="table bg-white" id="table-to-xls">
          <thead className="">
            <tr>
              <th className="fw-500">{t("Day")}</th>
              <th className="fw-600">{t("Item Sold")}</th>
              <th className="fw-600">{t("Services Sold")}</th>
              <th className="fw-600">{t("Products Sold")}</th>
              <th className="fw-600">{t("Net Sale")}</th>
              <th className="fw-600">{t("Tax")}</th>
              <th className="fw-600">{t("Gross Sales")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let day = objectData[item].day;
                let item_sold = objectData[item].item_sold;
                let TotalServiceSold = objectData[item].service_item_sold;
                let TotalProductSold = objectData[item].product_item_sold;
                let net_sales = objectData[item].net_sales;
                let tax = objectData[item].tax;
                let gross_sale = objectData[item].gross_sale;

                total_item_sold += parseInt(item_sold);
                total_service_sold += parseInt(TotalServiceSold);
                total_product_sold += parseInt(TotalProductSold);
                total_net_sales += parseFloat(net_sales);
                total_tax += parseFloat(tax);
                total_gross_sale += parseFloat(gross_sale);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{day}</td>
                    <td className="">{item_sold}</td>
                    <td className="">{TotalServiceSold}</td>
                    <td className="">{TotalProductSold}</td>
                    <td className="">${net_sales}</td>
                    <td className="">${tax}</td>
                    <td className="">${gross_sale}</td>
                  </tr>
                );
              })}
            {objectData.length > 0 && (
              <tr className="fw-bold">
                <td className="">{t("Total")}</td>
                <td className="">{total_item_sold}</td>
                <td className="">{total_service_sold}</td>
                <td className="">{total_product_sold}</td>
                <td className="">${parseFloat(total_net_sales).toFixed(2)}</td>
                <td className="">${parseFloat(total_tax).toFixed(2)}</td>
                <td className="">${parseFloat(total_gross_sale).toFixed(2)}</td>
              </tr>
            )}
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

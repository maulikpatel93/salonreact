import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";

const ProductStockLevel = () => {
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
              <th className="fw-600">{t("Product Name")}</th>
              <th className="fw-500">{t("SKU")}</th>
              <th className="fw-600">{t("Supplier")}</th>
              <th className="fw-600">{t("Available Stock")}</th>
              <th className="fw-600">{t("Stock Sold")}</th>
              <th className="fw-600">{t("Cost Price")}</th>
              <th className="fw-600">{t("Retail Price")}</th>
              <th className="fw-600">{t("Total Cost Value")}</th>
              <th className="fw-600">{t("Total Retail Value")}</th>
              <th className="fw-600">{t("Total Sold Value")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let name = objectData[item].name;
                let sku = objectData[item].sku;
                let supplier = objectData[item].supplier;
                let cost_price = objectData[item].cost_price;
                let retail_price = objectData[item].retail_price;
                let stock_quantity = objectData[item].stock_quantity;
                let stocksold_count = objectData[item].stocksold_count;
                // let client_name = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
                // let staff_name = ucfirst(staff.first_name) + " " + ucfirst(staff.last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{name}</td>
                    <td className="">{sku}</td>
                    <td className="">{supplier.name}</td>
                    <td className="">{stock_quantity}</td>
                    <td className="">{stocksold_count}</td>
                    <td className="">${cost_price}</td>
                    <td className="">${retail_price}</td>
                    <td className="">${stock_quantity * cost_price}</td>
                    <td className="">${stock_quantity * retail_price}</td>
                    <td className="">${stocksold_count * cost_price}</td>
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

export default ProductStockLevel;

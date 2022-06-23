import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SalonModule } from "pages";

const SalesByType = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reportlist = useSelector((state) => state.report.isListView);
  const objectData = reportlist && reportlist.data ? reportlist.data : reportlist;

  let total_item_sold = 0;
  let total_net_sales = 0;
  let total_tax = 0;
  let total_gross_sale = 0;
  return (
    <>
      <div className="table-responsive">
        <table className="table bg-white">
          <thead className="">
            <tr>
              <th className="fw-500">{t("Type")}</th>
              <th className="fw-600">{t("Item Sold")}</th>
              <th className="fw-600">{t("Net Sale")}</th>
              <th className="fw-600">{t("Tax")}</th>
              <th className="fw-600">{t("Gross Sales")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let type = objectData[item].type;
                let item_sold = objectData[item].item_sold;
                let net_sales = objectData[item].net_sales;
                let tax = objectData[item].tax;
                let gross_sale = objectData[item].gross_sale;

                total_item_sold += parseInt(item_sold);
                total_net_sales += parseFloat(net_sales);
                total_tax += parseFloat(tax);
                total_gross_sale += parseFloat(gross_sale);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{type}</td>
                    <td className="">{item_sold}</td>
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
                <td className="">${total_net_sales}</td>
                <td className="">${total_tax}</td>
                <td className="">${total_gross_sale}</td>
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

export default SalesByType;

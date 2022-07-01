import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/Functions";
import Moment from "react-moment";

const GiftVouchersActivity = () => {
  SalonModule();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const reportlist = useSelector((state) => state.report.isListView);
  const objectData = reportlist && reportlist.data ? reportlist.data : reportlist;

  let total_TotalQuantity = 0;
  let total_TotalValue = 0;
  let total_TotalValueRedeemed = 0;
  let total_NetAmount = 0;
  return (
    <>
      <div className="table-responsive" id="printtable">
        <table className="table bg-white" id="table-to-xls">
          <thead className="">
            <tr>
              <th className="fw-500">{t("Gift Voucher")}</th>
              <th className="fw-600">{t("Quantity Purchased")}</th>
              <th className="fw-600">{t("Total Value Purchased")}</th>
              <th className="fw-600">{t("Total Value Redeemed")}</th>
              <th className="fw-600">{t("Net Amount")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let name = objectData[item].name;
                let TotalQuantity = objectData[item].TotalQuantity;
                let TotalValue = objectData[item].TotalValue;
                let TotalValueRedeemed = objectData[item].TotalValueRedeemed;
                let NetAmount = parseFloat(TotalValue) - parseFloat(TotalValueRedeemed);
                name = ucfirst(name);

                total_TotalQuantity += parseInt(TotalQuantity);
                total_TotalValue += parseFloat(TotalValue);
                total_TotalValueRedeemed += parseFloat(TotalValue);
                total_NetAmount += parseFloat(TotalValue);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{name}</td>
                    <td className="">{TotalQuantity}</td>
                    <td className="">{TotalValue}</td>
                    <td className="">{TotalValueRedeemed}</td>
                    <td className="">{NetAmount}</td>
                  </tr>
                );
              })}
            {objectData.length > 0 && (
              <tr className="fw-bold">
                <td className="">{t("Total")}</td>
                <td className="">{total_TotalQuantity}</td>
                <td className="">${parseFloat(total_TotalValue).toFixed(2)}</td>
                <td className="">${parseFloat(total_TotalValueRedeemed).toFixed(2)}</td>
                <td className="">${parseFloat(total_NetAmount).toFixed(2)}</td>
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

export default GiftVouchersActivity;

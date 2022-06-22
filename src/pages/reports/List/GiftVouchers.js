import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import { SalonModule } from "pages";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";

const GiftVouchers = () => {
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
              <th className="fw-600">{t("Reciepient")}</th>
              <th className="fw-600">{t("Gift Voucher")}</th>
              <th className="fw-600">{t("Code")}</th>
              <th className="fw-600">{t("Status")}</th>
              <th className="fw-600">{t("Expiry Date")}</th>
              <th className="fw-600">{t("Amount")}</th>
              <th className="fw-600">{t("Redeemed")}</th>
              <th className="fw-600">{t("Outstanding")}</th>
            </tr>
          </thead>
          <tbody className="report-table-data">
            {objectData.length > 0 &&
              Object.keys(objectData).map((item, i) => {
                let id = objectData[item].id;
                let client = objectData[item].client;
                let voucher = objectData[item].voucher;

                let first_name = objectData[item].first_name;
                let last_name = objectData[item].last_name;
                let voucher_type = objectData[item].voucher_type;
                let code = objectData[item].code;
                let amount = objectData[item].amount;
                let remaining_balance = objectData[item].remaining_balance;

                let name = ucfirst(first_name) + " " + ucfirst(last_name);
                let clientname = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
                return (
                  <tr key={i} data-id={id}>
                    <td className="">{clientname}</td>
                    <td className="">{name}</td>
                    <td className="">{voucher_type === "OneOffVoucher" ? t("One-Off Voucher") : voucher.name}</td>
                    <td className="">{code}</td>
                    <td className="">{voucher_type === "Voucher" && voucher && voucher.is_active === 0 ? t("InActive") : t("Active")}</td>
                    <td className="">{voucher_type === "Voucher" && voucher && voucher.expiry_at ? <Moment format="DD MMMM YYYY">{voucher.expiry_at}</Moment> : "-"}</td>
                    <td className="">${amount}</td>
                    <td className="">${(amount-remaining_balance)}</td>
                    <td className="">${remaining_balance}</td>
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

export default GiftVouchers;

import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import { ucfirst } from "helpers/functions";
import Moment from "react-moment";

const InvoiceListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const views = props.view;
  const objectData = views && views.data ? views.data : views;
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          let id = objectData[item].id;
          let invoicedate = objectData[item].invoicedate;
          let totalprice = objectData[item].totalprice;
          let status = objectData[item].status;
          let client = objectData[item].client;
          let client_name = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
          let cart = objectData[item].cart;
          return (
            <tr className="sale-complete-link" key={item}>
              <td>{`#${id}`}</td>
              <td>{client_name}</td>
              <td>
                <span className="badge paid">{t(status)}</span>
              </td>
              {/* {cart &&
                Object.keys(cart).map((cartitem, index) => {
                  console.log(cartitem);
                  return <td key={index} rowSpan={}>
                    <table><tbody><tr><td>1</td><td>2</td></tr></tbody></table>
                  </td>;
                })} */}
              <td>
                <Moment format="Do MMMM YYYY">{invoicedate}</Moment>
              </td>
              <td>${totalprice ? totalprice : "0.00"}</td>
            </tr>
          );
        })}
      {objectData.length <= 0 && (
        <tr className="fw-bold ps-3 text-center">
          <td colSpan={5}>{t("No data found")}</td>
        </tr>
      )}
    </>
  );
};
InvoiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default InvoiceListView;

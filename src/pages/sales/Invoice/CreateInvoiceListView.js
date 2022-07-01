import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import Moment from "react-moment";
import { ucfirst } from "helpers/Functions";
import { AppointmentDetail, openAddSaleForm } from "store/slices/saleSlice";
// import config from "../../../config";

const CreateInvoiceListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const views = props.view;
  const objectData = views && views.data ? views.data : views;
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          // let id = objectData[item].id;
          let dateof = objectData[item].dateof;
          let cost = objectData[item].cost;
          let client = objectData[item].client;
          let client_name = ucfirst(client.first_name) + " " + ucfirst(client.last_name);
          let staff = objectData[item].staff;
          let staff_name = ucfirst(staff.first_name) + " " + ucfirst(staff.last_name);
          let service = objectData[item].service;
          return (
            <tr
              id="sale-checkout-link"
              className="cursor-pointer"
              key={item}
              onClick={() => {
                dispatch(AppointmentDetail(objectData[item]));
                dispatch(openAddSaleForm());
              }}
            >
              <td>
                <Moment format="Do MMMM YYYY">{dateof}</Moment>
              </td>
              <td>{client_name}</td>
              <td>{service.name}</td>
              <td>{staff_name}</td>
              <td>${cost}</td>
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
CreateInvoiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default CreateInvoiceListView;

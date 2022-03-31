import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";

const InvoiceView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <th>Date</th>
                <th>Client</th>
                <th>Service</th>
                <th>Staff Member</th>
                <th>Amount</th>
              </thead>
              <tbody>
                <tr id="sale-checkout-link">
                  <td>19th August 2021</td>
                  <td>Michael Randerson</td>
                  <td>Men’s Cut</td>
                  <td>Richard</td>
                  <td>$60</td>
                </tr>
                <tr id="sale-checkout-link">
                  <td>19th August 2021</td>
                  <td>Michael Randerson</td>
                  <td>Men’s Cut</td>
                  <td>Richard</td>
                  <td>$60</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
InvoiceView.propTypes = {
  //   view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};

export default InvoiceView;

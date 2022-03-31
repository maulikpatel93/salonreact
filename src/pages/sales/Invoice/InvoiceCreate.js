import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";

const InvoiceCreate = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <th>Invoice</th>
                <th>Client</th>
                <th>Status</th>
                <th>Service</th>
                <th>Staff Member</th>
                <th>Date</th>
                <th>Amount</th>
              </thead>
              <tbody>
                <tr id="sale-complete-link">
                  <td>1</td>
                  <td>Michael Randerson</td>
                  <td>
                    <span className="badge paid">Paid</span>
                  </td>
                  <td>Men’s Cut</td>
                  <td>Richard</td>
                  <td>19th August 2021</td>
                  <td>$60</td>
                </tr>
                <tr id="sale-complete-link">
                  <td>2</td>
                  <td>Michael Randerson</td>
                  <td>
                    <span className="badge paid">Paid</span>
                  </td>
                  <td>Men’s Cut</td>
                  <td>Richard</td>
                  <td>19th August 2021</td>
                  <td>$60</td>
                </tr>
                <tr id="sale-complete-link">
                  <td>3</td>
                  <td>Michael Randerson</td>
                  <td>
                    <span className="badge paid">Paid</span>
                  </td>
                  <td>Men’s Cut</td>
                  <td>Richard</td>
                  <td>19th August 2021</td>
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
InvoiceCreate.propTypes = {
  //   view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
};

export default InvoiceCreate;

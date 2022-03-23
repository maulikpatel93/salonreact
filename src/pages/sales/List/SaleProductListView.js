import React from "react";
import PropTypes from "prop-types";

import { ucfirst } from "../../../helpers/functions";

const SaleServiceListView = (props) => {
  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          // let sku = objectData[item].sku;
          let retail_price = objectData[item].retail_price;
          // let stock_quantity = objectData[item].stock_quantity;
          let image_url = objectData[item].image_url;
          return (
            <tr className="product-view-tr" key={i} data-id={id}>
              <td>
                <div className="row align-items-center flex-nowrap">
                  <div className="pro-img">
                    {image_url ? (
                      <div className="user">
                        <a data-fancybox="" data-src={image_url}>
                          <img src={image_url} alt="" className="rounded-circle wh-40" />
                        </a>
                      </div>
                    ) : (
                      <div className="user-initial">{name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="pro-title">
                    <h6 className="mb-1">{ucfirst(name)}</h6>
                  </div>
                </div>
              </td>
              <td>{retail_price}</td>
            </tr>
          );
        })}
    </>
  );
};

SaleServiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default SaleServiceListView;

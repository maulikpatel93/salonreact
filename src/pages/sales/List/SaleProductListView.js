import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ucfirst } from "../../../helpers/functions";
import { SaleProductToCartApi } from "store/slices/saleSlice";

const SaleServiceListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  const handleProductClick = (e) => {
    const productdata = JSON.parse(e.currentTarget.dataset.obj);
    const product_id = productdata.id;
    dispatch(SaleProductToCartApi({ product_id: product_id }));
  };
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
            <tr className="product-view-tr cursor-pointer" key={i} data-id={id} data-obj={JSON.stringify(objectData[item])} onClick={handleProductClick}>
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
              <td>${retail_price}</td>
            </tr>
          );
        })}
        {objectData.length <= 0 ? <tr className="fw-bold p-3"><td colSpan={2}>{t("No data found")}</td></tr> : ""}
    </>
  );
};

SaleServiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default SaleServiceListView;

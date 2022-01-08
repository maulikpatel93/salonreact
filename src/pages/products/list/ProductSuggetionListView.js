import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { productListViewApi, closeProductSearchList, productSearchName } from "../../../store/slices/productSlice";
import { ucfirst } from "../../../helpers/functions";
// import ReactPaginate from 'react-paginate';

const ProductSuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUser = props.currentUser;
  const view = props.view;
  // const view = useSelector((state) => state.product.isView);
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    dispatch(productSearchName(suggetionname));
    dispatch(closeProductSearchList());
    dispatch(productListViewApi({ id: suggetionid, result:"result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let sku = objectData[item].sku;
          let image_url = objectData[item].image_url;
          let supplier_name = objectData[item].supplier && objectData[item].supplier.name;
          return (
            <li className="product-suggetion-li" key={i} data-id={id} data-name={ucfirst(name)}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                <div className="user-img me-2">{image_url ? <img src={image_url} alt="" className="rounded-circle wh-32" /> : <div className="user-initial">{name.charAt(0)}</div>}</div>
                <div className="user-id">
                  <span className="user-name">{ucfirst(name) +' - '+sku}</span>
                  <span className="user-id">{ucfirst(supplier_name)}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li>{t("no_data_found")}</li> : ""}
    </>
  );
};

export default ProductSuggetionListView;

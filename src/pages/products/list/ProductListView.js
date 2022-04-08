import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { productManageStock, productDeleteApi, productDetailApi, openEditProductForm } from "../../../store/slices/productSlice";
import { supplierOptions } from "../../../store/slices/supplierSlice";
import { taxOptions } from "../../../store/slices/taxSlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";


const ProductListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const view = props.view;

  // const view = useSelector((state) => state.product.isView);
  const objectData = view && view.data ? view.data : view;

  const handleProductDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this product?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(productDeleteApi({ id: props.id }));
    }
  };

  const handleProductEditForm = (e) => {
    const id = e.currentTarget.closest(".product-view-tr").dataset.id;
    dispatch(openEditProductForm());
    dispatch(productDetailApi({ id })).then(action => {
      if(action.meta.requestStatus == 'fulfilled'){
          const detail = action.payload;
          if (detail.image) {
            dispatch(selectImage({ name: detail.image, size: "", type: "", url: detail.image_url }));
          }else{
            dispatch(removeImage());
          }
          dispatch(productManageStock(detail && detail.manage_stock));
          dispatch(supplierOptions({ option: { valueField: "id", labelField: "name" } }));
          dispatch(taxOptions({ option: { valueField: "id", labelField: "name" } }));
      }
    });
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let sku = objectData[item].sku;
          let cost_price = objectData[item].cost_price;
          let stock_quantity = objectData[item].stock_quantity;
          let image_url = objectData[item].image_url;
          let supplier_name = objectData[item].supplier && objectData[item].supplier.name;
          return (
            <tr className="product-view-tr" key={i} data-id={id}>
              <td className="pe-0" width="60px">
                {image_url ? (
                  <div className="user">
                    <a data-fancybox="" data-src={image_url}>
                      <img src={image_url} alt="" className="rounded-circle wh-40" />
                    </a>
                  </div>
                ) : (
                  <div className="user-initial">{name.charAt(0)}</div>
                )}
              </td>
              <td>{ucfirst(name)}
              </td>
              <td>{sku}</td>
              <td>{supplier_name}</td>
              <td>{stock_quantity}</td>
              <td>{cost_price}</td>
              <td className="ps-0 text-end" width="60px">
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                      <li>
                        <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleProductEditForm(e)}>
                          <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                          {t("Edit")}
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleProductDelete}>
                          <i className="far fa-trash me-3"></i>
                          {t("Delete")}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
    </>
  );
};

ProductListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};

export default ProductListView;

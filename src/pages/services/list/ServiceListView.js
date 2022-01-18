import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { serviceDeleteApi, serviceDetailApi, openEditServiceForm } from "../../../store/slices/serviceSlice";
import { categoryOptions } from "../../../store/slices/categorySlice";
import { taxOptions } from "../../../store/slices/taxSlice";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";
// import ReactPaginate from 'react-paginate';

const ServiceListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const views = props.view;
  const objectData = views && views.data ? views.data : views;

  const handleServiceDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_service"), message: name, confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(serviceDeleteApi({ id: props.id }));
    }
  };

  const handleServiceEditForm = (e) => {
    const id = e.currentTarget.closest(".service-view-tr").dataset.id;
    dispatch(openEditServiceForm());
    dispatch(serviceDetailApi({ id })).then(action => {
      if(action.meta.requestStatus == 'fulfilled'){
          const detail = action.payload;
          if (detail.image) {
            dispatch(selectImage({ name: detail.image, size: "", type: "", url: detail.image_url }));
          }else{
            dispatch(removeImage());
          }
          dispatch(categoryOptions({ option: { valueField: "id", labelField: "name" } }));
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
          let duration = objectData[item].duration;
          let price = '';
          let category_name = objectData[item].category && objectData[item].category.name;
          let add_on_service = '';
          return (
            <tr className="service-view-tr" key={i} data-id={id}>
              <td>{i+1}</td>
              <td>{ucfirst(name)}
              </td>
              <td>{duration}</td>
              <td>{price}</td>
              <td>{category_name}</td>
              <td>{add_on_service}</td>
              <td className="ps-0 text-end" width="60px">
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                      <li>
                        <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleServiceEditForm(e, { tab: "servicedetail" })}>
                          <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                          {t("edit")}
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleServiceDelete}>
                          <i className="far fa-trash me-3"></i>
                          {t("delete")}
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
ServiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
};
export default ServiceListView;

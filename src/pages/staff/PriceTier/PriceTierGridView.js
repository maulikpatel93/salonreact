import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { pricetierDeleteApi, openEditPriceTierForm, pricetierDetailApi } from "../../../store/slices/pricetierSlice";
import PropTypes from "prop-types";

const PriceTierGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;

  const objectData = views && views.data ? views.data : views;

  const handlePriceTierDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_pricetier"), message: name, confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(pricetierDeleteApi({ id: props.id }));
    }
  };

  const handleEditForm = (e) => {
    const id = e.currentTarget.closest(".box-image-cover").dataset.id;
    dispatch(openEditPriceTierForm());
    dispatch(pricetierDetailApi({ id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let totalStaff = objectData[item].totalStaff;
          return (
            <div className="box-image-cover" key={i} data-id={id}>
              <div className="dropdown d-inline-block setting-dropdown">
                <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                  <i className="far fa-ellipsis-v"></i>
                </button>
                <div className="dropdown-menu dropdown-box dropdown-menu-end" style={{ minWidth: "116px" }} aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                  <ul className="p-0 m-0 list-unstyled">
                    <li>
                      <a className="d-flex align-items-center cursor-pointer" onClick={(e) => handleEditForm(e)}>
                        <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                        {t("edit")}
                      </a>
                    </li>
                    <li>
                      <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handlePriceTierDelete}>
                        <i className="far fa-trash me-3"></i>
                        {t("delete")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <a className="pricetier-detail cursor-pointer">
                <div className="tabs-image">
                  <img src={config.imagepath + "tires.png"} alt="" />
                </div>
                <div className="image-content">
                  <h5 className="fw-semibold mb-1">{ucfirst(name)}</h5>
                  <h5 className="mb-1 fw-normal"><i className="fas fa-user me-1"></i> {totalStaff}</h5>
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
};

PriceTierGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  name: PropTypes.string,
  id: PropTypes.string,
  tab: PropTypes.string,
};

export default PriceTierGridView;

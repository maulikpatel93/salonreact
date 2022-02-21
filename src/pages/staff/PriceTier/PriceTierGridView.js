import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { pricetierDeleteApi, openEditPriceTierForm, pricetierDetailApi } from "../../../store/slices/pricetierSlice";
import PropTypes from "prop-types";
import { checkaccess } from "helpers/functions";

const PriceTierGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;

  const objectData = views && views.data ? views.data : views;
  const role_id = props.role_id;
  const access = props.access;

  const handlePriceTierDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure?_delete_pricetier"), message: name, confirmButtonText: t("yes_delete_it") });
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
              {(checkaccess({ name: "update", role_id: role_id, controller: "pricetiers", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "pricetiers", access })) && (
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" style={{ minWidth: "116px" }} aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                      {checkaccess({ name: "update", role_id: role_id, controller: "pricetiers", access }) && (
                        <li>
                          <a className="d-flex align-items-center cursor-pointer" onClick={(e) => handleEditForm(e)}>
                            <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                            {t("Edit")}
                          </a>
                        </li>
                      )}

                      {checkaccess({ name: "delete", role_id: role_id, controller: "pricetiers", access }) && (
                        <li>
                          <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handlePriceTierDelete}>
                            <i className="far fa-trash me-3"></i>
                            {t("Delete")}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              <a className="pricetier-detail cursor-pointer">
                <div className="tabs-image">
                  <img src={config.imagepath + "tires.png"} alt="" />
                </div>
                <div className="image-content">
                  <h5 className="fw-semibold mb-1">{ucfirst(name)}</h5>
                  {checkaccess({ name: "view", role_id: role_id, controller: "pricetiers", access }) && (
                    <h5 className="mb-1 fw-normal">
                      <i className="fas fa-user me-1"></i> {totalStaff}
                    </h5>
                  )}
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
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  role_id: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  tab: PropTypes.string,
};

export default PriceTierGridView;

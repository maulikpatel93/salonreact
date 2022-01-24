import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { staffDeleteApi, openEditStaffForm, staffDetailApi, addonservices } from "../../../store/slices/staffSlice";
import { pricetierOptions } from "../../../store/slices/pricetierSlice";

import PropTypes from "prop-types";
import { selectImage, removeImage } from "../../../store/slices/imageSlice";

const StaffGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;

  const objectData = views && views.data ? views.data : views;

  const handleStaffDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.first_name + " " + props.last_name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_staff"), message: name, confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(staffDeleteApi({ id: props.id }));
    }
  };
  const handleStaffEditForm = (e) => {
    const id = e.currentTarget.closest(".box-image-cover").dataset.id;
    dispatch(openEditStaffForm());
    dispatch(staffDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus == "fulfilled") {
        const detail = action.payload;
        if (detail.profile_photo) {
          dispatch(selectImage({ name: detail.profile_photo, size: "", type: "", url: detail.profile_photo_url }));
        } else {
          dispatch(removeImage());
        }
        dispatch(addonservices({ staff_id: id }));
        dispatch(pricetierOptions({ option: { valueField: "id", labelField: "name" } }));
      }
    });
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let first_name = objectData[item].first_name;
          let last_name = objectData[item].last_name;
          let phone_number = objectData[item].phone_number;
          let profile_photo_url = objectData[item].profile_photo_url;
          return (
            <div className="box-image-cover" key={i} data-id={id}>
              <div className="dropdown d-inline-block setting-dropdown">
                <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                  <i className="far fa-ellipsis-v"></i>
                </button>
                <div className="dropdown-menu dropdown-box dropdown-menu-end" style={{ minWidth: "116px" }} aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                  <ul className="p-0 m-0 list-unstyled">
                    <li>
                      <a className="d-flex align-items-center cursor-pointer" onClick={(e) => handleStaffEditForm(e, { tab: "staffdetail" })}>
                        <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                        {t("edit")}
                      </a>
                    </li>
                    <li>
                      <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleStaffDelete}>
                        <i className="far fa-trash me-3"></i>
                        {t("delete")}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <a className="staff-detail cursor-pointer" onClick={handleStaffEditForm}>
                {profile_photo_url ? (
                  <div className="tabs-image">
                    <img src={profile_photo_url} alt="" className="rounded-circle wh-118" />
                  </div>
                ) : (
                  <div className="tabs-image user-initial mx-auto">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>
                )}
                <div className="image-content">
                  <h5 className="fw-semibold mb-1">{ucfirst(first_name + " " + last_name)}</h5>
                  <h5 className="mb-0 fw-normal">{phone_number}</h5>
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
};

StaffGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  tab: PropTypes.string,
};

export default StaffGridView;

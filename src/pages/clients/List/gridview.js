import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { clientDeleteApi, openClientDetailModal, clientDetailApi, clientDetailTab } from "../../../store/slices/clientSlice";
import PropTypes from "prop-types";
import { checkaccess } from "helpers/functions";

const ClientGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const views = props.view;
  const role_id = props.role_id;
  const access = props.access;

  const objectData = views && views.data ? views.data : views;

  const handleClientDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.first_name + " " + props.last_name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this client?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(clientDeleteApi({ id: props.id }));
    }
  };
  const handleClientDetailModal = (e, props) => {
    const id = e.currentTarget.closest(".box-image-cover").dataset.id;
    dispatch(openClientDetailModal());
    dispatch(clientDetailApi({ id }));
    if (props && props.tab == "clientdetail") {
      dispatch(clientDetailTab("clientdetail"));
    }
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
              {(checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "clients", access })) && (
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" style={{ minWidth: "116px" }} aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                      {checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) && (
                        <li>
                          <a className="d-flex align-items-center cursor-pointer" onClick={(e) => handleClientDetailModal(e, { tab: "clientdetail" })}>
                            <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                            {t("Edit")}
                          </a>
                        </li>
                      )}
                      <li>
                        <a className="d-flex align-items-center cursor-pointer">
                          <img src={config.imagepath + "sms.png"} className="me-3" alt="" />
                          {t("SMS")}
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center cursor-pointer">
                          <img src={config.imagepath + "email.png"} className="me-3" alt="" />
                          {t("Email Address")}
                        </a>
                      </li>
                      {checkaccess({ name: "delete", role_id: role_id, controller: "clients", access }) && (
                        <li>
                          <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleClientDelete}>
                            <i className="far fa-trash me-3"></i>
                            {t("Delete")}
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
              <a className="client-detail cursor-pointer" onClick={handleClientDetailModal}>
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

ClientGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  tab: PropTypes.string,
  role_id: PropTypes.number,
};

export default ClientGridView;

import React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { ClientDeleteApi, OpenClientDetailModal, ClientDetailApi, ClientDetailTab } from "../../../store/slices/clientSlice";
import PropTypes from "prop-types";
// import ReactPaginate from 'react-paginate';
import { checkaccess } from "helpers/functions";
import { clientAppointmentListViewApi } from "store/slices/appointmentSlice";

const ClientListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const views = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.client.isView);
  const objectData = views && views.data ? views.data : views;

  const handleClientDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.first_name + " " + props.last_name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this client?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(ClientDeleteApi({ id: props.id }));
    }
  };

  const handleClientDetailModal = (e, props) => {
    const id = e.currentTarget.closest(".client-view-tr").dataset.id;
    dispatch(ClientDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(OpenClientDetailModal());
        if (props && props.tab === "clientdetail") {
          dispatch(ClientDetailTab("clientdetail"));
        }
        if (props && props.tab === "appointment") {
          dispatch(clientAppointmentListViewApi({ client_id: id }));
        }
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
          let email = objectData[item].email;
          let phone_number = objectData[item].phone_number;
          let profile_photo_url = objectData[item].profile_photo_url;
          return (
            <tr className="client-view-tr" key={i} data-id={id}>
              <td className="pe-0" width="60px">
                {profile_photo_url ? (
                  <div className="user">
                    <a data-fancybox="" data-src={profile_photo_url}>
                      <img src={profile_photo_url} alt="" className="rounded-circle wh-40" />
                    </a>
                  </div>
                ) : (
                  <div className="user-initial">{first_name.charAt(0) + "" + last_name.charAt(0)}</div>
                )}
              </td>
              <td>
                <a className="cursor-pointer text-decoration-dotted hover-primary" onClick={(e) => handleClientDetailModal(e, { tab: "appointment" })}>
                  {ucfirst(first_name + " " + last_name)}
                </a>
              </td>
              <td>
                <a className="cursor-pointer text-decoration-none hover-primary" href={"tel:" + phone_number}>
                  {phone_number}
                </a>
              </td>
              <td>
                <a className="cursor-pointer text-decoration-none hover-primary" href={"mailto:" + email}>
                  {email}
                </a>
              </td>
              {(checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "clients", access })) && (
                <td className="ps-0 text-end" width="60px">
                  <div className="dropdown d-inline-block setting-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                      <i className="far fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                      <ul className="p-0 m-0 list-unstyled">
                        {checkaccess({ name: "update", role_id: role_id, controller: "clients", access }) && (
                          <li>
                            <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleClientDetailModal(e, { tab: "clientdetail" })}>
                              <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                              {t("Edit")}
                            </a>
                          </li>
                        )}
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
                </td>
              )}
            </tr>
          );
        })}
    </>
  );
};

ClientListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  tab: PropTypes.string,
  role_id: PropTypes.number,
};
export default ClientListView;

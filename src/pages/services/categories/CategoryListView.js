import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/Functions";
import { swalConfirm, sweatalert } from "../../../component/Sweatalert2";
import { openEditCategoryForm, categoryDeleteApi, categoryDetailApi } from "../../../store/slices/categorySlice";
import { checkaccess } from "helpers/Functions";

const CategoryListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const view = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.category.isView);

  const objectData = view && view.data ? view.data : view;
  const handleCategoryDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure you want to delete this category which includes all services in this category?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(categoryDeleteApi({ id: props.id })).then((action) => {
        if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const appointment = action.payload && action.payload.message && action.payload.message.appointment;
          if (status === 410) {
            sweatalert({ title: `<h4 class="text-danger">${t("This category has not been deleted as {{ appointmenttotal }} appointments have already been booked for services in this category.", { appointmenttotal: appointment })}</h4>`, text: t("Uploaded successfully"), icon: "warning" });
          }
        }
      });
    }
  };

  const handleEditForm = (e) => {
    const id = e.currentTarget.closest(".category-view-tr").dataset.id;
    dispatch(openEditCategoryForm());
    dispatch(categoryDetailApi({ id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let totalServices = objectData[item].totalServices;
          return (
            <tr className="category-view-tr" key={i} data-id={id}>
              <td>{ucfirst(name)}</td>
              <td>
                <a href="#" className="color-wine">
                  {totalServices}
                </a>
              </td>
              {(checkaccess({ name: "update", role_id: role_id, controller: "categories", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "categories", access })) && (
                <td style={{ textAlign: "right", width: "8%" }}>
                  <div className="dropdown d-inline-block setting-dropdown">
                    <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                      <i className="far fa-ellipsis-v"></i>
                    </button>
                    <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                      <ul className="p-0 m-0 list-unstyled">
                        {checkaccess({ name: "update", role_id: role_id, controller: "categories", access }) && (
                          <li>
                            <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleEditForm(e)}>
                              <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                              {t("Edit")}
                            </a>
                          </li>
                        )}
                        {checkaccess({ name: "delete", role_id: role_id, controller: "categories", access }) && (
                          <li>
                            <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleCategoryDelete}>
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
CategoryListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  role_id: PropTypes.number,
};
export default CategoryListView;

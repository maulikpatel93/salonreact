import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import config from "../../../config";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { openEditCategoryForm, categoryDeleteApi, categoryDetailApi } from "../../../store/slices/categorySlice";

const CategoryListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const view = props.view;
  // const view = useSelector((state) => state.category.isView);

  const objectData = view && view.data ? view.data : view;
  const handleCategoryDelete = (e) => {
    const props = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(props.first_name + " " + props.last_name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete_category"), message: name, confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(categoryDeleteApi({ id: props.id }));
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
          return (
            <tr className="category-view-tr" key={i} data-id={id}>
              <td>{ucfirst(name)}</td>
              {/* <td>
                <a href="#" className="color-wine">
                  4
                </a>
              </td> */}
              <td style={{ textAlign: 'right', width: '8%' }}>
                <div className="dropdown d-inline-block setting-dropdown">
                  <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                    <i className="far fa-ellipsis-v"></i>
                  </button>
                  <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                    <ul className="p-0 m-0 list-unstyled">
                    <li>
                        <a className="d-flex align-items-center edit-service cursor-pointer" onClick={(e) => handleEditForm(e)}>
                          <img src={config.imagepath + "edit.png"} className="me-3" alt="" />
                          {t("edit")}
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleCategoryDelete}>
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
CategoryListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node,PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
};
export default CategoryListView;

import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import { useTranslation } from "react-i18next";
import { categoryListViewApi, closecategoriesearchList, categoriesearchName } from "../../../store/slices/categorySlice";
import { ucfirst } from "../../../helpers/functions";

// import ReactPaginate from 'react-paginate';

const CategorySuggetionListView = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const view = props.view;
  const objectData = view && view.data ? view.data : view;

  const handleSuggestedId = (e) => {
    let suggetionid = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.id;
    let suggetionname = e.currentTarget.parentElement && e.currentTarget.parentElement.dataset && e.currentTarget.parentElement.dataset.name;
    dispatch(categoriesearchName(suggetionname));
    dispatch(closecategoriesearchList());
    dispatch(categoryListViewApi({ id: suggetionid, result:"result_array" }));
  };

  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item, i) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          return (
            <li className="category-suggetion-li" key={i} data-id={id} data-name={ucfirst(name)}>
              <a className="d-flex cursor-pointer" onClick={handleSuggestedId}>
                <div className="user-id">
                  <span className="user-name">{ucfirst(name)}</span>
                </div>
              </a>
            </li>
          );
        })}

      {objectData.length <= 0 ? <li>{t("no_data_found")}</li> : ""}
    </>
  );
};
CategorySuggetionListView.propTypes = {
  view: PropTypes.array,
};
export default CategorySuggetionListView;

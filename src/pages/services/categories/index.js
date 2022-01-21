import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import CategoryListView from "./CategoryListView";
import { openAddCategoryForm, categoryListViewApi } from "../../../store/slices/categorySlice";

const Categories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const ListView = useSelector((state) => state.category.isListView);
  const fetchDataGrid = () => {
    dispatch(categoryListViewApi({ next_page_url: ListView.next_page_url }));
  };
  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(categoryListViewApi({ next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  return (
    <>
      {ListView.length > 0 || ListView.data ? (
        <section className="services-table">
          <div className="services-table-shadow">
            <InfiniteScroll className="" dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-category" hasMore={ListView.next_page_url ? true : false} loader={<h4>loading...</h4>}>
              <table className="table table-striped bg-white categorie-table">
                <thead>
                  <tr>
                    <th>{t('category')}</th>
                    <th>{t('count')}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="services-table-data">
                  <CategoryListView currentUser={currentUser} view={ListView} />
                </tbody>
              </table>

              {!isFetching && ListView.next_page_url && (
                <div className="col-2 m-auto text-center">
                  <button onClick={loadMoreItems} className="btn btn-primary m-4">
                    {t("more")}
                  </button>
                </div>
              )}
            </InfiniteScroll>
          </div>
        </section>
      ) : (
        <div className="complete-box text-center d-flex flex-column justify-content-center my-md-5 my-4 bg-white">
          <div className="complete-box-wrp text-center ">
            <img src={config.imagepath + "service.png"} alt="" className="mb-md-4 mb-3" />
            <h4 className="mb-2 fw-semibold">
              {t("no_categories_have_been_created_yet")}
              <a className="add-categories ms-1 cursor-pointer" onClick={() => dispatch(openAddCategoryForm())}>
                {t("please_create_one")}
              </a>
              .
            </h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;

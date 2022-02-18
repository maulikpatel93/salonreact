import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../../config";
import CategoryListView from "./CategoryListView";
import { openAddCategoryForm, categoryListViewApi } from "../../../store/slices/categorySlice";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";

const Categories = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
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
    }, 1000);
  };

  return (
    <>
      {ListView.length > 0 || ListView.data ? (
        <section className="services-table">
          <div className="" id="scrollableGridView">
            <InfiniteScroll className="" dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataGrid} scrollableTarget="page-content-category" hasMore={ListView.next_page_url ? true : false} loader={<PaginationLoader />}>
              <div className="table-responsive bg-white table-shadow">
                <table className="table categorie-table mb-0">
                  <thead>
                    <tr>
                      <th>{t("category")}</th>
                      <th>{t("count")}</th>
                      {(checkaccess({ name: "update", role_id: role_id, controller: "categories", access }) || checkaccess({ name: "delete", role_id: role_id, controller: "categories", access })) && <th></th>}
                    </tr>
                  </thead>
                  <tbody className="services-table-data">
                    <CategoryListView currentUser={currentUser} view={ListView} role_id={role_id} access={access} />
                  </tbody>
                </table>
              </div>
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
        <>
          {checkaccess({ name: "create", role_id: role_id, controller: "categories", access }) && (
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
      )}
    </>
  );
};

export default Categories;

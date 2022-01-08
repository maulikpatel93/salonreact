import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";

import config from "../../config";
import Suppliers from "./suppliers";

import { openAddProductForm, productTabView, productListViewApi, productSort, productSortRemove, openProductSearchList, closeProductSearchList, productSuggetionListApi, productSearchName } from "../../store/slices/productSlice";
import { openAddSupplierForm, supplierGridViewApi, openSupplierSearchList, closeSupplierSearchList, supplierSuggetionListApi, supplierSearchName, supplierOptions } from "../../store/slices/supplierSlice";
import { taxOptions } from "../../store/slices/taxSlice";
import { selectImage, removeImage } from "../../store/slices/imageSlice";
import SupplierAddForm from "./suppliers/SupplierAddForm";
import SupplierEditForm from "./suppliers/SupplierEditForm";
import SupplierSuggetionListView from "./suppliers/SupplierSuggetionListView";
import ProductSuggetionListView from "./list/ProductSuggetionListView";
import ProductListView from "./list/ProductListView";
import ProductAddForm from "./form/ProductAddForm";
import ProductEditForm from "./form/ProductEditForm";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;

  const tabview = useSelector((state) => state.product.isTabView);
  const ListView = useSelector((state) => state.product.isListView);
  const sort = useSelector((state) => state.product.isSort);
  const productIsOpenedAddForm = useSelector((state) => state.product.isOpenedAddForm);
  const productIsOpenedEditForm = useSelector((state) => state.product.isOpenedEditForm);
  const supplierIsOpenedAddForm = useSelector((state) => state.supplier.isOpenedAddForm);
  const supplierIsOpenedEditForm = useSelector((state) => state.supplier.isOpenedEditForm);

  const isSearchListProduct = useSelector((state) => state.product.isSearchList);
  const isSearchNameProduct = useSelector((state) => state.product.isSearchName);
  const isSuggetionViewProduct = useSelector((state) => state.product.isSuggetionListView);

  const isSearchListSupplier = useSelector((state) => state.supplier.isSearchList);
  const isSearchNameSupplier = useSelector((state) => state.supplier.isSearchName);
  const isSuggetionViewSupplier = useSelector((state) => state.supplier.isSuggetionListView);

  useEffect(() => {
    dispatch(productSortRemove());
    dispatch(productListViewApi());
    dispatch(supplierGridViewApi());
  }, [dispatch]);

  const handleProductTab = () => {
    dispatch(productTabView("product"));
  };

  const handleSupplierTab = () => {
    dispatch(productTabView("supplier"));
  };

  const handleopenAddProductForm = () => {
    dispatch(openAddProductForm());
    dispatch(supplierOptions({ option: { valueField: "id", labelField: "name" } }));
    dispatch(taxOptions({ option: { valueField: "id", labelField: "name" } }));
  };

  const handleOpenAddSupplierForm = () => {
    dispatch(openAddSupplierForm());
    dispatch(removeImage());
  };

  const fetchDataList = () => {
    dispatch(productListViewApi({ next_page_url: ListView.next_page_url }));
  };
  //Product search
  const fetchDataSuggetionListProduct = () => {
    dispatch(productSuggetionListApi({ next_page_url: isSuggetionViewProduct.next_page_url, q: isSearchNameProduct }));
  };

  const [isFetching, setIsFetching] = useState(false);
  const loadMoreItems = () => {
    setIsFetching(true);
    dispatch(productListViewApi({ next_page_url: ListView.next_page_url }));
    //mocking an API call
    setTimeout(() => {
      setIsFetching(false);
    }, 2000);
  };

  const handleClickSearchProduct = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openProductSearchList());
      dispatch(productSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchProduct = (e) => {
    let q = e.currentTarget.value;
    dispatch(productSearchName(q));
    if (q && q.length > 0) {
      dispatch(openProductSearchList());
      dispatch(productSuggetionListApi({ q: q })).then((action) => {
        if (action.meta.requestStatus == "rejected") {
          // dispatch(closeSupplierSearchList());
        }
      });
    } else {
      dispatch(productListViewApi());
    }
  };
  const handleCloseSearchProduct = () => {
    dispatch(productSearchName(""));
    dispatch(closeProductSearchList());
    dispatch(productListViewApi());
  };
  const handleOnBlurProduct = (e) => {
    setTimeout(() => {
      dispatch(closeProductSearchList());
    }, 100);
  };

  //Supplier search
  const fetchDataSuggetionListSupplier = () => {
    dispatch(supplierSuggetionListApi({ next_page_url: isSuggetionViewSupplier.next_page_url, q: isSearchNameSupplier }));
  };

  const handleClickSearchSupplier = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openSupplierSearchList());
      dispatch(supplierSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchSupplier = (e) => {
    let q = e.currentTarget.value;
    dispatch(supplierSearchName(q));
    if (q && q.length > 0) {
      dispatch(openSupplierSearchList());
      dispatch(supplierSuggetionListApi({ q: q })).then((action) => {
        if (action.meta.requestStatus == "rejected") {
          // dispatch(closeSupplierSearchList());
        }
      });
    } else {
      dispatch(supplierGridViewApi());
    }
  };
  const handleCloseSearchSupplier = () => {
    dispatch(supplierSearchName(""));
    dispatch(closeSupplierSearchList());
    dispatch(supplierGridViewApi());
  };
  const handleOnBlurSupplier = (e) => {
    setTimeout(() => {
      dispatch(closeSupplierSearchList());
    }, 100);
  };

  const sorting = (props) => {
    dispatch(productSort(props));
    dispatch(productListViewApi({ sort: props }));
  };

  return (
    <>
      <div className={"page-content bg-pink service page-content-" + tabview}>
        <div className="row bg-white align-items-center sticky-top">
          <div className="common-tab col-md-4 col-7 order-1">
            <ul className="nav nav-tabs mb-0 justify-content-start" role="tablist">
              <li className="nav-item">
                <a href="#" className={"nav-link " + (tabview && tabview == "product" ? " active" : "")} id="product-tab" data-bs-toggle="tab" data-bs-target="#product" type="button" role="tab" aria-controls="product" aria-selected="true" onClick={handleProductTab}>
                  {t("products")}
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className={"nav-link " + (tabview && tabview == "supplier" ? " active" : "")} id="suppliers-tab" data-bs-toggle="tab" data-bs-target="#suppliers" type="button" role="tab" aria-controls="suppliers" aria-selected="true" onClick={handleSupplierTab}>
                  {t("suppliers")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 py-md-0 py-2 px-md-0 px-4 order-md-2 order-3 search-wrp">
            <div className="search search-radius">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="far fa-search"></i>
                </span>
                {tabview && tabview == "product" ? (
                  <>
                    <input type="text" className="form-control search-input" placeholder={t("search")} value={isSearchNameProduct} onInput={(e) => dispatch(productSearchName(e.target.value))} onClick={handleClickSearchProduct} onKeyUp={handleKeyUpSearchProduct} onBlur={handleOnBlurProduct} />
                    <a href="#" className="close" style={{ display: isSearchNameProduct ? "block" : "none" }} onClick={handleCloseSearchProduct}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                ) : (
                  <>
                    <input type="text" className="form-control search-input" placeholder={t("search")} value={isSearchNameSupplier} onInput={(e) => dispatch(supplierSearchName(e.target.value))} onClick={handleClickSearchSupplier} onKeyUp={handleKeyUpSearchSupplier} onBlur={handleOnBlurSupplier} />
                    <a href="#" className="close" style={{ display: isSearchNameSupplier ? "block" : "none" }} onClick={handleCloseSearchSupplier}>
                      <i className="fal fa-times"></i>
                    </a>
                  </>
                )}
              </div>
              {tabview && tabview == "product" ? (
                <div className={"search-result dropdown-box " + isSearchListProduct} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewProduct.data && isSuggetionViewProduct.data.length ? isSuggetionViewProduct.data.length : "0"} next={fetchDataSuggetionListProduct} scrollableTarget="search-content" hasMore={isSuggetionViewProduct.next_page_url ? true : false} loader={<h4>loading...</h4>}>
                    <ul className="p-0 m-0 list-unstyled">
                      <ProductSuggetionListView view={isSuggetionViewProduct} />
                    </ul>
                  </InfiniteScroll>
                </div>
              ) : (
                <div className={"search-result dropdown-box " + isSearchListSupplier} id="search-content">
                  <InfiniteScroll className="" dataLength={isSuggetionViewSupplier.data && isSuggetionViewSupplier.data.length ? isSuggetionViewSupplier.data.length : "0"} next={fetchDataSuggetionListSupplier} scrollableTarget="search-content" hasMore={isSuggetionViewSupplier.next_page_url ? true : false} loader={<h4>loading...</h4>}>
                    <ul className="p-0 m-0 list-unstyled">
                      <SupplierSuggetionListView view={isSuggetionViewSupplier} />
                    </ul>
                  </InfiniteScroll>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 text-end col-5 ps-0 order-md-3 order-2">
            <div className="tab-content p-0 d-inline-block">
              <div className={tabview && tabview == "product" ? "active" : ""} style={{ display: tabview && tabview == "product" ? "block" : "none" }}>
                <a className="add-service btn me-md-3 me-1 add-new-btn px-xs-4" onClick={handleopenAddProductForm}>
                  {t("new_product")}
                </a>
              </div>
              <div className={tabview && tabview == "supplier" ? "active" : ""} style={{ display: tabview && tabview == "supplier" ? "block" : "none" }}>
                <a className="add-service btn me-md-3 me-1 add-new-btn px-xs-4" onClick={handleOpenAddSupplierForm}>
                  {t("new_supplier")}
                </a>
              </div>
            </div>
            <div className="dropdown d-inline-block setting-dropdown">
              <button className="dropdown-toggle dropdown-toggle-icon-none" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="true">
                <i className="far fa-ellipsis-v"></i>
              </button>
              <div className="dropdown-menu dropdown-box dropdown-menu-end" aria-labelledby="dropdownMenuButton1" data-popper-placement="bottom-end">
                <ul className="p-0 m-0 list-unstyled">
                  <li>
                    <a href="#" id="addproduct-drawer-link" className="d-flex align-items-center">
                      <img src={config.imagepath + "import.png"} className="me-3" alt="" />
                      Import Services
                    </a>
                  </li>
                  <li>
                    <a href="#" id="addsale-drawer-link" className="d-flex align-items-center">
                      <img src={config.imagepath + "export.png"} className="me-3" />
                      Export Services
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={"tab-content list-view-content"}>
            <div className={"tab-pane" + (tabview && tabview == "product" ? " show active" : "")} id="product" role="tabpanel" aria-labelledby="product-tab">
              {ListView.length > 0 || ListView.data ? (
                <section>
                  <div className="table-responsive services-table-shadow" id="scrollableListView">
                    <InfiniteScroll dataLength={ListView.data && ListView.data.length ? ListView.data.length : "0"} next={fetchDataList} scrollableTarget="page-content-product" hasMore={ListView.next_page_url ? true : false} loader={<h4>loading...</h4>}>
                      <table className="table bg-white">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>
                              <a className="product-header cursor-pointer" onClick={() => sorting({ name: sort.name == "asc" ? "desc" : "asc" })}>
                                {t("product_name")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.name == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.name == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="product-header cursor-pointer" onClick={() => sorting({ sku: sort.sku == "asc" ? "desc" : "asc" })}>
                                {t("sku")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.sku == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.sku == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="product-header cursor-pointer" onClick={() => sorting({ supplier: { name: sort && sort.supplier && sort.supplier.name == "asc" ? "desc" : "asc" } })}>
                                {t("supplier")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort && sort.supplier && sort.supplier.name == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort && sort.supplier && sort.supplier.name == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="product-header cursor-pointer" onClick={() => sorting({ stock_quantity: sort.stock_quantity == "asc" ? "desc" : "asc" })}>
                                {t("stock")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.stock_quantity == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.stock_quantity == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <a className="product-header cursor-pointer" onClick={() => sorting({ retail_price: sort.retail_price == "asc" ? "desc" : "asc" })}>
                                {t("retail_price")}
                                <span className="down-up-arrow">
                                  <i className={"fal fa-angle-up" + (sort.retail_price == "asc" ? " text-dark" : "")}></i>
                                  <i className={"fal fa-angle-down" + (sort.retail_price == "desc" ? " text-dark" : "")}></i>
                                </span>
                              </a>
                            </th>
                            <th>
                              <div className="d-flex align-items-center justify-content-end">{t("action")}</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="services-table-data">
                          <ProductListView view={ListView} />
                        </tbody>
                      </table>
                      {!isFetching && ListView.next_page_url && (
                        <div className="col-2 m-auto p-3">
                          <button onClick={loadMoreItems} className="btn btn-primary">
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
                      {t("no_products_have_been_created_yet")}
                      <a className="add-product ms-1 cursor-pointer" onClick={() => dispatch(openAddProductForm())}>
                        {t("please_create_one")}
                      </a>
                      .
                    </h4>
                  </div>
                </div>
              )}
            </div>
            <div className={"tab-pane" + (tabview && tabview == "supplier" ? " show active" : "")} id="suppliers" role="tabpanel" aria-labelledby="suppliers-tab">
              <Suppliers />
            </div>
          </div>
        </div>
        {supplierIsOpenedAddForm ? <SupplierAddForm /> : ""}
        {supplierIsOpenedEditForm ? <SupplierEditForm /> : ""}
        {productIsOpenedAddForm ? <ProductAddForm /> : ""}
        {productIsOpenedEditForm ? <ProductEditForm /> : ""}
      </div>
    </>
  );
};

export default Products;

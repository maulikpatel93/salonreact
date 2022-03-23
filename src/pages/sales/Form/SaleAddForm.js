import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
// validation Formik
import * as Yup from "yup";
import { Formik } from "formik";
import config from "../../../config";
import yupconfig from "../../../yupconfig";
import { sweatalert } from "../../../component/Sweatalert2";
import { saleStoreApi } from "../../../store/slices/saleSlice";
import useScriptRef from "../../../hooks/useScriptRef";
import { openAddClientForm, openClientSearchList, closeClientSearchList, clientSuggetionListApi, clientSearchName, clientSearchObj } from "store/slices/clientSlice";
import ClientSuggetionListView from "pages/clients/List/ClientSuggetionListView";
import { InputField, TextareaField } from "component/form/Field";

const SaleAddForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const scriptedRef = useScriptRef();

  const isSearchListClient = useSelector((state) => state.client.isSearchList);
  const isSearchNameClient = useSelector((state) => state.client.isSearchName);
  const isSearchObjClient = useSelector((state) => state.client.isSearchObj);
  const SuggetionViewClient = useSelector((state) => state.client.isSuggetionListView);

  const initialValues = {
    client_id: "",
    client_name: "",
    notes: "",
  };

  const validationSchema = Yup.object().shape({
    client_id: Yup.lazy((val) => (Array.isArray(val) ? Yup.array().of(Yup.string()).nullable().min(1).required() : Yup.string().nullable().label(t("Client")).required())),
    client_name: Yup.string().trim().label(t("Client")),
    notes: Yup.string().trim().label(t("Notes")),
  });
  yupconfig();

  const handlesaleSubmit = (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      dispatch(saleStoreApi(values)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          setStatus({ success: true });
          resetForm();
          dispatch(closeAddsaleForm());
          sweatalert({ title: t("Created"), text: t("Created Successfully"), icon: "success" });
          if (scriptedRef.current) {
            setLoading(false);
          }
        } else if (action.meta.requestStatus === "rejected") {
          const status = action.payload && action.payload.status;
          const errors = action.payload && action.payload.message && action.payload.message.errors;
          if (status === 422) {
            setErrors(errors);
          }
          setStatus({ success: false });
          setSubmitting(false);
          if (scriptedRef.current) {
            setLoading(false);
          }
        }
      });
    } catch (err) {
      if (scriptedRef.current) {
        setErrors(err.message);
      }
      setStatus({ success: false });
      setLoading(false);
    }
  };

  //Client search
  const fetchDataSuggetionListClient = () => {
    dispatch(clientSuggetionListApi({ next_page_url: SuggetionViewClient.next_page_url, q: isSearchNameClient }));
  };

  const handleClickSearchClient = (e) => {
    let q = e.currentTarget.value;
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    }
  };
  const handleKeyUpSearchClient = (e) => {
    let q = e.currentTarget.value;
    dispatch(clientSearchName(q));
    if (q && q.length > 0) {
      dispatch(openClientSearchList());
      dispatch(clientSuggetionListApi({ q: q }));
    } else {
      dispatch(closeClientSearchList());
      dispatch(clientSearchName(""));
      dispatch(clientSearchObj(""));
    }
  };
  const handleCloseSearchClient = () => {
    dispatch(clientSearchName(""));
    dispatch(clientSearchObj(""));
    dispatch(closeClientSearchList());
  };
  const handleOnBlurClient = () => {
    // setTimeout(() => {
    //   dispatch(closeClientSearchList());
    // }, 200);
  };

  const handleClientAddForm = () => {
    dispatch(openAddClientForm());
  };
  return (
    <React.Fragment>
      <Formik enableReinitialize={false} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesaleSubmit}>
        {(formik) => {
          useEffect(() => {}, []);
          return (
            <form noValidate onSubmit={formik.handleSubmit}>
              <div className={isSearchObjClient ? "add-item-panel p-4" : "search-panel p-4"}>
                {isSearchObjClient ? (
                  <div className="flex-column justify-content-between d-flex flex-wrap">
                    <div className="user-box">
                      <div className="d-flex align-items-center">
                        {/* <div className="user-initial me-3">js</div> */}
                        {isSearchObjClient.profile_photo_url ? (
                          <div className="user-img me-3">
                            <img src={isSearchObjClient.profile_photo_url} alt="" className="rounded-circle wh-60" />
                          </div>
                        ) : (
                          <div className="user-initial me-3">{isSearchObjClient.first_name.charAt(0) + "" + isSearchObjClient.last_name.charAt(0)}</div>
                        )}
                        <div className="user-id">
                          <h3 className="mb-0">
                            {isSearchNameClient}
                            <a
                              className="close ms-2 cursor-pointer"
                              onClick={() => {
                                formik.setFieldValue("client_id", "");
                                handleCloseSearchClient();
                              }}
                            >
                              <i className="fal fa-times"></i>
                            </a>
                          </h3>
                          <span>{isSearchObjClient && isSearchObjClient.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="search large-input">
                    <div className="text-end">
                      <a id="addclient-link" className="h6 color-wine text-decoration-none mb-3 cursor-pointer" onClick={handleClientAddForm}>
                        <i className="fal fa-plus pe-1 small"></i> {t("New Client")}
                      </a>
                    </div>
                    <div className="input-group mb-md-3 mb-1">
                      <span className="input-group-text">
                        <i className="far fa-search"></i>
                      </span>
                      <input
                        type="text"
                        name="client_name"
                        id="salonForm-client_name"
                        className={(formik.touched && formik.touched.client_id && formik.errors && formik.errors.client_id ? "is-invalid" : "") + " form-control search-input"}
                        placeholder={t("Start typing client's name")}
                        value={isSearchNameClient}
                        onInput={(e) => {
                          formik.setFieldValue("client_id", "");
                          dispatch(clientSearchName(e.target.value));
                        }}
                        onClick={handleClickSearchClient}
                        onKeyUp={handleKeyUpSearchClient}
                        onBlur={handleOnBlurClient}
                      />
                      <a
                        className="close cursor-pointer"
                        style={{ display: isSearchNameClient ? "block" : "none" }}
                        onClick={() => {
                          formik.setFieldValue("client_id", "");
                          handleCloseSearchClient();
                        }}
                      >
                        <i className="fal fa-times"></i>
                      </a>
                    </div>
                    <div className={"search-result dropdown-box " + isSearchListClient} id="search-content">
                      <InfiniteScroll className="" dataLength={SuggetionViewClient && SuggetionViewClient.data && SuggetionViewClient.data.length ? SuggetionViewClient.data.length : "0"} next={fetchDataSuggetionListClient} scrollableTarget="search-content" hasMore={SuggetionViewClient.next_page_url ? true : false} loader={<PaginationLoader />}>
                        <ul className="p-0 m-0 list-unstyled">
                          <ClientSuggetionListView view={SuggetionViewClient} page={"saleaddForm"} formik={formik} />
                        </ul>
                      </InfiniteScroll>
                    </div>
                  </div>
                )}
                <InputField type="hidden" name="client_id" id="saleForm-client_id" />
              </div>
              <div className="complete-box text-center flex-column justify-content-center mt-md-5 mt-4">
                <div className="complete-box-wrp text-center">
                  <img src={config.imagepath + "voucher.png"} alt="" className="mb-md-4 mb-3" />
                  <h4 className="mb-2 fw-semibold">{t("There are no items added to the sale yet. Please choose one.")}</h4>
                </div>
              </div>
              <div className="p-4 newsale-probox">
                <div className="product-box mt-0 mb-3">
                  <div className="product-header" id="#checkout-probox">
                    <a href="#" className="close close d-block">
                      <i className="fal fa-times"></i>
                    </a>
                    <div className="row">
                      <div className="col-9">
                        <h4 className="mb-0 fw-semibold">Women’s Haircut</h4>
                      </div>
                      <h4 className="col-3 mb-0 text-end">$120</h4>
                    </div>
                  </div>
                  <div className=" d-block" id="checkout-probox">
                    <div className="card card-body">
                      <div className="row  align-items-center">
                        <div className="col-auto d-flex align-items-center mt-1">
                          <label htmlFor="" className="mb-0 me-3">
                            Staff
                          </label>
                          <select name="" id="" className="form-control">
                            <option>Amanda Jones</option>
                            <option>Amanda Jones demo</option>
                          </select>
                        </div>
                        <div className="col-auto price-input d-flex align-items-center mt-1">
                          <label htmlFor="" className="mb-0 me-3">
                            Cost
                          </label>
                          <input type="text" defaultValue="$120" className="form-control" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-box mt-0 mb-3 ps-2">
                  <div className="product-header" id="#checkout-probox">
                    <a href="#" className="close d-block">
                      <i className="fal fa-times"></i>
                    </a>
                    <div className="d-flex">
                      <div className="pro-img">
                        <img src="assets/images/product-img.png" alt="" />
                      </div>
                      <div className="pro-content">
                        <div className="row">
                          <div className="col-9">
                            <h4 className="mb-2 fw-semibold">Women’s Haircut</h4>
                            <div className="qty d-flex align-items-center">
                              <label htmlFor="" className="mb-0 me-3">
                                Qty
                              </label>
                              <input type="text" defaultValue="1" className="form-control" />
                            </div>
                          </div>
                          <h4 className="col-3 mb-0 text-end">$120</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto p-4">
                <TextareaField type="text" name="notes" placeholder={t("Add a note...")} value={formik.values.notes} label={""} className="form-control lg" controlId="salonForm-notes" />
              </div>
              <div className="full-screen-drawer-footer payment-option">
                <div className="px-4 d-flex py-3 total">
                  <span className="h2 pe-2 mb-0">Total</span>
                  <span className="h2 text-end ms-auto mb-0">$120</span>
                </div>
                <div className="p-4">
                  <div className="row">
                    <div className="col">
                      <a href="#" id="payment-link" className="btn-dark btn-lg w-100">
                        Paid by Credit Card
                      </a>
                    </div>
                    <div className="col">
                      <a href="#" className="btn-dark btn-lg w-100">
                        Paid by Cash
                      </a>
                    </div>
                    <div className="col-lg mt-lg-0 mt-2">
                      <a href="#" className="btn-dark btn-lg w-100 pay-voucher">
                        Pay by Voucher
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="full-screen-drawer-footer" style={{ display: "none" }} id="paybycreditcard">
                <ul className="list-unstyled mb-0">
                  <li className="px-4 d-flex py-3 border-bottom">
                    <span className="h3 pe-2 mb-0">Total</span>
                    <span className="h3 text-end ms-auto mb-0">$120</span>
                  </li>
                  <li className="px-4 d-flex py-3 border-bottom">
                    <span className="h3 pe-2 mb-0">Payment by Credit Card</span>
                    <span className="h3 text-end ms-auto mb-0">$120</span>
                  </li>
                  <li className="px-4 d-flex py-3 border-bottom">
                    <span className="h3 pe-2 mb-0 fw-semibold">Balance</span>
                    <span className="h3 text-end ms-auto mb-0 fw-semibold">$0</span>
                  </li>
                </ul>
                <div className="p-4">
                  <a href="#" id="salecomplete-invoice-link" className="w-100 btn btn-lg">
                    Click To Complete Sale
                  </a>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading && <span className="spinner-border spinner-border-sm"></span>}
                {t("Save")}
              </button>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default SaleAddForm;

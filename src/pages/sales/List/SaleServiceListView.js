import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { ucfirst } from "../../../helpers/functions";
import { SaleServiceToCartApi } from "store/slices/saleSlice";

const SaleServiceListView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const view = props.view;
  const searchname = props.searchname;
  const objectData = view && view.data ? view.data : view;

  const handleServiceClick = (e) => {
    const servicedata = JSON.parse(e.currentTarget.dataset.obj);
    const service_id = servicedata.id;
    dispatch(SaleServiceToCartApi({ service_id: service_id }));
  };
  return (
    <>
      <div className="accordion" id="accordionExample">
        {objectData &&
          Object.keys(objectData).map((item) => {
            let category_name = objectData[item].name;
            let servicesData = objectData[item].services;
            if (servicesData) {
              return (
                <div className="accordion-item mb-md-4 mb-3" key={item}>
                  <h2 className="accordion-header" id={`heading${item}`}>
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item}`} aria-expanded="false" aria-controls={`collapse${item}`}>
                      {ucfirst(category_name)}
                    </button>
                  </h2>
                  <div id={`collapse${item}`} className={"accordion-collapse collapse " + (searchname ? "show" : "")} aria-labelledby={`heading${item}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body p-0">
                      <ul className="list-unstyled mb-0">
                        {Object.keys(servicesData).map((itemservice) => {
                          let service_name = servicesData[itemservice].name;
                          let service_duration = servicesData[itemservice].duration;
                          // let service_price = servicesData[itemservice].serviceprice;
                          // let generalPrice = service_price;
                          // let gprice = generalPrice.length === 1 && generalPrice[0].price;
                          // let add_on_price = generalPrice.length === 1 ? generalPrice[0].add_on_price : "0.00";
                          // let totalprice = parseFloat(gprice) + parseFloat(add_on_price);
                          return (
                            <li key={item + itemservice} className="cursor-pointer" data-obj={JSON.stringify(servicesData[itemservice])} onClick={handleServiceClick}>
                              <div className="row">
                                <div className="col-md-6">
                                  <label htmlFor="" className="mb-0 fw-semibold">
                                    {ucfirst(service_name)}
                                  </label>
                                </div>
                                <div className="col-md-3 col-6 time">{`${service_duration} ${t("Mins")}`}</div>
                                {/* <div className="col-md-3 col-6 price text-end">${totalprice}</div> */}
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};

SaleServiceListView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  searchname: PropTypes.string,
  id: PropTypes.string,
};

export default SaleServiceListView;

import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { useTranslation } from "react-i18next";
import { ucfirst } from "../../../helpers/functions";
import { swalConfirm } from "../../../component/Sweatalert2";
import { OpenEditMembershipForm, MembershipDeleteApi, MembershipDetailApi } from "../../../store/slices/membershipSlice";
import { checkaccess } from "helpers/functions";
import { SaleMembershipToCartApi, openAddSaleForm, SaleTabView } from "store/slices/saleSlice";

const MembershipGridView = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const view = props.view;
  const role_id = props.role_id;
  const access = props.access;
  // const view = useSelector((state) => state.membership.isView);

  const objectData = view && view.data ? view.data : view;
  const handleMembershipDelete = (e) => {
    const propsobj = JSON.parse(e.currentTarget.dataset.obj);
    const name = ucfirst(propsobj.name);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete this membership?"), message: name, confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(MembershipDeleteApi({ id: propsobj.id }));
    }
  };

  const handleEditForm = (e) => {
    const id = e.currentTarget.closest(".membership-grid").dataset.id;
    dispatch(MembershipDetailApi({ id })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        dispatch(OpenEditMembershipForm());
      }
    });
  };
  const handleMembershipClick = (e) => {
    const membership_id = e.currentTarget.closest(".membership-grid").dataset.id;
    dispatch({ type: "sale/reset" });
    dispatch(openAddSaleForm());
    dispatch(SaleTabView("memberships"));
    dispatch(SaleMembershipToCartApi({ membership_id: membership_id }));
  };
  return (
    <>
      {objectData &&
        Object.keys(objectData).map((item) => {
          let id = objectData[item].id;
          let name = objectData[item].name;
          let cost = objectData[item].cost;
          let credit = objectData[item].credit;
          return (
            <div className="membership-grid box-image-cover" key={item} data-id={id}>
              <div className="tabs-image user-initial mx-auto">
                {`$${credit}`} <p className="text-dark mb-0">{t("Credit")}</p> {`$${cost}`} <p className="text-dark mb-0">{t("Cost")}</p>
              </div>
              <div className="image-content">
                <h5 className="fw-semibold mb-3">{name}</h5>
                <div className="membership-action">
                  <a className="edit me-1 cursor-pointer" onClick={handleEditForm}>
                    {t("Edit")}
                  </a>
                  <a id="salemembership-link" className="sell me-1 cursor-pointer" onClick={handleMembershipClick}>
                    {t("Sell")}
                  </a>
                  <a className="delete cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleMembershipDelete}>
                    <i className="fas fa-trash text-sm"></i>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
MembershipGridView.propTypes = {
  view: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  access: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  id: PropTypes.string,
  role_id: PropTypes.number,
};
export default MembershipGridView;

import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { openDocumentDrawer } from "store/slices/clientdocumentSlice";
import config from "../../../../config";
import DocumentDrawer from "./DocumentDrawer";

const Documents = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <>
      <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
        <div className="complete-box-wrp text-center">
          <img src={config.imagepath + "docs.png"} alt="" className="mb-md-4 mb-3" />
          <h5 className="mb-2 fw-semibold">
            {t("Add documents and keep a record of your client’s treatments.")}
            <br />
            <a className="add-document cursor-pointer" onClick={() => dispatch(openDocumentDrawer())}>
              {t("Add your first document.")}
            </a>
          </h5>
        </div>
      </div>
      <DocumentDrawer />
    </>
  );
};

// Documents.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Documents;

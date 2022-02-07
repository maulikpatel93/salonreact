import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { clientdocumentGridViewApi, clientdocumentUpdateApi, clientdocumentDeleteApi } from "store/slices/clientdocumentSlice";
import config from "../../../../config";

const Documents = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const views = useSelector((state) => state.clientdocument.isGridView);
  const objectData = views && views.data ? views.data : views;

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete"), message: t("success"), confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(clientdocumentDeleteApi({ id: event.id }));
    }
  };

  return (
    <>
      {objectData.length > 0 ? (
        <>
          {Object.keys(objectData).map((item, i) => {
            let id = objectData[item].id;
            let photo_url = objectData[item].photo_url;
            let client_id = objectData[item].client_id;
            let is_profile_photo = objectData[item].is_profile_photo;
            return (
              <div className="event-box" key={i}>
                <div className="d-flex align-items-start">
                  <a >
                    <img src={config.imagepath + "pdf.png"} alt="" />
                  </a>
                  <div className="w-100 px-md-3 px-2">
                    <h6 className="mb-1">
                      <b>Consultation-Form.pdf</b>
                      Uploaded: Monday 12th July 2021
                    </h6>
                    <a href="#" className="btn btn-outline btn-sm">
                      Download
                    </a>
                  </div>
                  <a className="remove cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleClientDelete}>
                    {t("remove")}
                  </a>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        ""
      )}
    </>
  );
};

// Documents.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Documents;

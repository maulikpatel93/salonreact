import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { clientphotoGridViewApi, clientphotoUpdateApi, clientphotoDeleteApi } from "store/slices/clientphotoSlice";

const Photos = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const views = useSelector((state) => state.clientphoto.isGridView);
  const objectData = views && views.data ? views.data : views;

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete"), message: t("success"), confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(clientphotoDeleteApi({ id: event.id }));
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
              <div className="col-6 mb-md-4 mb-3" key={i}>
                <div className="img-wrap">
                  <img src={photo_url} alt="" />
                </div>
                <div className="d-flex justify-content-between align-items-center flex-wrap">
                  <a
                    className={(is_profile_photo === "1" ? "disabled " : "") + "btn btn-outline-primary btn-sm cursor-pointer"}
                    onClick={() => {
                      dispatch(clientphotoUpdateApi({ id: id, client_id: client_id }));
                      dispatch(clientphotoGridViewApi({ client_id: client_id }));
                    }}
                  >
                    {t("Profile_Image")}
                  </a>
                  <a className="remove mt-md-0 mt-2 cursor-pointer" data-obj={JSON.stringify(objectData[item])} onClick={handleClientDelete}>
                    {t("remove")}
                  </a>
                </div>
              </div>
            );
          })}
        </>
      ) : ""}
    </>
  );
};

// Photos.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Photos;

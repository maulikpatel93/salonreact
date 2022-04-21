import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { ClientdocumentGridViewApi, clientdocumentDeleteApi } from "store/slices/clientdocumentSlice";
import config from "../../../../config";
import { ellipseText } from "helpers/functions";
import DocumentUpload from "component/form/DocumentUpload";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";
import { checkaccess } from "helpers/functions";

const Documents = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useSelector((state) => state.auth);
  const currentUser = auth.user;
  const role_id = currentUser && currentUser.role_id;
  const access = useSelector((state) => state.salonmodule.isAccess);
  const detail = useSelector((state) => state.client.isDetailData);
  const documentViews = useSelector((state) => state.clientdocument.isGridView);
  const documentObjectData = documentViews && documentViews.data ? documentViews.data : documentViews;

  const fetchDataPhotoList = () => {
    dispatch(ClientdocumentGridViewApi({ client_id: detail.id, next_page_url: documentViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("Are you sure want to delete?"), message: t("Success"), confirmButtonText: t("Yes, delete it!") });
    if (confirmbtn == true) {
      dispatch(clientdocumentDeleteApi({ id: event.id }));
    }
  };
  return (
    <>
      <div className="drawer-header">
        <h2 className="mb-4 pe-md-5 mb-lg-5">
          {t("Documents")} {checkaccess({ name: "create", role_id: role_id, controller: "clientdocuments", access }) && <DocumentUpload name="document" className="btn btn-outline btn-sm ms-2" accept="image/*" label={t("Add Document")} page="client-adddocumentform" controlId="clientForm-document" client_id={detail.id} />}
        </h2>
      </div>
      <div className="content-wrp">
        <InfiniteScroll className="row gx-0" dataLength={documentObjectData && documentObjectData.length ? documentObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="documentlist" hasMore={documentViews.next_page_url ? true : false} loader={<PaginationLoader />}>
          {documentObjectData.length > 0 ? (
            <>
              {Object.keys(documentObjectData).map((item, i) => {
                //   let id = documentObjectData[item].id;
                //   let client_id = documentObjectData[item].client_id;
                let document = documentObjectData[item].document;
                let document_url = documentObjectData[item].document_url;
                let updated_at = documentObjectData[item].updated_at;
                let ext = document.split(".").pop();
                return (
                  <div className="event-box" key={i}>
                    <div className="d-flex align-items-start">
                      <a>
                        <img src={config.imagepath + (ext === "pdf" ? "pdf.png" : "doc.png")} alt="" />
                      </a>
                      <div className="w-100 px-md-3 px-2">
                        <h6 className="mb-1">
                          <b>{ellipseText(document, "10")}</b>
                        </h6>
                        <p className="mb-2">
                          {t("uploaded")}: {updated_at}
                        </p>
                        {checkaccess({ name: "download", role_id: role_id, controller: "clientdocuments", access }) && (
                          <a href={document_url} target="_blank" download={document} className="btn btn-outline btn-sm">
                            {t("Download")}
                          </a>
                        )}
                      </div>
                      {checkaccess({ name: "delete", role_id: role_id, controller: "clientdocuments", access }) && (
                        <a className="remove cursor-pointer" data-obj={JSON.stringify(documentObjectData[item])} onClick={handleClientDelete}>
                          {t("Remove")}
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="complete-box text-center d-flex flex-column justify-content-center mt-xl-4">
              <div className="complete-box-wrp text-center">
                <img src={config.imagepath + "docs.png"} alt="" className="mb-md-4 mb-3" />
                <h5 className="mb-2 fw-semibold">
                  {t("Add documents and keep a record of your client’s treatments.")}
                  <br />
                  {checkaccess({ name: "create", role_id: role_id, controller: "clientdocuments", access }) && <DocumentUpload name="document" className="" accept="image/*" label={t("Add your first document.")} page="client-adddocumentform-circle" controlId="clientForm-document" client_id={detail.id} />}
                  {/* <a
              className="add-document cursor-pointer"
              onClick={() => }
            >
              {t("Add your first document.")}
            </a> */}
                </h5>
              </div>
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

// Documents.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default Documents;

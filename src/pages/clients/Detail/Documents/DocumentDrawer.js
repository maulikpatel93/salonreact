import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// import PropTypes from "prop-types";
// import config from "../../../../config";
import { swalConfirm } from "../../../../component/Sweatalert2";
import { clientdocumentGridViewApi, clientdocumentDeleteApi, closeDocumentDrawer } from "store/slices/clientdocumentSlice";
import config from "../../../../config";
import { ellipseText } from "helpers/functions";
import DocumentUpload from "component/form/DocumentUpload";
import InfiniteScroll from "react-infinite-scroll-component";
import PaginationLoader from "component/PaginationLoader";

const DocumentDrawer = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const rightDrawerOpened = useSelector((state) => state.clientdocument.isDocumentDrawer);
  const documentViews = useSelector((state) => state.clientdocument.isGridView);
  const documentObjectData = documentViews && documentViews.data ? documentViews.data : documentViews;
  const detail = useSelector((state) => state.client.isDetailData);
  
  const fetchDataPhotoList = () => {
    dispatch(clientdocumentGridViewApi({ client_id: detail.id, next_page_url: documentViews.next_page_url }));
  };

  const handleClientDelete = (e) => {
    const event = JSON.parse(e.currentTarget.dataset.obj);
    let confirmbtn = swalConfirm(e.currentTarget, { title: t("are_you_sure_delete"), message: t("success"), confirmButtonText: t("yes_delete_it") });
    if (confirmbtn == true) {
      dispatch(clientdocumentDeleteApi({ id: event.id }));
    }
  };

  return (
    <>
      <div className={"drawer adddoc-drawer " + rightDrawerOpened}>
        <div className="drawer-wrp position-relative">
          <div className="drawer-header">
            <h2 className="mb-4 pe-md-5 pe-3">
              {t("documents")} <DocumentUpload name="document" className="btn btn-outline btn-sm ms-2" accept="image/*" label={t("add_document")} page="client-adddocumentform" controlId="clientForm-document" client_id={detail.id} />
            </h2>
            <a className="close" onClick={() => dispatch(closeDocumentDrawer())}>
              <img src={config.imagepath + "close-icon.svg"} alt="" />
            </a>
          </div>
          <div className="drawer-body" id="documentlist">
            <InfiniteScroll className="" dataLength={documentObjectData && documentObjectData.length ? documentObjectData.length : "0"} next={fetchDataPhotoList} scrollableTarget="documentlist" hasMore={documentViews.next_page_url ? true : false} loader={<PaginationLoader />}>
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
                            <a href={document_url} target="_blank" download={document} className="btn btn-outline btn-sm">
                              {t("Download")}
                            </a>
                          </div>
                          <a className="remove cursor-pointer" data-obj={JSON.stringify(documentObjectData[item])} onClick={handleClientDelete}>
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
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
};

// Documents.propTypes = {
//   // props: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
// };

export default DocumentDrawer;

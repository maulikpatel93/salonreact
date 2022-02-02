import config from "../../../config";
const EditTimeForm = (e) => {
  return (
    <form>
      <div className="p-md-4 p-3">
        <h6 className="fw-semibold text-start mb-3">Set start and end time</h6>
        <div className="d-flex align-items-center">
          <input type="text" className="start-time form-control" />
          <span className="px-md-2 px-1">to</span>
          <input type="text" className="start-time form-control" />
          <button type="submit" className="btn ms-md-3 ms-1">
            {t("Update")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditTimeForm;

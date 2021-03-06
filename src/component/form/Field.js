import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useField, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import InputMask from "react-input-mask";
import config from "../../config";
import { selectImage, removeImage } from "../../store/slices/imageSlice";
import CustomSelect from "../../component/form/CustomSelect";
import { Field } from "formik";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
// import moment from "moment";

const FloatLabelInputField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FloatingLabel controlId={controlId} label={label} className="">
        <Form.Control {...field} {...props} isInvalid={meta.touched && !!meta.error} />
        {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
      </FloatingLabel>
    </>
  );
};

const InputField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        {field.name === "phone_number" || field.name === "business_phone_number" || field.name === "duration" ? <Form.Control as={InputMask} {...field} {...props} isInvalid={meta.touched && !!meta.error} /> : <Form.Control {...field} {...props} isInvalid={meta.touched && !!meta.error} />}
        {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

const InlineInputField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="d-flex">
        <Form.Label className="mb-0 me-3">{label}</Form.Label>
        {field.name === "phone_number" || field.name === "business_phone_number" || field.name === "duration" ? <Form.Control as={InputMask} {...field} {...props} isInvalid={meta.touched && !!meta.error} id={controlId} /> : <Form.Control {...field} {...props} isInvalid={meta.touched && !!meta.error} id={controlId} />}
      </div>
      {meta.touched && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {meta.error}
        </Form.Control.Feedback>
      )}
    </>
  );
};

const TextareaField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="textarea" rows={3} {...field} {...props} isInvalid={meta.touched && !!meta.error} />
        {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

const SelectField = ({ label, controlId, options, ...props }) => {
  const [field, meta] = useField(props);
  let List =
    options.length > 0 &&
    options.map((item, i) => {
      return (
        <option key={i} value={item.value}>
          {item.label}
        </option>
      );
    });
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        {label === "0" ? "" : <Form.Label>{label}</Form.Label>}
        <Form.Control as="select" {...field} {...props} isInvalid={meta.touched && !!meta.error}>
          {props.placeholder && (
            <option key="0" value="">
              {props.placeholder}
            </option>
          )}
          {List}
        </Form.Control>
        {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};
const CheckboxField = ({ label, controlId, ...props }) => {
  const [field] = useField(props);
  const checked = field.value === 1 ? true : "";
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        {props.bsPrefix && props.bsPrefix !== undefined ? (
          <Form.Check type={"checkbox"} id={controlId} bsPrefix={props.bsPrefix}>
            <Form.Check.Input {...field} {...props} label={label} checked={checked} />
            <Form.Check.Label>{label}</Form.Check.Label>
          </Form.Check>
        ) : (
          <Form.Check.Input {...field} {...props} label={label} type="checkbox" id={controlId} checked={checked} />
        )}
      </Form.Group>
    </>
  );
};

const InputCheckbox = ({ label, controlId, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <input {...field} {...props} type="checkbox" id={controlId} />
      <label htmlFor={controlId} className="">
        {label}
      </label>
    </>
  );
};

const SwitchField = ({ label, controlId, ...props }) => {
  const [field] = useField(props);
  const checked = field.value === 1 ? true : "";
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Check {...field} {...props} label={label} type="switch" id={controlId} checked={checked} />
      </Form.Group>
    </>
  );
};
const InputFieldImage = ({ label, controlId, page, ...props }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();
  const image = useSelector((state) => state.image);
  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
      if (SUPPORTED_FORMATS.includes(e.target.files[0].type)) {
        dispatch(selectImage({ name: e.target.files[0].name, size: e.target.files[0].size, type: e.target.files[0].type, url: URL.createObjectURL(e.target.files[0]) }));
        setFieldValue(props.name, e.target.files[0]);
      }
    }
    e.target.value = null;
  };
  field.onChange = imageChange;
  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setFieldValue(props.name, "");
    dispatch(removeImage());
  };
  return (
    <>
      {page === "client-addform" ? (
        <Form.Group className="" controlId={controlId}>
          <div className="insert-photo d-flex flex-column justify-content-center align-items-center ms-md-auto">
            <img src={image && image.selected ? image.url : config.imagepath + "addphoto-box.png"} alt="" className={image && image.selected ? "image-preview mb-3" : "mb-3"} />
            <button type="button" className={image && image.selected ? "d-none" : "btn btn-primary btn-sm position-relative"}>
              <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={meta.touched && !!meta.error} />
              {label}
            </button>
            <button type="button" className={image && image.selected ? "btn btn-primary btn-sm position-relative" : "d-none"} onClick={removeSelectedImage}>
              {t("Remove")}
            </button>
            {meta.touched && (
              <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
                {meta.error}
              </Form.Control.Feedback>
            )}
          </div>
        </Form.Group>
      ) : (
        ""
      )}

      {page === "staff-form" ? (
        <>
          <Form.Group className="" controlId={controlId}>
            <div className="input-file position-relative ms-md-auto d-flex align-content-center flex-wrap justify-content-center">
              <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={meta.touched && !!meta.error} className={image && image.selected ? "input-photo d-none" : "input-photo"} />
              <img src={image && image.selected ? image.url : config.imagepath + "addphoto.png"} alt="" className={image && image.selected ? "image-preview mb-3" : "mb-3"} />
              <span className={"cursor-pointer " + (image && image.selected ? "d-block" : "d-none")} onClick={removeSelectedImage}>
                {t("Remove")}
              </span>
              <span className={"cursor-pointer " + (image && image.selected ? "d-none" : "d-block")}>{label}</span>
            </div>
            <div className="d-flex align-content-center flex-wrap justify-content-center ms-lg-5">
              {meta.touched && (
                <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
                  {meta.error}
                </Form.Control.Feedback>
              )}
            </div>
          </Form.Group>
        </>
      ) : (
        ""
      )}

      {page === "supplier-form" || page === "product-form" || page === "business-form" ? (
        <>
          <Form.Group className="" controlId={controlId}>
            <div className="input-file position-relative d-flex align-content-center flex-wrap justify-content-center ms-lg-5">
              <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={meta.touched && !!meta.error} className={image && image.selected ? "input-photo d-none" : "input-photo"} />
              <img src={image && image.selected ? image.url : config.imagepath + "addphoto.png"} alt="" className={image && image.selected ? "image-preview mb-3" : "mb-3"} />
              <span className={"cursor-pointer " + (image && image.selected ? "d-block" : "d-none")} onClick={removeSelectedImage}>
                {t("Remove")}
              </span>
              <span className={"cursor-pointer " + (image && image.selected ? "d-none" : "d-block")}>{label}</span>
            </div>
            <div className="d-flex align-content-center flex-wrap justify-content-center ms-lg-5">
              <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
                {meta.error}
              </Form.Control.Feedback>
            </div>
          </Form.Group>
        </>
      ) : (
        // <div className="insert-photo d-flex flex-column justify-content-center align-items-center ms-md-auto">
        //   <img src={image && image.selected ? image.url : config.imagepath + "addphoto-box.png"} alt="" className="" />
        //   <button type="button" className={image && image.selected ? "d-none" : "btn btn-sm position-relative"}>
        //     <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={meta.touched && !!meta.error} />
        //     {label}
        //   </button>
        //   <button type="button" className={image && image.selected ? "btn btn-sm position-relative" : "d-none"} onClick={removeSelectedImage}>
        //     {t("Remove")}
        //   </button>
        //   <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
        //     {meta.error}
        //   </Form.Control.Feedback>
        // </div>
        ""
      )}
    </>
  );
  //Multiple Formik image
  // validationSchema={Yup.object({
  //profile:Yup.array().min(1,"select at least 1 file")
  // })}
  // let data = new FormData();
  //       values.profile.forEach((photo, index) => {
  //         data.append(`photo${index}`, values.profile[index]);
  //       });
  // <input
  //   id="file"
  //   name="profile"
  //   type="file"
  //   onChange={(event) => {
  //     const files = event.target.files;
  //     let myFiles = Array.from(files);
  //     formik.setFieldValue("profile", myFiles);
  //   }}
  //   multiple
  // />;
};

const ReactSelectField = ({ label, controlId, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Field {...field} {...props} options={options} component={CustomSelect} isInvalid={meta.touched && !!meta.error} className={"custom-select " + (meta.touched && meta.error ? "is-invalid" : "")} controlId={controlId} />
        {meta.touched && (
          <Form.Control.Feedback type="invalid" className="d-block">
            {meta.error}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    </>
  );
};

const MapAddressField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend" className="">
            <i className="far fa-search"></i>
          </InputGroup.Text>
          <Form.Control {...field} {...props} isInvalid={meta.touched && !!meta.error} aria-describedby="inputGroupPrepend" className="search-input" />
          {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
        </InputGroup>
      </Form.Group>
    </>
  );
};

const DatePickerField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as={DatePicker} {...field} {...props} isInvalid={meta.touched && !!meta.error} inputClass={props.classname} plugins={[<TimePicker hideSeconds style={{ width: "auto" }} />]} disableDayPicker format="hh:mm A" />
        {meta.touched && <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>}
      </Form.Group>
    </>
  );
};

FloatLabelInputField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

InputField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

InlineInputField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

SelectField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

ReactSelectField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

MapAddressField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

TextareaField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

CheckboxField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  className: PropTypes.string,
  bsPrefix: PropTypes.string,
};

InputCheckbox.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  className: PropTypes.string,
  isServiceChecked: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

SwitchField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
};

InputFieldImage.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  name: PropTypes.string,
  page: PropTypes.string,
};

DatePickerField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  classname: PropTypes.string,
};

export { FloatLabelInputField, InputField, InlineInputField, SelectField, ReactSelectField, MapAddressField, TextareaField, CheckboxField, InputCheckbox, SwitchField, InputFieldImage, DatePickerField };

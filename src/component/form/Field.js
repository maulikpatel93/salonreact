import React from "react";
import PropTypes from 'prop-types';
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
import { Field } from "formik"

const FloatLabelInputField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <FloatingLabel controlId={controlId} label={label} className="mb-3">
        <Form.Control {...field} {...props} isInvalid={!!meta.error} />
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </FloatingLabel>
    </>
  );
};

const InputField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        {field.name === 'phone_number' ? <Form.Control as={InputMask} {...field} {...props} isInvalid={!!meta.error} /> : <Form.Control {...field} {...props} isInvalid={!!meta.error} />}
        
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

const TextareaField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="textarea" rows={3} {...field} {...props} isInvalid={!!meta.error} />
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
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
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control as="select" {...field} {...props} isInvalid={!!meta.error}>
          <option key="0" value="">
            {props.placeholder}
          </option>
          {List}
        </Form.Control>
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
const CheckboxField = ({ label, controlId, ...props }) => {
  const [field ] = useField(props);
  const checked = field.value === 1 ? true : "";
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Check {...field} {...props} label={label} type="checkbox" id={controlId} checked={checked} />
      </Form.Group>
    </>
  );
};

const SwitchField = ({ label, controlId, ...props }) => {
  const [field ] = useField(props);
  const checked = field.value === 1 ? true : "";
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
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
      <Form.Group className="mb-3" controlId={controlId}>
        {page === "client-addform" ? (
          <div className="insert-photo d-flex flex-column justify-content-center align-items-center ms-md-auto">
            <img src={image && image.selected ? image.url : config.imagepath + "addphoto-box.png"} alt="" className="mb-3" />
            <button type="button" className={image && image.selected ? "d-none" : "btn btn-sm position-relative"}>
              <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={!!meta.error} />
              {label}
            </button>
            <button type="button" className={image && image.selected ? "btn btn-sm position-relative" : "d-none"} onClick={removeSelectedImage}>
              {t("remove")}
            </button>
            <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
              {meta.error}
            </Form.Control.Feedback>
          </div>
        ) : (
          ""
        )}

        {page === "supplier-form" || page === "product-form" ? (
          <>
            <div className="input-file position-relative d-flex align-content-center flex-wrap justify-content-center ms-lg-5">
              <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={!!meta.error} className={image && image.selected ? "input-photo d-none" : "input-photo"} />
              <img src={image && image.selected ? image.url : config.imagepath + "addphoto.png"} alt="" className="mb-3" />
              <span className={"cursor-pointer " + (image && image.selected ? "d-block" : "d-none")} onClick={removeSelectedImage}>
                {t("remove")}
              </span>
              <span className={"cursor-pointer " + (image && image.selected ? "d-none" : "d-block")}>{label}</span>
            </div>
            <div className="d-flex align-content-center flex-wrap justify-content-center ms-lg-5">
              <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
                {meta.error}
              </Form.Control.Feedback>
            </div>
          </>
        ) : (
          // <div className="insert-photo d-flex flex-column justify-content-center align-items-center ms-md-auto">
          //   <img src={image && image.selected ? image.url : config.imagepath + "addphoto-box.png"} alt="" className="mb-3" />
          //   <button type="button" className={image && image.selected ? "d-none" : "btn btn-sm position-relative"}>
          //     <Form.Control type="file" onChange={field.onChange} {...props} isInvalid={!!meta.error} />
          //     {label}
          //   </button>
          //   <button type="button" className={image && image.selected ? "btn btn-sm position-relative" : "d-none"} onClick={removeSelectedImage}>
          //     {t("remove")}
          //   </button>
          //   <Form.Control.Feedback type="invalid" className={image && image.selected ? "d-none" : "d-block"}>
          //     {meta.error}
          //   </Form.Control.Feedback>
          // </div>
          ""
        )}
      </Form.Group>
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
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Field {...field} {...props} options={options} component={CustomSelect} isInvalid={!!meta.error} className={"custom-select " + (meta.touched && meta.error ? "is-invalid" : "")} />
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

const MapAddressField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend" className="bg-white text-secondary">
            <i className="far fa-search"></i>
          </InputGroup.Text>
          <Form.Control {...field} {...props} isInvalid={!!meta.error} aria-describedby="inputGroupPrepend" className="search-input" />
          <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </>
  );
};

const DatePickerField = ({ label, controlId, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-3" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control {...field} {...props} isInvalid={!!meta.error} />
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

FloatLabelInputField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

InputField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

SelectField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

ReactSelectField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

MapAddressField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

TextareaField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

CheckboxField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

SwitchField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

InputFieldImage.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string,
  name: PropTypes.string,
  page: PropTypes.string
};

DatePickerField.propTypes = {
  label: PropTypes.string,
  controlId: PropTypes.string
};

export { FloatLabelInputField, InputField, SelectField, ReactSelectField, MapAddressField, TextareaField, CheckboxField, SwitchField, InputFieldImage, DatePickerField };

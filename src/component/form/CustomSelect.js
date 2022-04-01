import React, { useRef } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { servicePriceApi } from "store/slices/serviceSlice";
import { useDispatch } from "react-redux";
import { staffOptions } from "store/slices/staffSlice";
import { SaleServiceToCartApi } from "store/slices/saleSlice";
// interface Option {
//   label: string;
//   value: string;
// }

// interface CustomSelectProps extends FieldProps {
//   options: OptionsType;
//   isMulti?: boolean;
//   className?: string;
//   placeholder?: string;
// }

export const CustomSelect = ({ className, placeholder, field, form, options, isMulti = false, controlId, service_id = "", page = "" }) => {
  const selectRef = useRef();
  const dispatch = useDispatch();
  const onChange = (option) => {
    if (field.name === "service_id" && controlId === "appointmentForm-service_id") {
      dispatch(servicePriceApi({ service_id: option && option.value })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          // form.setFieldValue("staff_id", "");
          let service = action.payload;
          dispatch(staffOptions({ option: { valueField: "users.id", labelField: "CONCAT(users.last_name,' ',users.first_name)" }, service_id: service.id }));
        }
      });
    }
    if ((field.name === "staff_id" && controlId === "appointmentForm-staff_id") || page === "newsale") {
      dispatch(servicePriceApi({ staff_id: option && option.value, service_id: service_id && service_id })).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          let service = action.payload;
          if (service && service.serviceprice && page === "newsale") {
            dispatch(SaleServiceToCartApi({ service_id: service_id, serviceprice: service.serviceprice }));
          }
          // let service = action.payload;
          // let serviceprice = service && service.serviceprice && service.serviceprice[0] && service.serviceprice[0].price ? service.serviceprice[0].price : "";
          // console.log(service.serviceprice && service.serviceprice[0].price);
          // form.setFieldValue("cost", serviceprice);
        }
      });
    }
    if (option) {
      form.setFieldValue(field.name, isMulti ? option.map((item) => item.value) : option.value);
    } else {
      form.setFieldValue(field.name, isMulti ? "" : "");
    }
  };

  const getValue = () => {
    if (options) {
      return isMulti ? options.filter((option) => field.value.indexOf(option.value) >= 0) : options.find((option) => option.value === field.value);
    } else {
      return isMulti ? [] : "";
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "",
      borderWidth: state.isFocused ? "0" : "0",
    }),
    control: (provided, state) => ({
      ...provided,
      borderWidth: state.isFocused ? "0px" : "1px",
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 3 }),
    menu: (provided) => ({ ...provided, zIndex: 3 }),
  };
  return (
    <>
      <Select
        ref={selectRef}
        className={className}
        id={controlId}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options ? options : []}
        isMulti={isMulti}
        isClearable
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            border: "1px",
            primary25: "#F4EEEB",
            primary: "#8C1C4D",
          },
        })}
      />
    </>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  field: PropTypes.object,
  form: PropTypes.object,
  options: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  isMulti: PropTypes.bool,
  controlId: PropTypes.string,
  service_id: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
  page: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.object]),
};

export default CustomSelect;

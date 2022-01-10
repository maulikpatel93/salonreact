import React from "react";
import PropTypes from 'prop-types';
import Select from "react-select";

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

export const CustomSelect = ({ className, placeholder, field, form, options, isMulti = false, controlId }) => {
  const onChange = (option) => {
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
        className={className}
        id={controlId}
        name={field.name}
        value={getValue()}
        onChange={onChange}
        placeholder={placeholder}
        options={options}
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
  controlId: PropTypes.string
};

export default CustomSelect;

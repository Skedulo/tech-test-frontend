import React, { useState } from "react"
import PropTypes from 'prop-types'
import { SearchableSelectFieldStyle } from "./style"
import LabelField from "../LabelField";
import moment from 'moment';

const SearchableSelectField = (props) => {
  const {
    field,
    form,
    options,
    disabled,
    label,
    placeholder,
    theme,
    className,
    isLoading,
  } = props;

  const { name, value, required } = field;
  const { errors, touched } = form;
  const [active, setActive] = useState(false);
  const selectedOption = options.find(option => option.id === value);

  const [inputValue, setInputValue] = useState(selectedOption && selectedOption.name);
  const [selectedOptions, setSelectedOptions] = useState(options);

  const handleActive = (active) => {
    setActive(active);
  }

  const handleInputChanged = (event) => {
    const value = event.target.value;
    updateUI(value);
  }

  const handleOptionClicked = (value) => {
    updateUI(value);
    setActive(false);
  }
  const updateUI = (value) => {
    setInputValue(value);
    setActive(true);
    const selectedList = options.filter((option) => {
      return option.name.toLowerCase().includes(value.toLowerCase())
    });
    setSelectedOptions(selectedList);
    sendEventFormik(value);
  }

  const sendEventFormik = (value) => {
    const changeEvent = {
      target: {
        name: name,
        value: value
      }
    };
    field.onChange(changeEvent)
  }
  const activeClass = active ? 'active' : '';
  const disabledClass = disabled ? 'disabled' : '';

  return (
    <SearchableSelectFieldStyle theme={theme} className={`${className} ${disabledClass} select-search`}>
      <div className={`${active ? 'active' : ''} select-wrapper`} 
        onMouseLeave={() => handleActive(false)}
        onMouseEnter={() => handleActive(true)}
      >
        <input
          className="select-input"
          placeholder={placeholder}
          id={name}
          name={name}
          {...field}
          value={inputValue}
          autoComplete="off"
          onChange={handleInputChanged}
          disabled={disabled}
        />
        { isLoading ? (
          <div className={`${activeClass} select-list`}>
            <div className={`${activeClass} select-item no-results`}>
              Loading...
            </div>
          </div>
        ) : (
          <div className={`${activeClass} select-list`}>
          {
            selectedOptions.map((option, index) => {
              return (
                <div 
                  className={`${activeClass} select-item`}
                  key={index}
                  value={option.id}
                  onClick={() => handleOptionClicked(option.name)}
                >
                  {option.name}
                  <div className="select-info">
                    <span className="select-contact">{option.contact && option.contact.name}</span>
                    <span className="select-time">{moment(option.start).format("MMM DD YYYY")} - {moment(option.end).format("MMM DD YYYY")}</span>
                  </div>
                </div>
              )
            })
          }
          {
            selectedOptions.length === 0 && (
              <div 
                className={`${activeClass} select-item no-results`}
              >
                No matches found
              </div>
            )
          }
          </div>
        )} 
      </div>
      <LabelField
        name={name}
        required={required}
        label={label}
        error={errors[name]}
        touched={touched[name]}
        active={true}
        theme={theme}
      />
    </SearchableSelectFieldStyle>
  );
}

SearchableSelectField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  theme: PropTypes.object,
}

SearchableSelectField.defaultProps = {
  options: [],
  disabled: false,
  isLoading: false,
  label: '',
  placeholder: '',
  theme: {}
}

export default SearchableSelectField;
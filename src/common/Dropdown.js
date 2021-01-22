import React from "react";
import RNPickerSelect from "react-native-picker-select";

const Dropdown = ({ itemData, onValueChange, ...other }) => {
  return (
    <RNPickerSelect
      fixAndroidTouchableBug
      {...other}
      onValueChange={onValueChange}
      items={itemData}
    />
  );
};

export default Dropdown;

import React from "react";

import RNPickerSelect from "react-native-picker-select";

const Dropdown = ({ itemData, onValueChange }) => {
  return <RNPickerSelect onValueChange={onValueChange} items={itemData} />;
};

export default Dropdown;

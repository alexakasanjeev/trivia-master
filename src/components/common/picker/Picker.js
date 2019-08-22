// @flow

import React, { useState } from 'react';

import PickerComponent from './components/PickerComponent';

type Props = {
  pickerSelected: Object,
};

const Picker = ({ pickerSelected }: Props) => {
  const [itemSelected, setItemSelected] = useState({
    value: pickerSelected.itemSelected.value,
    label: pickerSelected.itemSelected.label,
  });

  const { onSelectParamItem, selectionLabel, values } = pickerSelected;

  return (
    <PickerComponent
      onPressConfirmButton={() => onSelectParamItem(itemSelected)}
      selectionLabel={selectionLabel}
      onSelectItem={setItemSelected}
      itemSelected={itemSelected}
      values={values}
    />
  );
};

export default Picker;

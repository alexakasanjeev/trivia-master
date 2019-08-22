import CONSTANTS from '../utils/constants';

const questionsType = {
  selectionLabel: 'Choose the Type',
  label: 'Type',
  field: 'type',
  values: [
    {
      label: 'Any Type',
      value: CONSTANTS.VALUES.ANY_PARAM,
    },
    {
      label: 'Multiple Choice',
      value: 'multiple',
    },
    {
      label: 'True / False',
      value: 'boolean',
    },
  ],
};

export default questionsType;

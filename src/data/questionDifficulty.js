import CONSTANTS from '../utils/constants';

const questionsDifficulty = {
  selectionLabel: 'Choose the Difficulty',
  label: 'Set Difficulty',
  field: 'difficulty',
  values: [
    {
      label: 'Any Difficulty',
      value: CONSTANTS.VALUES.ANY_PARAM,
    },
    {
      label: 'Easy',
      value: 'easy',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Hard',
      value: 'hard',
    },
  ],
};

export default questionsDifficulty;

// @flow

import React, { useState } from 'react';

import SetupQuestionsComponent from './components/SetupQuestionsComponent';
import CONSTANTS from '../../../../utils/constants';

import difficulties from '../../../../data/questionDifficulty';
import categories from '../../../../data/questionCategories';
import types from '../../../../data/questionTypes';

const DEFAULT_QUESTION_PARAMS = {
  [CONSTANTS.VALUES.AMOUNT_PARAM_FIELD]:
    CONSTANTS.VALUES.DEFAULT_AMOUNT_QUESTIONS,
  [CONSTANTS.VALUES.DIFFICULTY_PARAM_FIELD]: {
    value: CONSTANTS.VALUES.ANY_PARAM,
    label: 'Any Difficulty',
  },
  [CONSTANTS.VALUES.CATEGORY_PARAM_FIELD]: {
    value: CONSTANTS.VALUES.ANY_PARAM,
    label: 'Any Category',
  },
  [CONSTANTS.VALUES.TYPE_PARAM_FIELD]: {
    value: CONSTANTS.VALUES.ANY_PARAM,
    label: 'Any Type',
  },
};

type Navigation = {
  navigate: Function,
};

type Props = {
  LOCAL_STACK_ROUTES: Object,
  navigation: Navigation,
};

const SetupQuestions = ({ LOCAL_STACK_ROUTES, navigation }: Props) => {
  const [questionsParams, setQuestionsParams] = useState(
    DEFAULT_QUESTION_PARAMS,
  );
  const [pickerSelected, onSetPickerSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSetParamItem = (field, value) => {
    setQuestionsParams({
      ...questionsParams,
      [field]: value,
    });
  };

  const onSetPickerItem = (field, value) => {
    onSetParamItem(field, value);
    setIsModalOpen(false);
  };

  const items = [
    {
      itemSelected: questionsParams[CONSTANTS.VALUES.DIFFICULTY_PARAM_FIELD],
      onSelectParamItem: (value) => onSetPickerItem(CONSTANTS.VALUES.DIFFICULTY_PARAM_FIELD, value),
      ...difficulties,
    },
    {
      itemSelected: questionsParams[CONSTANTS.VALUES.TYPE_PARAM_FIELD],
      onSelectParamItem: (value) => onSetPickerItem(CONSTANTS.VALUES.TYPE_PARAM_FIELD, value),
      ...types,
    },
    {
      itemSelected: questionsParams[CONSTANTS.VALUES.CATEGORY_PARAM_FIELD],
      onSelectParamItem: (value) => onSetPickerItem(CONSTANTS.VALUES.CATEGORY_PARAM_FIELD, value),
      ...categories,
    },
  ];

  const onSelectPickerItem = (pickerItemSelected: Object): void => {
    onSetPickerSelected(pickerItemSelected);
    setIsModalOpen(true);
  };

  const onPressStartButton = (): void => {
    const getPickerValues = (data) => (data.value === CONSTANTS.VALUES.ANY_PARAM ? '' : data.value);

    const params = {
      difficulty: getPickerValues(questionsParams.difficulty),
      category: getPickerValues(questionsParams.category),
      type: getPickerValues(questionsParams.type),
      amount: questionsParams.amount,
    };

    navigation.navigate(LOCAL_STACK_ROUTES.QUESTIONS, {
      [CONSTANTS.PARAMS.QUESTIONS_PARAMS]: params,
    });
  };

  return (
    <SetupQuestionsComponent
      onSetNumberQuestions={(value) => onSetParamItem(CONSTANTS.VALUES.AMOUNT_PARAM_FIELD, value)}
      amountSelected={questionsParams[CONSTANTS.VALUES.AMOUNT_PARAM_FIELD]}
      onToggelModal={() => setIsModalOpen(false)}
      onPressStartButton={onPressStartButton}
      onSelectPickerItem={onSelectPickerItem}
      pickerSelected={pickerSelected}
      isModalOpen={isModalOpen}
      items={items}
    />
  );
};

export default SetupQuestions;

// @flow

type Props = {
  array: Array<Object>,
};

const shuffleArrayItems = (array: Props): Props => {
  const shuffledArray = Array.from(array);

  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }

  return shuffledArray;
};

export default shuffleArrayItems;

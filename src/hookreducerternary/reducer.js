import initializeDeck from './deck';

export const initialState = {
    cards: initializeDeck(),
    flipped: [],
    dimension: Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight),
    solved: [],
    disabled:false,
};

export function reducer(state, action) {
  const newState = Object.assign({},state);
  switch (action.type) {
    case 'setCards':
      newState.cards = action.payload;
      return newState;
    case 'setFlipped':
      newState.flipped =action.payload;
      return newState;
    case 'setDimension':
      newState.dimension = action.payload;
      return newState;
    case 'setSolved':
      newState.solved = action.payload;
      return newState;
    case 'setDisabled':
      newState.disabled = action.payload;
      return newState;
    default:
      throw new Error();
  }
}

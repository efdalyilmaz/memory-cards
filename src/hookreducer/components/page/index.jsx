import React, {  useEffect, useReducer } from 'react';
import Board from '../board';

import {reducer, initialState} from '../../reducer';


export default function Page() {

    const [state, dispatch] = useReducer(reducer, initialState);
 
    useEffect(() => {
      preloadImages();
    }, state.cards)


    const resetCards = () => {
      dispatch({type:'setFlipped', payload:[]});
      dispatch({type:'setDisabled', payload:false});
    }

    const sameCardClicked = (flipped, id) => flipped.includes(id);

    const isMatched = (id) => {
      const clickedCard = state.cards.find(card => card.id === id);
      const flippedCard = state.cards.find(card => card.id === state.flipped[0]);

      return flippedCard.type === clickedCard.type;
    }

    const handleClick = (id) => {
      debugger;
      dispatch({type:'setDisabled', payload:true});
      if(state.flipped.length === 0){
        dispatch({type:'setFlipped', payload:[id]});
        dispatch({type:'setDisabled', payload:false});
      }else{
        if(sameCardClicked(state.flipped, id)){
          return;
        }
        dispatch({type:'setFlipped', payload:[state.flipped[0],id]});
        if(isMatched(id)){
          dispatch({type:'setSolved', payload:[...state.solved, state.flipped[0], id]});
          resetCards();
        }else{
          setTimeout(resetCards, 2000);
        }
      }
    };

    const preloadImages = () => {
      state.cards.forEach( (card) => {
        const src = `/img/${card.type}.png`;
        new Image().src = src;
      });
    };
    
    return (
      
      <div>
       <h2>Can you remember where the cards are?</h2>
       <Board
       dimension={state.dimension}
       cards={state.cards}
       flipped={state.flipped}
       handleClick={handleClick}
       disabled={state.disabled}
       solved={state.solved}
       />
      </div>
    );
}
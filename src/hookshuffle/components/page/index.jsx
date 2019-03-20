import React, { useState, useEffect } from 'react';
import Board from '../board';

import initializeDeck from '../../deck';

export default function Page() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [dimension, setDimesion] = useState();
    const [solved, setSolved] = useState([]);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
      resizeBoard();
      setCards(initializeDeck());
      preloadImages();
    },
    []);

    useEffect(() => {
      preloadImages();
    }, cards)

    useEffect(() => {
      const resizeListener = window.addEventListener('resize', resizeBoard);
      return () => window.removeEventListener('resize', resizeListener);
    })

    const resizeBoard =() =>{
      setDimesion(Math.min(document.documentElement.clientWidth,document.documentElement.clientHeight));
    }

    const resetCards = () => {
      setFlipped([]);
      setDisabled(false);
    }

    const sameCardClicked = (flipped, id) => flipped.includes(id);

    const isMatched = (id) => {
      const clickedCard = cards.find(card => card.id === id);
      const flippedCard = cards.find(card => card.id === flipped[0]);

      return flippedCard.type === clickedCard.type;
    }

    const handleClick = (id) => {
      setDisabled(true);
      if(flipped.length === 0){
        setFlipped([id]);
        setDisabled(false);
      }else{
        if(sameCardClicked(flipped, id)){
          return;
        }
        setFlipped([flipped[0],id]);
        if(isMatched(id)){
          setSolved([...solved, flipped[0], id]);
          setTimeout(() => setCards(initializeDeck()), 1000);
          resetCards();
        }else{
          setTimeout(resetCards, 1000);
        }
      }
    };

    const preloadImages = () => {
      cards.forEach( (card) => {
        const src = `/img/${card.type}.png`;
        new Image().src = src;
      });
    };

    return (
      <div>
       <h2>Can you remember where the cards are?</h2>
       <Board
          dimension={dimension}
          cards={cards}
          flipped={flipped}
          handleClick={handleClick}
          disabled={disabled}
          solved={solved}
       />
      </div>
    );
}
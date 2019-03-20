import React, {useState} from 'react';
import {default as HookShuffle} from './hookshuffle/components/page';
import {default as HookReducer} from './hookreducer/components/page';
import {default as HookReducerTernary} from './hookreducerternary/components/page';

import "../node_modules/animate.css/animate.min.css"; 

export default function App() {

    const [page, setPage] = useState("");

    const onClick = (page) => {
      setPage(page);
    };

    if(page === "HookShuffle"){
      return <HookShuffle />
    }else if(page === "HookReducer"){
      return <HookReducer />
    }
    else if(page === "HookReducerTernary"){
      return <HookReducerTernary />
    }

    return (
      <div className='menu animated bounceInDown'>

        <div className='menuItem' onClick={() => onClick("HookShuffle")}>Hook Shuffle</div>
        <div className='menuItem' onClick={() => onClick("HookReducer")}>Hook Reducer</div>
        <div className='menuItem' onClick={() => onClick("HookReducerTernary")}>Hook Reducer Ternary</div>
      </div>);
}
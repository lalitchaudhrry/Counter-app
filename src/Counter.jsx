import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [error , setError] = useState("");
  const [history , setHistory]=useState([]);

  const addCount = () => {
    setCount((prevCount) => {
        const newCount = prevCount + 1;
        setHistory((prevHistory)=>[...prevHistory,newCount]);
        return newCount;
    }); 
    setError("");
};

  const decreaseCount = () => {
    if(count >0){
    setCount((prevCount) => {
        const newCount= prevCount - 1;
        setHistory((prevHistory)=>[...prevHistory,newCount]);
        return newCount;
    });
    setError("");
}
    else{
        console.log("Counter Value can not be negative."); 
        setError("Counter can not be negative value.");
    }
   
  };

  return (
    <div className="counter-container">
      <h1>Counter: {count}</h1>
      <button id="increase" onClick={addCount}>Increase</button>
      <button id="decrease" onClick={decreaseCount}>Decrease</button>
      {error && <h3 className="error-msg">{error}</h3>}
      <h2>History</h2>
      <ul className="history-list"> {history.map((value,index)=>(
        <li key={index}> Count:{value} </li>))}
        </ul>
    </div>
  );
};

export default Counter;

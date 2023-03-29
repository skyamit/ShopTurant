import { useEffect, useState } from 'react';
import './Slide.css';

function Slide() {
    const [path,setPath] = useState('/slide1.jpg');
    const [count,setCount] = useState(1);
        
    useEffect(()=>{
		if (count === 6) setCount(1);
        else if(count === 0) setCount(5);
        else setPath(val +count +ex);
    },[count]);

    const val = '/slide';
    const ex = '.jpg';
	const next = () => {
        setCount((pre) => pre + 1);
        console.log('next',path, count); 
	};
    const prev = () => {
        setCount((pre) => pre - 1);
        console.log('prev',path, count); 
	};
    return (
        <>
        <img src={path} className='slide' alt='slide' />
        <button id='next' onClick={next}>Next</button>
        <button id='prev' onClick={prev}>Prev</button>
        </>
    );
}
  
export default Slide;
import { useEffect, useState } from 'react';
import './Slide.css';
import left from '../../images/left.png';
import right from '../../images/right.png';

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
        <div className='slideDiv'>
            <img src={path} className='slide' alt='slide' />
            <img src={right} id='prev' onClick={next} alt='slide'/>
            <img src={left} id='next' onClick={prev} alt='slide'/>
            <div className='blurDiv' ></div>
        </div>
    );
}
  
export default Slide;
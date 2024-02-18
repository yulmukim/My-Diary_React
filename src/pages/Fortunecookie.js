import React, { useState } from "react";
import Logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";
import fortuneimg from '../assets/fortune.jpg';
import AA from './json/fortunedata.json';

function Fortunecookie() {
    const [result_, setResult] = useState('');
    const navigate = useNavigate();


    const NavigateToMenu = () => { // MenuPage로 이동
        navigate("/menu");  
    }

    const fortuneResult = () => {
        if (window.confirm('결과를 확인하시겠습니까?')) {
            const random = Math.floor(Math.random() * 21);
            console.log(random);
            setResult(AA.fortune[random].result);     
        } else  {
            navigate("/fortune");
        }
    }

    return(
        <div className="page">
            <img alt="title" src={Logo} className="title_img" onClick={NavigateToMenu}></img>
            <div className="fortunepage">
                <div className="fortune_title">포춘쿠키를 클릭해보세요!</div>
                <img className="fortune_cookie" src={fortuneimg} 
                onClick={fortuneResult}/>
                <div className="result">{result_}</div>
            </div>
        </div>
    );
}

export default Fortunecookie;
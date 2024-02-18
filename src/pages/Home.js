import React from 'react'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';
import Logo from '../assets/logo.png';


function Home() {
    const diaryList = useContext(DiaryStateContext);

    const navigate = useNavigate();

    const NavigateToMenu = () => { // MenuPage로 이동
        navigate("/menu");  
    }

    const NavigateToDiary = () => { // DiaryPage로 이동
        navigate("/diarypage/:id");  
    }

    return (
        <div className="body">
            <img alt="title" src={Logo} className="title_img" onClick={NavigateToMenu}/>
            <DiaryList diaryList={diaryList}/>
            <div><button className="homeaddbtn" onClick={NavigateToDiary}>새 일기 작성하기</button></div>
        </div>
    );
}

export default Home;
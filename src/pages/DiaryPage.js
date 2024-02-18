import React from "react";
import { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "../App";
import { IoMdCreate } from "react-icons/io";
import moment from "moment"
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';


export function DiaryPage() { // 다이어리 작성 페이지

    const getStringDate = (date) => {
        return date.toISOString(); // 날짜를 ISO포멧으로 리턴
    };
    
    const [content, setContent] = useState(""); // 다이어리 내용
    const [imgSrc, setImgSrc] = useState(""); // 업로드한 이미지
    const today = new Date();
    const [date, setDate] = useState(getStringDate(today)); // 날짜
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = hours + "시 " + minutes + "분";
    const contentRef = useRef();
    const today_ = moment().format("YYYY년 MM월 DD일");
    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();


    const NavigateToMenu = () => { // MenuPage로 이동
        navigate("/menu");  
    }

    const NavigateToHome = () => { // Home화면으로 이동
        navigate("/home");  
    }

    const onSubmit = () => { // 등록 버튼을 눌렀을 때
        if (content.length < 1) {
            contentRef.current.focus();
            return;
          }
        if (content !== "") { // 작성된 내용이 있으면 onCreate() 실행
            onCreate(date, time, content, imgSrc); // 날짜, 다이어리 내용, 업로드한 이미지
            navigate(-1);
        }
      };

    const onfileChange = (e)=>{ // 이미지 업로드 기능
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise((resolve)=>{
            reader.onload = ()=> {
                setImgSrc(reader.result || null);
                resolve();
            };
        });
    };
        
    return(
        <div className="body">
            <img alt="title" src={Logo} className="title_img" onClick={NavigateToMenu}/>
            <section className="title_section">
                <button className="diaryhome_btn" onClick={NavigateToHome}>뒤로</button>
                <div className="title">일기 작성 <IoMdCreate /></div>
            </section>
            <section className="create_section">
                <div className="diarycreate">
                    <div className="date">{today_}</div>
                    <div>
                    <label className="upload" for="imgUpload" src={imgSrc}>이미지 업로드하기</label>
                        <input type="file" id="imgUpload" accept="image/*"
	                    style={{"display":"none"}} onChange={onfileChange}/>
                    </div>
                </div>
            <section className="img_preview">
            {imgSrc? <img src={imgSrc} className="img" /> : null}
            </section>
            </section>
            <section>
                <div className="inputbox">
                    <input className="content" placeholder="오늘의 일기를 작성해보세요!" tyle="text"
                    value={content} onChange={(event)=>setContent(event.target.value)}></input>
                    <button className="inputbtn" onClick={onSubmit}>등록</button>
                </div>
            </section>
        </div>
    );
}

export default DiaryPage;
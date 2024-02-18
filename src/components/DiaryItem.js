import React from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from './../App.js';
import { useContext } from "react";

function DiaryItem({ id, content, date, time, imgSrc }){
    const navigate = useNavigate();
    const diaryDate = new Date(parseInt(date)).toLocaleDateString();
    const diaryDateTime = new Date(parseInt(date)).toLocaleTimeString();

    const { onRemove } = useContext(DiaryDispatchContext);

    const diaryEdit = () => {
        navigate(`/edit/${id}`);
    };

    const diaryRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(id);
            navigate('/home', { replace: true });
          }
    };

    
    return (
        <div className="diary_item">
            <div className="flex_header">
                <div className="diary_date">{diaryDate}</div>
                <div className="btn_class">
                    <button className="edit_btn" onClick={diaryEdit}>수정</button>
                    <button className="remove_btn" onClick={diaryRemove}>삭제</button>
                </div>
            </div>
            <div className="diary_date_time">{time} 작성</div>
            {imgSrc? <img src={imgSrc} className="img" /> : null}
            <div className="content_">{content}</div>
        </div>
    )
}
export default DiaryItem;
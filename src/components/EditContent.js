import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStringDate } from '../util/date';
import { DiaryDispatchContext } from '../App';
import { MdOutlineEdit } from "react-icons/md";

const EditContent = ({ isEdit, originData }) => { // 다이어리 수정 페이지
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [imgSrc, setImgSrc] = useState("");
    const today = new Date();
    const [date_, setDate] = useState(getStringDate(today));
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const time = hours + "시 " + minutes + "분";
    const navigate = useNavigate();
    const { onCreate, onEdit } = useContext(DiaryDispatchContext);

    const NavigateToHome = () => {
        navigate("/home");  
    }

    const onSubmit = () => {
        if (content.length < 1) { // 글자가 1 미만이면 focus함.
          contentRef.current.focus();
          return;
        }
    
        if (
          window.confirm(
            isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?',
          )
        ) {
          if (!isEdit) {
            onCreate(date_, time, content, imgSrc); 
          } else {
            onEdit(originData.id, date_, time, content, imgSrc);
          }
        }
        navigate('/home', { replace: true });
      };
    
      const onfileChange = (e)=>{
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
      
      // edit페이지에서 랜더하는 diaryEditor에서만 로직동작
      useEffect(() => {
        if (isEdit) {
          setDate(getStringDate(new Date(parseInt(originData.date))));
          setContent(originData.content);
          setImgSrc(originData.imgSrc);
        }
      }, [isEdit, originData]);
    
      return (
        <div className="EditContent">
            <div>
                <section className="title_section">
                    <button className="diaryhome_btn" onClick={NavigateToHome}>뒤로</button>
                    <div className="title">일기 수정 <MdOutlineEdit /></div>
                </section>
                <section className="edit_section">
                    <div>
                      <h4 className="edit_day_title">오늘은 언제인가요?</h4>
                      <div className="date_box">
                          <input 
                              className="edit_date"
                              type="date"
                              value={date_}
                              onChange={(e) => setDate(e.target.value)}
                          />
                      </div>
                    </div>
                    <div>
                    <label className="upload" for="imgUpload" src={imgSrc}>이미지 수정하기</label>
                        <input type="file" id="imgUpload" accept="image/*"
	                    style={{"display":"none"}} onChange={onfileChange}/>
                    </div>
                </section>
                <section className="img_preview">
                  {imgSrc? <img src={imgSrc} className="img" /> : null}
                </section>
                <section>
                    <h4 className="edit_title">일기를 수정해보세요!</h4>
                    <div className="inputbox">
                        <textarea
                        className="content"
                        placeholder="일기를 작성해보세요."
                        ref={contentRef}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                        <button className="inputbtn" onClick={onSubmit}>등록</button>
                    </div>
                </section>
            </div>
        </div>
      );
};

export default EditContent;
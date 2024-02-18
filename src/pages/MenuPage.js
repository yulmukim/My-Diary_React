import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo.png';
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

function MenuPage() {
    const [visible, setVisible] = useState(0);
    const [back, setBack] = useState(false); //박스마다 이미지 적용
    
    const navigate = useNavigate();

    const NavigateTo = (id) => {
        if (id === 0) {
            navigate("/weather"); 
        } else if (id === 1) {
            navigate("/home");
        } else {
            navigate("/fortune");
        }
    }

    const menudata = [
        {id: 0, content: "🌞 오늘의 날씨"},
        {id: 1, content: "📗📔 오늘의 일기"},
        {id: 2, content: "🥟 오늘의 포춘쿠키"}
    ];

    const SlideWrap = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
`;

    const Box = styled(motion.div)`
    margin-top: 100px;
    width: 300px;
    height: 300px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    position: absolute; // 부모 기준으로 배치하기 때문에 슬라이드가 튀지 않는다
    top: 10px;
    cursor: pointer;
    `;

    const nextPlease = () => {
        setBack(false);
        setVisible((prev) =>
        prev === menudata.length - 1 ? menudata.length - 1 : prev + 1
        );
    };
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 0 ? 0 : prev - 1));
    };

    const boxVariants = {
        entry: {
            x: back == false? 500 : -500,
            opacity: 0,
            transition: { duration: 0.5 }
        },
        center: {
          opacity: 1,
          x: 0,
          scale: 1,
          transition: { duration: 0.5 }
        },
        exit: {
            x: back == false? -500 : 500,
            opacity: 0,
            scale: 0,
            transition: { duration: 0.5 }
        }
      };
    return (
        <div className="menu_page">
            <img alt="title" src={Logo} className="title_img"/>
            <div className="menu_button">
                <div className="menu">
                    <SlideWrap>
                        <AnimatePresence custom={back}>
                            {menudata.map((menudata, i)  =>
                            i === visible ? (
                            <Box onClick={() => NavigateTo(menudata.id)}
                                custom={back}
                                variants={boxVariants}
                                initial="entry"
                                animate="center"
                                exit="exit"
                                key={menudata.id}
                            >
                                <span>{menudata.content}</span>
                            </Box>) : null
                            )}
                        </AnimatePresence>
                    </SlideWrap>
                    <div className="buttons">
                        <button type="button" className="prev" 
                        onClick={prevPlease}>PREV</button>
                        <button type="button" className="next" 
                        onClick={nextPlease}>NEXT</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPage;
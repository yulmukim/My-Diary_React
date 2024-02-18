import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const User = {
    email: 'test@gmail.com',
    password: 'test1234@'
}

function LoginPage () {

    const navigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const [EmailValid, setEmailValid] = useState(false);
    const [PasswordValid, setPasswordValid] = useState(false);
    const [NotAllow, setNotAllow] = useState(true);

    useEffect(() => {
        if(EmailValid && PasswordValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [EmailValid, PasswordValid]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = 
        /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };
    
    const handlePassword = (e) => {
        setPassword(e.target.value);
        const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }
    };

    const onSubmitButton = () => {
        if (Email === User.email && Password === User.password) {
            navigate('/menu');
        } else {
            alert("등록되지 않은 회원입니다.");
        }
    }

    return (
        <div className="loginpage">
            <div className="titleWrap">
                이메일과 비밀번호를
                <br />
                입력해주세요
            </div>

            <div className="contentWrap">
                <div className="inputTitle">이메일 주소</div>
                <div className="inputWrap">
                    <input
                        className="input"
                        type="text"
                        placeholder="test@gmail.com"
                        value={Email}
                        onChange={handleEmail}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!EmailValid && Email.length > 0 && (
                        <div>올바른 이메일을 입력해주세요.</div>
                    )}
                </div>

                <div style={{marginTop: "26px"}} className="inputTitle">
                    비밀번호
                </div>
                <div className="inputWrap">
                    <input
                        className="input"
                        type="password"
                        placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                        value={Password}
                        onChange={handlePassword}
                    />
                </div>
                <div className="errorMessageWrap">
                    {!PasswordValid && Password.length > 0 && (
                        <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
                    )}
                </div>
            </div>

            <div>
                <button className="submitButton" onClick={onSubmitButton} disabled={NotAllow}>확인</button>
            </div>
        </div>
    );
}

export default LoginPage;
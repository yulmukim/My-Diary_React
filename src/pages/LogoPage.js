import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AttentionSeeker } from 'react-awesome-reveal';
import introLogo from '../assets/intro_logo.png';
 

const LogoPageDiv = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
 
function LogoPage() { // 인트로 page
	const [loading, setLoding] = useState(true);
 
	const navigate = useNavigate();
	const timeout = () => {
		setTimeout(() => { // 타이머 설정
			navigate('/loginpage'); 
		}, 2000); // 2초 후에 LoginPage로 이동
	};
	useEffect(() => {
		timeout();
		return () => {
			clearTimeout(timeout); // setTimeout 함수를 취소
		};
	}); 
	return (
		<LogoPageDiv>
			<AttentionSeeker tada>
				<img alt="intro_logo" src={introLogo} width={300} height={300}/>
			</AttentionSeeker>
		</LogoPageDiv>
	);
};
 
export default LogoPage;
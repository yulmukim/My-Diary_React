# My Diary
- [Login page](#Login-page)
- [Menu page](#Menu-page)
- [Current weather page](#Current-weather-page)
- [Diary page](#Diary-page)
- [Fortune cookie page](#Fortune-cookie-page)

<br/>

## 프로젝트 소개
나만의 다이어리 앱으로, 주요 기능으로는 <u>CurrentWeather(오늘의 날씨)</u>, <u>DiaryPage(오늘의 일기)</u>, <u>Fortunecookie(오늘의 포춘쿠키)</u>의 3가지 기능으로 이루어져 있다.
<br/><br/>

## Login page
<p align=center><img width="435" alt="loginpage" src="https://github.com/yulmukim/react_todolist/assets/73217281/35fda04e-3a0b-40bc-b384-4f636b715e53"></p>
<br/><br/>

다음과 같이, User의 email, password 정보를 초기화함.
```js
const User = {
    email: 'test@gmail.com',
    password: 'test1234@'
}
```
<br/><br/>
useState를 이용하여, 로그인 화면 구현
```js
const [Email, setEmail] = useState("");
const [Password, setPassword] = useState("");

const [EmailValid, setEmailValid] = useState(false);
const [PasswordValid, setPasswordValid] = useState(false);
const [NotAllow, setNotAllow] = useState(true);
```
<br/><br/>
Email, Password 각각 정규표현식을 사용하여, valid한지 확인.
```js
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
```
User에 저장된 정보를 기반으로 한 간단한 로그인 페이지를 구현했다.
<br/><br/>

## Menu page
<p align=center><img width="289" alt="menu_weather" src="https://github.com/yulmukim/react_todolist/assets/73217281/7514ec17-bacb-4bac-9afd-baae299188d5"></p>

<p align=center><img width="287" alt="menu_diary" src="https://github.com/yulmukim/react_todolist/assets/73217281/9cc18b38-d0e4-42e9-ada8-36dbaaf1cdc3"></p>

<p align=center><img width="292" alt="menu_fortune" src="https://github.com/yulmukim/react_todolist/assets/73217281/05e1b1fa-48ba-4f5d-a699-b357478ebb1f"></p>

framer-motion 라이브러리를 사용해서 애니메이션 효과를 줌.
<br/><br/>
```js
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
```
PREV, NEXT버튼을 눌렀을 때, 화면에 띄워주는 메뉴 목록

<br/><br/>
```js
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
```
initial="entry"
<br/>
animate="center"
<br/>
exit="exit" 속성을 이용.
<br/><br/>

## Current Weather page
<p align=center><img width="560" alt="weatherpage" src="https://github.com/yulmukim/react_todolist/assets/73217281/edcfdefc-9699-4405-bdef-5c0af7c1665d"></p>

Openweathermap api를 이용하여 현재 날씨를 불러옴.
<br/><br/>
### CurrentWeather.js
```js
const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    getWeatherByCurrentLocation(lat, lon);
    });
};
    
const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    let response = await fetch(url);
    let data = await response.json();

    const city = data.name;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const sky = data.weather[0].main;
    const icon = data.weather[0].icon;
    const weatherIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const max = data.main.temp_max;
    const min = data.main.temp_min;

    setWeather({
        name: city,
        description: description,
        temp: temp,
        icon: weatherIcon,
        sky: sky,
        maxtemp: max,
        mintemp: min,
    })
    Umbrella(weather.description);
};
```
현재 위치를 기반으로 api를 불러와, useState 객체를 저장한다.<br/>
(불러온 정보 – 도시 이름, 날씨 설명, 현재 기온, 현재 날씨 아이콘, 현재 하늘, 최고 기온, 최저 기온)

<br/>

### WeatherClothes.js
```js
function WeatherClothes(props) {
    if (props.temp > 28) {
        return <p className="clothes">민소매, 반팔, 반바지, 짧은 치마, 린넨 옷</p>;
    } else if ((23 <= props.temp) && (props.temp <= 27)) {
        return <p className="clothes">반팔, 얇은 셔츠, 반바지, 면바지</p>;
    } else if ((20 <= props.temp) && (props.temp <= 22)) {
        return <p className="clothes">블라우스, 긴팔 티, 면바지, 슬랙스</p>;
    } else if ((17 <= props.temp) && (props.temp <= 19)) {
        return <p className="clothes">얇은 가디건이나 니트, 맨투맨, 후드, 긴 바지</p>;
    } else if ((12 <= props.temp) && (props.temp <= 16)) {
        return <p className="clothes">자켓, 가디건, 청자켓, 니트, 스타킹, 청바지</p>;
    } else if ((9 <= props.temp) && (props.temp <= 11)) {
        return <p className="clothes">트렌치 코트, 야상, 점퍼, 스타킹, 기모바지</p>;
    } else if ((5 <= props.temp) && (props.temp <= 8)) {
        return <p className="clothes">울 코트, 히트텍, 가죽 옷, 기모 옷</p>;
    } else {
        return <p className="clothes">패딩, 두꺼운 코트, 누빔 옷, 기모 옷, 목도리</p>;
    }
}
```
현재 온도를 기반으로, 입을 옷을 추천해주는 간단한 컴포넌트를 <br/>
만들었다.
<br/><br/>
```js
const Umbrella = () => {
        console.log(weather.description);
        if ((weather.description.includes('rain')) 
        || (weather.description.includes('drizzle')) 
        || (weather.description.includes('snow'))) {
            setUmbrella_("우산을 챙기세요!");
        }
        else {
            setUmbrella_("");
        }
    };
```
Weather.description에 ‘rain’, ‘drizzle’, ‘snow’가 포함되어 있을 경우, <br/>
우산을 챙기라는 문구를 넣어주었다.
<br/><br/>

## Diary page
<p align="center"><img width="200" alt="diarypage" src="https://github.com/yulmukim/react_todolist/assets/73217281/eef90a8b-5e90-41d0-be55-d363dd32a5ea"></p>

Home 화면에서는 내가 작성했던 일기 목록이 보여진다.<br/>
최신순, 오래된 순으로 정렬해서 볼 수 있게 구현하였다.<br/>
Home 화면에서 (새 일기 작성) 버튼을 누르면, DiaryPage로 이동하여<br/> 새로운 일기를 작성할 수 있다.
<br/><br/>
### App.js
```js
const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((input) => input.id !== action.targetId);
      break;
    }
    case 'EDIT': {
      newState = state.map((input) =>
        input.id === action.data.id ? { ...action.data } : input,
      );
      break;
    }
    default:
      return state;
  }
```
복잡한 useState들을 reducer로 상태관리 하였다.
<br/><br/>

```js
return (
    <DiaryStateContext.Provider value={data}>
       <DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <div className="body">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LogoPage />}></Route>
              <Route path="loginpage" element={<LoginPage />}></Route>
              <Route path="menu" element={<MenuPage />}></Route>
              <Route path="weather" element={<CurrentWeather />}></Route>
              <Route path="home" element={<Home />}></Route>
              <Route path="diarypage/:id" element={<DiaryPage />}></Route>
              <Route path="edit/:id" element={<Edit />}></Route>
              <Route path="fortune" element={<Fortunecookie />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
```
react-router-dom을 이용하여 페이지 이동.
<br/><br/>

```js
<DiaryDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
```
Context.Provider를 사용하여 props를 전역으로 전달함.
<br/><br/>

### DiaryPage.js
```js
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
```

등록 버튼을 눌렀을 때, onCreate(date, time, content, imgSrc) 실행.
<br/><br/>

```js
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
```
이미지 업로드 기능.
<br/><br/>

Home화면은 DiaryList 컴포넌트, DiaryItem 컴포넌트와 연결되어 있다.
<br/><br/>
### DiaryList.js
```js
const sortDiaryList = () => { 
        const dayCompare = (a, b) => {
            if (sort === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const sortedList = copyList.sort(dayCompare);
        return sortedList;
    };
```
일기를 최신 순, 오래된 순으로 정렬하는 함수
<br/><br/>

### DiaryItem.js
날짜, 시간, 일기 내용, 이미지로 이루어짐.

```js
const diaryEdit = () => {
        navigate(`/edit/${id}`);
    };

const diaryRemove = () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            onRemove(id);
            navigate('/home', { replace: true });
          }
};
```
수정 기능과 삭제 기능 구현.
<br/><br/>

## 부가 기능(수정)
### EditContent.js
수정 컴포넌트로, 원래 저장되어 있는 originData를 불러와서 그걸 기반으로 내용을 수정하는 컴포넌트.
```js
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
```
Edit 페이지에서 수정 등록을 눌렀을 때 실행되는 onSubmit 이벤트.
<br/><br/>

## Fortune cookie page
<p align=center><img width="448" alt="fortunepage" src="https://github.com/yulmukim/react_todolist/assets/73217281/2f536d9d-ee57-4d71-8557-440d01eb8c11"></p>

포춘쿠키 이미지를 클릭하면 포춘쿠키 결과를 확인할 수 있음.
<br/><br/>

```js
const fortuneResult = () => {
        if (window.confirm('결과를 확인하시겠습니까?')) {
            const random = Math.floor(Math.random() * 11);
            console.log(random);
            setResult(AA.fortune[random].result);     
        } else  {
            navigate("/fortune");
        }
    }
```
포춘쿠키 결과는 fortunedata.json에 저장된 값을 import하여, Math.floor(Math.random() *11)로 random 값을 저장한 후, 뽑아 옴.
<br/><br/>

### 그 밖의 기능들
1. 로고(인트로) 페이지 구현<br/>
무료 로고 디자인 페이지에서 인트로 로그 이미지를 만들어, <br/>
웹을 실행했을 때, 몇 초간 화면에 띄워지도록 구현.
```js
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
```

<br/><br/>
2. 반응형 웹 개발
```js
// 타블렛 
@media screen and (max-width:1023px) { 
}

// 모바일
@media screen and (max-width:767px) {
}
```
타블렛과 모바일로 나눠서 개발.
<br/><br/>

### 앞으로 더 보완하고 싶은 부분
- 디자인 보완하기 
- axios, db 이용하여 더 구체적인 로그인 페이지 구현하기
- Diary page에서 rest api를 이용해서 사진 받아오기<br/>
(지금은 localstorage에 저장하는 방식으로, 용량에 한계)

import './App.css';
import React, { useEffect, useReducer, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogoPage from './pages/LogoPage';
import LoginPage from './pages/LoginPage';
import MenuPage from './pages/MenuPage';
import CurrentWeather from './pages/CurrentWeather';
import Home from './pages/Home';
import DiaryPage from './pages/DiaryPage';
import Edit from './pages/Edit';
import Fortunecookie from './pages/Fortunecookie';
import { createContext } from 'react';


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

  localStorage.setItem('diary', JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = createContext(null);
export const DiaryDispatchContext = createContext(null);


function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem('diary');
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id),
      );

      if (diaryList.length >= 1) {
        dataId.current = parseInt(diaryList[0].id) + 1;
        dispatch({ type: 'INIT', data: diaryList });
      }
    }
  }, []);

  const dataId = useRef(0);

  const onCreate = (date, time, content, imgSrc) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        time,
        content,
        imgSrc
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: 'REMOVE',
      targetId,
    });
  };

  // EDIT
  const onEdit = (targetId, date, time, content, imgSrc) => {
    dispatch({
      type: 'EDIT',
      data: { 
        id: targetId, 
        date: new Date(date).getTime(), 
        time,
        content, 
        imgSrc 
      },
    });
  };

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
}

export default App;

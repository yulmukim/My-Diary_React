import React from "react";
import DiaryItem from "./DiaryItem";
import { useState } from "react";
import { TbMessageHeart } from "react-icons/tb";

function DiaryList({diaryList}) {
    const [sort, setSort] = useState("latest"); // 정렬 state

    const SelectBox = [
        { value: "latest", name: "최신 순" },
        { value: "oldest", name: "오래된 순" },
    ];

    const ControlMenu = React.memo(({ value, onChange, optionList }) => {
        return (
          <select className="controlmenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((input, idx) => (
              <option key={idx} value={input.value}>
                {input.name}
              </option>
            ))}
          </select>
        );
      });

    // 날짜로 정렬
    const sortDiaryList = () => { 
        const dayCompare = (a, b) => {
            if (sort === 'latest') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));
        const sortedList = copyList.sort(dayCompare);
        return sortedList;
    };
    
    return (
        <div className="HomeList">
            <div className="selectbox">
                <ControlMenu
                    value={sort}
                    onChange={setSort}
                    optionList={SelectBox}
                />
            </div>
            <div className="DiaryList">
                <h2 className="diarylist_text">일기 리스트</h2>
                <h4 className="diarylist_length">{diaryList.length}개의 일기가 있습니다. <TbMessageHeart /></h4>
                <div>
                    {sortDiaryList().map((input)=> (
                        <DiaryItem key={input.id} {...input} />
                    ))}
                </div>
            </div>
        </div>
        
        )
}
export default DiaryList;

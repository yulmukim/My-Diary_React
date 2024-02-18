import React from "react";

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
export default WeatherClothes;
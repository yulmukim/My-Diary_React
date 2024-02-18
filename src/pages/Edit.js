import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryStateContext } from '../App';
import EditContent from '../components/EditContent';

const Edit = () => {
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();
    const navigate = useNavigate();
    const {id} = useParams(); // 현재 전달받은 id


    // id, diaryList가 변할때 데이터꺼내오기
    useEffect(() => {
        if (diaryList.length >= 1) {
        const selectDiary = diaryList.find(
            (input) => parseInt(input.id) === parseInt(id),
        );
        if (selectDiary) {
            setOriginData(selectDiary);
        } else {
            navigate('home', { replace: true });
        }
        }
    }, [id, diaryList]);

    return (
        <div>
            {originData && <EditContent isEdit={true} originData={originData} />}
        </div>
    )
}

export default Edit;
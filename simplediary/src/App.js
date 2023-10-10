import './App.css';
import { useState, useRef } from "react";
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author:"박중현1",
//     content:"Hi 1",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id:2,
//     author:"박중현2",
//     content:"Hi 2",
//     emotion: 3,
//     created_date: new Date().getTime(),
//   },
//   {
//     id:3,
//     author:"박중현3",
//     content:"Hi 3",
//     emotion: 4,
//     created_date: new Date().getTime(),
//   },
// ];



function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]); // data를 앞에다 쓰면 새로운 글은 아래쪽으로 달린다 결론은 새로운 글을 위로 쌓이게 만듦
}
const onRemove = (targetId) => {
  console.log(`${targetId}가 삭제되었습니다.`);
  const newDiaryList = data.filter((it) => it.id !== targetId);
  setData(newDiaryList);
}
const onEdit = (targetId, newContent) => {
  setData(
    data.map((it) =>
    it.id === targetId ? { ...it, content: newContent } : it
    )
  );
};

  return (
   <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data}/>
   </div>
  );
}

export default App;

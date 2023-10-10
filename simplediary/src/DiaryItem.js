import { useState, useRef } from "react";

const DiaryItem = ({onEdit, onRemove, author, content, emotion, created_date, id}) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => {
        setIsEdit(!isEdit);
    }
    // 수정 취소
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }
    // 수정 완료
    const handleEdit = () => {
        if(localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit();
        }
    }

    const handleRemove = () => {
        console.log(id);
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
            onRemove(id);
        }
    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자:{author} | 감정점수:{emotion}
                </span>
                <br />
                <span className="date">{new Date(created_date).toLocaleString()}</span>
            </div>
            <div className="content">
                {isEdit ? (<>
                    <textarea
                        ref={localContentInput}
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                    />
                </>) : (<>
                    {content}
                </>)}
            </div>
            {isEdit ? (
                <>
                <button onClick={handleQuitEdit}>수정 취소</button>
                <button onClick={handleEdit}>수정 완료</button>
                </>
            ) : (
                <>
                <button onClick={handleRemove}>삭제하기</button>
                <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}
        </div>
    );
}
export default DiaryItem;
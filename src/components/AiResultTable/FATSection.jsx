function QuestionAnswer({ question }) {
    return (
        <div key={question.id} style={{ display: 'flex', gap: 3 }}>
            {question.subQuesName ? (
                <div style={{ display: 'flex', gap: 25 }}>
                    <div style={{ display: 'flex', gap: 3 }}>
                        <p style={{ margin: 0 }}>{question.name}</p>:
                        <p style={{ margin: 0 }}> {question.answer}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 3 }}>
                        <p style={{ margin: 0 }}>{question.subQuesName}</p>:
                        <p style={{ margin: 0 }}> {question.subQuesAnswer}</p>
                    </div>
                </div>
            ) : (
                <>
                    <p style={{ margin: 0 }}>{question.name}</p>:
                    <p style={{ margin: 0 }}> {question.answer}</p>
                </>
            )}
        </div>
    );
}

function FATSection({ item }) {
    return (
        <div key={item.name}>
            <p style={{ margin: 0, fontWeight: 600, fontSize: '16px' }}>Fixed Asset Tracking</p>
            {item?.fatQA?.map((question) => (
                <QuestionAnswer key={question.id} question={question} />
            ))}
        </div>
    );
}

export default FATSection;

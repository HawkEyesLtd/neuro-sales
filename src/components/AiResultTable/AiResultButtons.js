import { Button, Card } from 'antd';
import { useState } from 'react';

import { useGetAiResultQuery } from '../../redux/features/report/visitCallApi';

import AiResultTable from './index';

function AiResultButtons({ data, executionId }) {
    const [activeSection, setActiveSection] = useState(null);

    const [skip, _setSkip] = useState(false);
    // execution id
    // const [executionId, _setExecutionId] = useState('');

    // ai result get api hook
    const { data: aiData, refetch, isLoading } = useGetAiResultQuery({ id: executionId }, { skip });

    const buttonStyle = {
        marginRight: '8px',
        marginBottom: '16px',
        borderRadius: '4px',
    };

    const sections = [
        { key: 'category', label: 'Category Shelf Display', type: 'primary' },
        { key: 'share', label: 'Share Of Shelf', color: '#6b46c1' },
        { key: 'sachet', label: 'Share Of Sachet', color: '#2f855a' },
        { key: 'visibility', label: 'Share Of POSM', color: '#dd6b20' },
        { key: 'confidence', label: 'Confidence Score', color: '#38a169' },
    ];

    const handleSectionClick = (key) => {
        setActiveSection(activeSection === key ? null : key);
    };

    return (
        <div style={{ padding: '24px' }}>
            <div style={{ marginBottom: '24px' }}>
                {sections.map((section) => (
                    <Button
                        key={section.key}
                        type={section.type || 'default'}
                        style={{
                            ...buttonStyle,
                            backgroundColor: section.type ? undefined : section.color,
                            color: section.type ? undefined : 'white',
                            borderColor: section.type ? undefined : section.color,
                        }}
                        onClick={() => {
                            handleSectionClick(section.key);
                            // onClick(section.key);
                        }}
                    >
                        {section.label} {activeSection === section.key ? '▼' : '▶'}
                    </Button>
                ))}

                {activeSection && (
                    <Card>
                        <AiResultTable data={aiData?.data?.jobsInfo} />{' '}
                        {/* Pass your actual data here */}
                    </Card>
                )}
            </div>
        </div>
    );
}

export default AiResultButtons;

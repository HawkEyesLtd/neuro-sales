import { CaretRightOutlined } from '@ant-design/icons';
import { Col, Collapse, Row } from 'antd';
import './styles.css';

const { Panel } = Collapse;

function CollapsiblePanel({ sections, loading = false, activeKey, onPanelChange }) {
    const handlePanelChange = (key) => {
        onPanelChange?.(key);
    };

    return (
        <Collapse
            className="custom-collapse"
            bordered={false}
            ghost
            activeKey={activeKey}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined className="collapse-icon" rotate={isActive ? 90 : 0} />
            )}
            onChange={handlePanelChange}
        >
            {sections.map((section) => (
                <Panel key={section.key} header={section.title} className="collapse-panel">
                    <Row gutter={[16, 16]}>
                        <Col span={24}>{section.content}</Col>
                    </Row>
                </Panel>
            ))}
        </Collapse>
    );
}

export default CollapsiblePanel;

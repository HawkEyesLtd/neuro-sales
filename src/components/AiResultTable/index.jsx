import DisplayAuditSection from './DisplayAuditSection';
import FATSection from './FATSection';
import POSMSection from './POSMSection';
import SOSSection from './SOSSection';
import './styles.css';

const filterData = (data, excludeNames) =>
    data?.filter((x) => !excludeNames.includes(x.name)) || [];

function AiResultTable({ data }) {
    const sosData = filterData(data, ['DA', 'QPDS', 'FAT', 'POSM']);
    const posmData = filterData(data, ['DA', 'QPDS', 'FAT', 'SOS']);
    const fatData = filterData(data, ['DA', 'QPDS', 'POSM', 'SOS']);
    const displayAuditData = filterData(data, ['SOS', 'FAT', 'POSM']);

    return (
        <div className="ai-table-container">
            {sosData.map((item) => (
                <SOSSection key={item.name} item={item} />
            ))}

            {posmData.map((item) => (
                <POSMSection key={item.name} item={item} />
            ))}

            {fatData.map((item) => (
                <FATSection key={item.name} item={item} />
            ))}

            {displayAuditData.map((item) => (
                <DisplayAuditSection key={item.name} item={item} />
            ))}
        </div>
    );
}

export default AiResultTable;

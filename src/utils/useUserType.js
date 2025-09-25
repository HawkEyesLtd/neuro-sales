import { useSelector } from 'react-redux';

const useUserType = () => {
    const { designation } = useSelector((state) => state?.auth?.user) ?? {};

    if (designation === 'TM') return 'territoryManager';
    if (designation === 'AM') return 'areaManager';
    if (designation === 'SMKT') return 'shopperMarketingManager';
    return null;
};

export default useUserType;

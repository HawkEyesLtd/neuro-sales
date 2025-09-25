import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import { useSelector } from 'react-redux';

const newStyles = {
    variables: {
        light: {
            codeFoldGutterBackground: '#6F767E',
            codeFoldBackground: '#E2E4E5',
        },
    },
};

function DiffChecker() {
    const { user } = useSelector((state) => state.auth);

    const newData = {
        id: '659316b96b5904f7a3303be5',
        landingPage: {
            label: 'Dashboard',
            value: '6592a2e8cf69ed4f747cb7fd',
        },
        accessOf: 'All',
        accessLevel: 'Admin Level',
        setting: {
            refreshTime: 0,
            sessionTimeOut: 20,
        },
        name: 'Arifur Rahman Munna',
        username: 'arif.login',
        kind: 'Admin',
        permission: [
            {
                label: 'Team Management',
                value: '65928fa0a7c2d8b2a51c8006',
            },
            {
                label: 'Profile',
                value: '6592a2dfcf69ed4f747cb7fb',
            },
            {
                label: 'Dashboard',
                value: '6592a2e8cf69ed4f747cb7fd',
            },
            {
                label: 'Tickets',
                value: '6592a2efcf69ed4f747cb7ff',
            },
            {
                label: 'Attendance',
                value: '6592a2f6cf69ed4f747cb805',
            },
            {
                label: 'MS Target',
                value: '6592a306cf69ed4f747cb80b',
            },
            {
                label: 'Daily Activity Report',
                value: '6592a316cf69ed4f747cb80d',
            },
            {
                label: 'Route Plan Tracker',
                value: '6592a323cf69ed4f747cb80f',
            },
            {
                label: 'Login Details',
                value: '6592a32fcf69ed4f747cb811',
            },
            {
                label: 'Notice',
                value: '6592a344cf69ed4f747cb815',
            },
            {
                label: 'Leave Management',
                value: '6592a358cf69ed4f747cb817',
            },
            {
                label: 'Training Module',
                value: '6592a369cf69ed4f747cb819',
            },
            {
                label: 'Download Report',
                value: '6592a376cf69ed4f747cb81b',
            },
            {
                label: 'Add Employee',
                value: '6592a3b4cf69ed4f747cb829',
            },
            {
                label: 'View Employee',
                value: '6592a3becf69ed4f747cb82f',
            },
            {
                label: 'Super User',
                value: '6592ab16cf69ed4f747cb8bb',
            },
            {
                label: 'Add Group',
                value: '6592ab31cf69ed4f747cb8be',
            },
            {
                label: 'View Group',
                value: '6592ab39cf69ed4f747cb8c1',
            },
            {
                label: 'Add User',
                value: '6592ab44cf69ed4f747cb8c3',
            },
            {
                label: 'View User',
                value: '6592ab4ccf69ed4f747cb8c5',
            },
            {
                label: 'Visit Call Report',
                value: '659fb854a098d0e7e8c9641e',
            },
            {
                label: 'Data Management',
                value: '64d72855880173119f75b2b4',
            },
            {
                label: 'Material Management',
                value: '64d72855880173119f75b2ba',
            },
            {
                label: 'View Material',
                value: '64d72855880173119f75b2bb',
            },
            {
                label: 'Allocate Material',
                value: '64d72855880173119f75b2bc',
            },
            {
                label: 'Receive Material in DH',
                value: '64d72855880173119f75b2bd',
            },
            {
                label: 'Material Movement',
                value: '64d72855880173119f75b2be',
            },
            {
                label: 'Approve/Reject Transfer',
                value: '64d72855880173119f75b2bf',
            },
            {
                label: 'Inventory',
                value: '64d72855880173119f75b2c0',
            },
            {
                label: 'Town POSM History',
                value: '64d72855880173119f75b2c1',
            },
            {
                label: 'Town POSM Summary',
                value: '64d72855880173119f75b2c2',
            },
            {
                label: 'POSM Damage & Lost',
                value: '64d72855880173119f75b2c3',
            },
            {
                label: 'FF POSM History',
                value: '64d72855880173119f75b2c4',
            },
            {
                label: 'FF POSM Summary',
                value: '64d72855880173119f75b2c5',
            },
            {
                label: 'POSM Management',
                value: '65937f232ca274735170294d',
            },
            {
                label: 'Add POSM',
                value: '65937f332ca274735170294f',
            },
            {
                label: 'View POSM List',
                value: '65937f422ca2747351702951',
            },
            {
                label: 'POSM Allocation',
                value: '65937f512ca2747351702953',
            },
            {
                label: 'Town POSM Movement',
                value: '65937f5f2ca2747351702955',
            },
            {
                label: 'Approve/Reject Transfer',
                value: '65937f732ca2747351702957',
            },
            {
                label: 'POSM Approve/Reject Transfer',
                value: '65937fe62ca274735170295d',
            },
            {
                label: 'Add Cluster',
                value: '659c1e8d2ca27473517036e9',
            },
            {
                label: 'View Cluster',
                value: '659c1e992ca27473517036eb',
            },
            {
                label: 'Add Area',
                value: '659c1eb32ca27473517036ed',
            },
            {
                label: 'View Area',
                value: '659c1ebb2ca27473517036f1',
            },
            {
                label: 'Add Territory',
                value: '659c1edf2ca27473517036f3',
            },
            {
                label: 'View Territory',
                value: '659c1ef22ca27473517036f5',
            },
            {
                label: 'Add Town',
                value: '659c1f012ca27473517036f7',
            },
            {
                label: 'View Town',
                value: '659c1f082ca27473517036f9',
            },
            {
                label: 'PJP Management',
                value: '659cdf4d2ca2747351703a63',
            },
            {
                label: 'PJP Status',
                value: '659cdf602ca2747351703a65',
            },
            {
                label: 'PJP Mapping',
                value: '659cdf692ca2747351703a67',
            },
            {
                label: 'Approve PJP',
                value: '659cdf762ca2747351703a69',
            },
        ],
    };
    const oldData = {
        id: '659316b96b5904f7a3303be5',
        landingPage: {
            label: 'Dashboard',
            value: '6592a2e8cf69ed4f747cb7fd',
        },
        accessOf: 'All',
        accessLevel: 'TO Level',
        name: 'Arifur Rahman',
        username: 'arif',
        kind: 'TO',
        permission: [
            {
                label: 'Profile',
                value: '6592a2dfcf69ed4f747cb7fb',
            },
            {
                label: 'Tickets',
                value: '6592a2efcf69ed4f747cb7ff',
            },
            {
                label: 'Attendance',
                value: '6592a2f6cf69ed4f747cb805',
            },
            {
                label: 'MS Target',
                value: '6592a306cf69ed4f747cb80b',
            },
            {
                label: 'Daily Activity Report',
                value: '6592a316cf69ed4f747cb80d',
            },
            {
                label: 'Route Plan Tracker',
                value: '6592a323cf69ed4f747cb80f',
            },
            {
                label: 'Notice',
                value: '6592a344cf69ed4f747cb815',
            },
            {
                label: 'Training Module',
                value: '6592a369cf69ed4f747cb819',
            },
            {
                label: 'Download Report',
                value: '6592a376cf69ed4f747cb81b',
            },
            {
                label: 'Add Employee',
                value: '6592a3b4cf69ed4f747cb829',
            },
            {
                label: 'View Employee',
                value: '6592a3becf69ed4f747cb82f',
            },
            {
                label: 'Visit Call Report',
                value: '659fb854a098d0e7e8c9641e',
            },
            {
                label: 'Data Management',
                value: '64d72855880173119f75b2b4',
            },
            {
                label: 'Material Management',
                value: '64d72855880173119f75b2ba',
            },
            {
                label: 'View Material',
                value: '64d72855880173119f75b2bb',
            },
            {
                label: 'Allocate Material',
                value: '64d72855880173119f75b2bc',
            },
            {
                label: 'Receive Material in DH',
                value: '64d72855880173119f75b2bd',
            },
            {
                label: 'Material Movement',
                value: '64d72855880173119f75b2be',
            },
            {
                label: 'Approve/Reject Transfer',
                value: '64d72855880173119f75b2bf',
            },
            {
                label: 'Inventory',
                value: '64d72855880173119f75b2c0',
            },
            {
                label: 'Town POSM History',
                value: '64d72855880173119f75b2c1',
            },
            {
                label: 'Town POSM Summary',
                value: '64d72855880173119f75b2c2',
            },
            {
                label: 'POSM Damage & Lost',
                value: '64d72855880173119f75b2c3',
            },
            {
                label: 'FF POSM History',
                value: '64d72855880173119f75b2c4',
            },
            {
                label: 'FF POSM Summary',
                value: '64d72855880173119f75b2c5',
            },
            {
                label: 'POSM Management',
                value: '65937f232ca274735170294d',
            },
            {
                label: 'Add POSM',
                value: '65937f332ca274735170294f',
            },
            {
                label: 'View POSM List',
                value: '65937f422ca2747351702951',
            },
            {
                label: 'POSM Allocation',
                value: '65937f512ca2747351702953',
            },
            {
                label: 'Town POSM Movement',
                value: '65937f5f2ca2747351702955',
            },
            {
                label: 'Approve/Reject Transfer',
                value: '65937f732ca2747351702957',
            },
            {
                label: 'POSM Approve/Reject Transfer',
                value: '65937fe62ca274735170295d',
            },
            {
                label: 'Add Cluster',
                value: '659c1e8d2ca27473517036e9',
            },
            {
                label: 'View Cluster',
                value: '659c1e992ca27473517036eb',
            },
            {
                label: 'Add Area',
                value: '659c1eb32ca27473517036ed',
            },
            {
                label: 'View Area',
                value: '659c1ebb2ca27473517036f1',
            },
            {
                label: 'Add Territory',
                value: '659c1edf2ca27473517036f3',
            },
            {
                label: 'View Territory',
                value: '659c1ef22ca27473517036f5',
            },
            {
                label: 'Add Town',
                value: '659c1f012ca27473517036f7',
            },
            {
                label: 'View Town',
                value: '659c1f082ca27473517036f9',
            },
            {
                label: 'PJP Management',
                value: '659cdf4d2ca2747351703a63',
            },
            {
                label: 'PJP Status',
                value: '659cdf602ca2747351703a65',
            },
            {
                label: 'PJP Mapping',
                value: '659cdf692ca2747351703a67',
            },
            {
                label: 'Approve PJP',
                value: '659cdf762ca2747351703a69',
            },
        ],
    };

    return (
        <ReactDiffViewer
            oldValue={JSON.stringify(oldData, undefined, 4)}
            newValue={JSON.stringify(newData, undefined, 4)}
            splitView
            compareMethod={DiffMethod.WORDS}
            styles={newStyles}
            leftTitle="Version A"
            rightTitle="Version B"
            // renderContent={highlightSyntax}
        />
    );
}

export default DiffChecker;

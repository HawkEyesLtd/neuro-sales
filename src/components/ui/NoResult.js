import { Result } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import HelmetHeader from '../HelmetHeader';

function NoResult() {
    // user information log
    const { user: userInfo } = useSelector((state) => state.auth);
    const isEditableUser = !!userInfo?.permission?.find((x) => x.label === 'User Edit')?.label;

    const [showGame, setShowGame] = useState(false);
    return (
        <>
            <HelmetHeader title="No Data found" />
            {showGame ? (
                <TicTacToeGame />
            ) : (
                <Result status="404" title="" subTitle="Sorry, no data found!" />
            )}
            {!showGame && (
                <>
                    {!isEditableUser ? (
                        <div className="show-game-container">
                            <button
                                className="show-game-button"
                                type="button"
                                onClick={() => setShowGame(true)}
                            >
                                Play a game?
                            </button>
                        </div>
                    ) : null}
                </>
            )}
        </>
    );
}

export default NoResult;

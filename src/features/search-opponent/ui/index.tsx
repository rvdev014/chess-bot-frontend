import React from 'react';
import {useGameStore} from "../../../shared/model/game/store.ts";
import {useParams} from "react-router-dom";

export const SearchOpponent = () => {

    const {userId} = useParams<{ userId: string }>();
    const searchLoading = useGameStore(state => state.isSearching);
    const searchOpponent = useGameStore(state => state.searchOpponent);

    function renderContent() {
        switch (true) {
            case searchLoading:
                return <p>Searching...</p>;
            default:
                return <button onClick={() => searchOpponent(userId as string)}>Search opponent</button>;
        }
    }

    return (
        <>
            {renderContent()}
        </>
    );
};

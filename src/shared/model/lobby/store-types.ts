export interface IGameOptionsForm {
    time?: number;
    level?: number;
}

export interface ICreateRoomForm {
    time?: number;
    friend?: string;
}

export interface ILobbyStore {
    isWaitingFriend: boolean;
    isFriendFound: boolean;
    isSearching: boolean;
    isCreateRoomModal: boolean;
    isGameOptionsModal: boolean;
    isPlayingLocal: boolean;

    onHomeClick(): void;

    onConnect(): void;

    onSearchOpponent(): void;

    onCancelSearch(): void;

    onPlayLocal(): void;

    onSubmitCreateRoomForm(fields: ICreateRoomForm): void;

    onSubmitGameOptionsForm(fields: IGameOptionsForm): void;

    onCancelWaitingFriend(): void;

    onCloseCreateRoomModal(): void;

    onCloseGameOptionsModal(): void;

    onPlayWithFriend(): void;

    onPlayWithRobot(): void;

    onDisconnect(): void;

    reset(): void;
}
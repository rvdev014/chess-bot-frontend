export interface IGameOptionsForm {
    time?: number;
    level?: number;
}

export interface ICreateRoomForm {
    friendId?: string;
    timeLimit?: number;
}

export interface ILobbyStore {
    isWaitingFriend: boolean;
    isFriendFound: boolean;
    isSearching: boolean;
    isCreateRoomModal: boolean;
    isGameOptionsModal: boolean;
    isPlayingLocal: boolean;

    inviteUrl: string;

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

    onRoomCreated(inviteUrl: string): void;

    onDisconnect(): void;

    reset(): void;
}
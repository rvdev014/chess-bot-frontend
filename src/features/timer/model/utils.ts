export function formatTime(time?: number) {
    if (time === null || time === undefined) {
        return 'Waiting...';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}
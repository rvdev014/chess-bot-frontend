export class Engine {

    stockFish: Worker;

    onMessage: (callback: (e: { bestMove: string }) => void) => void;

    sendMessage(message: string) {
        this.stockFish.postMessage(message);
    }

    constructor() {
        this.stockFish = new Worker("/stockfish.js");
        this.onMessage = (callback) => {
            this.stockFish.addEventListener("message", (e) => {
                const bestMove = e.data?.match(/bestmove\s+(\S+)/)?.[1];

                callback({ bestMove });
            });
        };
        // Init engine
        this.sendMessage("uci");
        this.sendMessage("isready");
    }

    evaluatePosition(fen: string, depth: number) {
        this.stockFish.postMessage(`position fen ${fen}`);
        this.stockFish.postMessage(`go depth ${depth}`);
    }
    stop() {
        this.sendMessage("stop"); // Run when changing positions
    }
    quit() {
        this.sendMessage("quit"); // Good to run this before unmounting.
    }
}
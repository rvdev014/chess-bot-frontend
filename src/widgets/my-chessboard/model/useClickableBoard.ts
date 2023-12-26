import {useState} from "react";
import {Move, Square} from "chess.ts/dist/types";
import {PromotionPieceOption} from "react-chessboard/dist/chessboard/types";
import {Chess, PieceSymbol} from "chess.ts";
import {SideType} from "../../../shared/model/game/store-types.ts";

export const useClickableBoard = (chess: Chess, mySide: SideType, onMove: (move: Move) => void) => {
    const [moveFrom, setMoveFrom] = useState<Square | null>(null);
    const [moveTo, setMoveTo] = useState<Square | null>(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [optionSquares, setOptionSquares] = useState({});

    function getMoveOptions(square: string) {
        const moves = chess.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares: any = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    chess.get(move.to) &&
                    chess.get(move.to)?.color !== chess.get(square)?.color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square: Square) {
        // compare mySide
        const chessTurnFull = chess.turn() === "w" ? "white" : "black";
        if (mySide && chessTurnFull !== mySide) return;

        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = chess.moves({
                square: moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square
            );
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square as Square : null);
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const move = chess.move({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            onMove(move);

            setMoveFrom(null);
            setMoveTo(null);
            setOptionSquares({});
            return;
        }
    }

    function onPromotionPieceSelect(piece?: PromotionPieceOption | undefined) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece && moveTo && moveFrom) {
            const movement = {
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() as PieceSymbol ?? "q",
            };

            const move = chess.move(movement);
            if (move === null) return false;

            onMove(move);
        }

        setMoveFrom(null);
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return true;
    }

    return {
        moveTo,
        optionSquares,
        showPromotionDialog,
        onSquareClick,
        onPromotionPieceSelect
    }
}
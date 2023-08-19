import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import styles from '@/styles/lobby.module.css';

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);

    const startGame = () => {
        router.push(`/game/${playerName}`);
    };
    const board = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ];
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];


    const drawCell = (x: number, y: number) => {
        let ret: any = '';
        game.ships.forEach(ship => {
            ship.coordinates.forEach(shipPart => {
                if (shipPart.x === x && shipPart.y === y) {
                    ret = <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: ship.color }}>{shipPart?.exploded ? 'X' : ''}</div>;
                }
            });
        });
        return ret;
    };

    return (
        <Layout>
            <div>
                <div>
                    lobby
                </div>
                <div>
                    player: {playerName}
                </div>
                <div>
                    other players:
                    <ul>
                        {game.users.map(r => <li key={r.id}>{r.name}</li>)}
                    </ul>
                </div>
                <button onClick={startGame}>Start Game</button>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <table style={{borderSpacing: 0}}>
                        <tbody>
                            {
                                board.map((r, x) => (
                                    <tr style={{ borderCollapse: 'collapse', border: '1px solid white' }}>
                                        {
                                            <td key={x} style={{ width: 50, height: 50 }} >
                                                <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{letters[x]}</span>

                                            </td>
                                        }
                                        {
                                            r.map((c, y) => (
                                                <td key={x + y} style={{ borderCollapse: 'collapse', border: '1px solid white', width: 50, height: 50 }} >
                                                    {drawCell(x, y)}
                                                </td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            <tr>
                                <td></td>
                                {
                                    board[0].map((v, index) => (
                                        <td key={index} style={{ width: 50, height: 50}}>
                                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{index}</span>
                                        </td>
                                    ))
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}    
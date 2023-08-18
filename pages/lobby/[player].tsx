import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);

    const startGame = () => {
        router.push(`/game/${playerName}`);
    };
    const rows = [
        [1, 2, 3, 4],
        [1, 11, 3, 4],
        [1, 2, 33, 4],
        [44, 2, 4, 4]
    ]

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

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        rows.map(row => <div style={{ display: 'flex' }}>
                            {
                                row.map(cell => <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '.5px solid gray', width: 50, height: 50 }}>{cell}</div>)
                            }
                        </div>)
                    }
                </div>
            </div>
        </Layout>
    );
}    
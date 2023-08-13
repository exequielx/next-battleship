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
                        {game.users.map(r => <li>{r.name}</li>)}
                    </ul>
                </div>
                <button onClick={startGame}>Start Game</button>
            </div>
        </Layout>
    );
}    
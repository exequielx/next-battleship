import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);

    return (
        <Layout>
            <div>
                <div>
                    tablero
                </div>
                <div>
                    players:
                    <ul>
                        {game.users.map(r => <li>{r.name}</li>)}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}    
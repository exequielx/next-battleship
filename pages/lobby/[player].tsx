import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import styles from '@/styles/lobby.module.css';
import Board from "@/components/board";
import { useEffect } from 'react';
import { ADMIN } from '@/lib/types';

export default function Lobby() {
    const router = useRouter();
    const playerName: any = router?.query?.player;
    const game = useGame(playerName);

    const onStartGame = () => {
        game.changeGameStatus(true);
    };

    useEffect(() => {
        if (playerName && game?.connected && game?.data?.playing === true) {
            router.push(`/game/${playerName}`);
        }
    }, [playerName, game?.connected, game?.data?.playing]);

    return (
        <Layout title={`LOBBY de ${playerName}`}>
            <div>
                <div>
                    players:
                    <ul>
                        {
                            !game?.data ? <span>loading...</span> : (
                                game.data.users.map(r => <li key={r.id}>{r.name}</li>)
                            )
                        }
                    </ul>
                </div>
                <button onClick={game.randomizeCells}>Random</button>
                {playerName === ADMIN && <button onClick={onStartGame}>Start Game</button>}
                <Board cells={game.getCells(playerName)} />
            </div>
        </Layout>
    );
}    
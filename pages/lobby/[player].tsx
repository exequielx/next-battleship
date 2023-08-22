import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import styles from '@/styles/lobby.module.css';
import Board from "@/components/board";
import { useEffect } from 'react';
import { ADMIN } from '@/lib/types';
import Players from '@/components/players';

export default function Lobby() {
    const router = useRouter();
    const playerName: any = router?.query?.player;
    const game = useGame(playerName);

    const onStartGame = () => {
        game.changeGameStatus(true);
    };

    useEffect(() => {
        if (game?.data?.playing === true) {
            router.push(`/game/${playerName}`);
        }
    }, [game?.data]);

    return (
        <Layout title="SALA DE ESPERA">
            <div className={styles.container}>
                <Players users={game?.data?.users ?? []} />
                <Board cells={game.getCells(playerName)} />
                <div className={styles.actions}>
                    <button onClick={game.randomizeCells}>Random</button>
                    {playerName === ADMIN && <button onClick={onStartGame}>Start Game</button>}
                </div>
            </div>
        </Layout>
    );
}    
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import Board from "@/components/board";
import { useEffect, useState } from 'react';
import styles from '@/styles/game.module.css';
import { ADMIN } from '@/lib/types';
import Players from '@/components/players';

export default function Lobby() {
    const router = useRouter();
    const playerName: any = router?.query?.player;
    const game = useGame(playerName);
    const [target, setTarget] = useState<string>();

    useEffect(() => {
        if (game?.data?.playing === false) {
            router.push(`/lobby/${playerName}`);
        }
    }, [game?.data]);

    useEffect(() => {
        if ((game?.data?.users?.length ?? 0) > 0) {
            setTarget(game?.data?.users.find(r => r.name !== playerName)?.name);
        }
    }, [game?.data]);

    const onCellClick = (x: number, y: number) => {
        if (target && game.data?.currentTurn === playerName) {
            game.play(target, x, y);
        }
    }

    const onStopGame = () => {
        game.changeGameStatus(false);
    };

    return (
        <Layout title={playerName}>
            <div>
                <Players users={game?.data?.users?.filter(r => r.name !== playerName) ?? []} onUserClick={setTarget} target={target} />
                <div className={styles.current}>turno: {game.data?.currentTurn}</div>
                <div>
                    <Board cells={game.getCells(target, true)} onCellClick={onCellClick} />
                </div>
                <Board isSmall cells={game.getCells(playerName)} />
                <div className={styles.actions}>
                    {playerName === ADMIN && <button onClick={onStopGame}>Stop Game</button>}
                </div>
            </div>
        </Layout>
    );
}    
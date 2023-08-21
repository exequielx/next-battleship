import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import Board from "@/components/board";
import { useEffect, useState } from 'react';
import { ADMIN } from '@/lib/types';

export default function Lobby() {
    const router = useRouter();
    const playerName: any = router?.query?.player;
    const game = useGame(playerName);
    const [target, setTarget] = useState<string>();

    useEffect(() => {
        if (playerName && game?.connected && game?.data?.playing === false) {
            router.push(`/lobby/${playerName}`);
        }
    }, [playerName, game?.connected, game?.data?.playing]);

    const onCellClick = (x: number, y: number) => {
        if (target && game.data?.currentTurn === playerName) {
            game.play(target, x, y);
        }
    }

    const onStopGame = () => {
        game.changeGameStatus(false);
    };

    return (
        <Layout title={`GAME of ${playerName}`}>
            <div>
                <div>
                    other players:
                    <ul>
                        {
                            !game?.data ? <span>loading...</span> : (
                                game.data.users.filter(r => r.name !== playerName).map(r => <li onClick={() => { setTarget(r.name); }} style={{ color: target === r.name ? 'red' : 'white' }} key={r.id}>{r.name}</li>)
                            )
                        }
                    </ul>
                    <div>current turn: {game.data?.currentTurn}</div>
                    {playerName === ADMIN && <button onClick={onStopGame}>Stop Game</button>}
                </div>
                <div style={{ position: 'absolute', left: 20, top: 300 }}>
                    <Board cellSize={23} cells={game.getCells(playerName)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Board cells={game.getCells(target, true)} onCellClick={onCellClick} />
                </div>
            </div>
        </Layout>
    );
}    
import { useRouter } from 'next/router';
import Layout from "@/components/layout";
import useGame from "@/lib/useGame";
import Board from "@/components/board";
import { useEffect, useState } from 'react';

export default function Lobby() {
    const router = useRouter();
    const playerName = router?.query?.player;
    const game = useGame(playerName);
    const [target, setTarget] = useState<string>();

    const onCellClick = (x: number, y: number) => {
        if (target) {
            game.play(target, x, y);
        }
    }

    return (
        <Layout title="GAME">
            <div>
                <div>
                    players:
                    <ul>
                        {
                            !game?.data ? <span>loading...</span> : (
                                game.data.users.filter(r => r.id !== game.userId).map(r => <li onClick={() => { setTarget(r.id); }} style={{ color: target === r.id ? 'red' : 'white' }} key={r.id}>{r.name}</li>)
                            )
                        }
                    </ul>
                </div>
                <div style={{ position: 'absolute', left: 20, top: 300 }}>
                    <Board cellSize={23} cells={game.getCells(game.userId)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Board cells={game.getCells(target, true)} onCellClick={onCellClick} />
                </div>
            </div>
        </Layout>
    );
}    
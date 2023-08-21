export default function Cell({ x, y, color, exploded, hide, onCellClick, hasShip }: { x?: number, y?: number, color?: string, exploded?: boolean, hide?: boolean, onCellClick: any, hasShip?: boolean }) {

    if (hasShip) {
        if (exploded) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: color }}> X</div>;
        }
        if (!hide) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: color }}></div>;
        }
        return <div onClick={() => { onCellClick(x, y); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}></div>;

    } else {
        if (exploded) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'white' }}></div>;
        } else {
            return <div onClick={() => { onCellClick(x, y); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}></div>;
        }
    }
}

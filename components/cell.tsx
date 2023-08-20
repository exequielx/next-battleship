export default function Cell({ x, y, color, exploded, hide, onCellClick }: { x?: number, y?: number, color?: string, exploded?: boolean, hide?: boolean, onCellClick: any }) {
    const hasShip = !!color;

    if (hasShip) {
        if (exploded || !hide) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: color }}> X</div>;
        } else {
            return <div onClick={() => { onCellClick(x, y); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}></div>;
        }
    } else {
        if (exploded) {
            return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'white' }}></div>;
        } else {
            return <div onClick={() => { onCellClick(x, y); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}></div>;
        }
    }
}

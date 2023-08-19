export default function Cell({ id, color, exploded }: { id?: string, color?: string, exploded?: boolean }) {

    if (!id) {
        return <></>;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: color }}>
            {exploded ? 'X' : ''}
        </div>
    );
}

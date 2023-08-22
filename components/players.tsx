import styles from '@/styles/players.module.css';
import { useEffect } from 'react';
import { ADMIN, User } from '@/lib/types';



export default function Players({ users, target, onUserClick = () => { } }: { users: User[], target?: String, onUserClick?: any }) {

    const getColor = (name: string) => target === name ? '#f59a6f' : 'white';
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {
                    !users || users?.length === 0 ? <div className={styles.loading}>loading...</div> : (
                        users.map(r => <span onClick={onUserClick} className={styles.item} style={{ color: getColor(r.name), borderColor: getColor(r.name) }} key={r.id}>{r.name}</span>)
                    )
                }
            </div>
        </div>
    );
}

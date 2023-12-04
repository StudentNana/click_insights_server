import Link from 'next/link';
import styles from './topbar.module.scss';

export default function Topbar() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <ul className={`menu menu-horizontal px-1 ${styles.menu}`}>
                    <li>
                        <Link href="/" className={styles.link}>Home</Link>
                    </li>
                    <li>
                        <Link href="/karriere" className={styles.link}>Karriere</Link>
                    </li>
                    <li>
                        <Link href="/insights" className={styles.link}>Insights</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};
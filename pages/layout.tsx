import Link from 'next/link';
import '../styles/globals.module.scss';
import Topbar from '@/components/topbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de">
            <body>
                {/* <nav>
                    <Link href="/">Home</Link>
                    <Link href="/karriere">Karriere</Link>
                    <Link href="/insights">Insights</Link>
                </nav> */}
                <Topbar/>
                {children}
            </body>
        </html>
    )
}
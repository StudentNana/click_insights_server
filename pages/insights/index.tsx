import Link from 'next/link';

import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'

import HeaderInsightPage from '@/components/sections/insightPage/headerInsightPage';
import FooterInsightPage from '@/components/sections/insightPage/footerInsightPage';
import ArrowRightIcon from '@/components/icons/icon-arrow-right';
import { Insight, insightMapper } from '@/lib/model';

import 'foundation-sites/dist/css/foundation.css';
import styles from '../../styles/main.module.scss';
import blocklist from '../../styles/blocklist.module.scss'

/*  
  * Dynamic Server Side Rendering (SSR)
*/
export default function InsightPage({ insights }: { insights: Insight[] }) {

    return (
        <>
            <main>
                <section id="content" className={styles.bg}>

                    <HeaderInsightPage />

                    {/* START BLOCKLIST */}
                    <div className={`grid-container ${styles.py_4}`}>
                        <div className="grid-x align-center">
                            <div className="cell small-11 xlarge-10">
                                <div className="grid-container full">
                                    <div className="grid-x grid-margin-x grid-margin-y align-center" >

                                        {insights.map((insight: Insight) => (
                                            <div className={`${blocklist.blocklist} cell small-12 medium-6 large-4 text-decoration-none`} title={insight.title} key={insight.id}>

                                                {/* encodeURIComponent is used in the example to keep the path utf-8 compatible. */}
                                                <Link href={`/insights/${encodeURIComponent(insight.slug)}`}>
                                                    {/* <h1 className="text-3xl font-bold hover:underline">{insight.title}</h1> */}
                                                    <picture>
                                                        <img src={insight.image} width='500px' height='300px' alt={insight.slug} loading="lazy" />
                                                    </picture>

                                                    <div className={`${styles.author} ${styles.px_2}`}>
                                                        <picture className={styles.author__image}>
                                                            <img src='/test.jpg' width='60px' height='60px' alt='author_name' loading="lazy" />
                                                        </picture>

                                                        <span className={`${styles.author__name} ${styles.font_size_xxsmall}`}>{insight.author}</span>
                                                    </div>

                                                    <div className={`pt-1 ${styles.pb_2} ${styles.px_2}`}>
                                                        <p className={`${styles.color_blue_light} mt-0 ${styles.mb_1}`}>{insight.title}</p>
                                                        <small className={styles.small}> {insight.keywords} </small>
                                                        <p className={`${styles.color_blue_light} ${styles.mt_1}`}>
                                                            <small>{insight.button_label}
                                                                <i className="icon"> <ArrowRightIcon /> </i>
                                                            </small>
                                                        </p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* END BLOCKLIST */}

                    <FooterInsightPage />

                </section>
            </main>
        </>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // const url: string = 'http://localhost:8055';
    const url: string = process.env.DIRECTUS_URL || '';
    // const url: string = 'https://b3df-2a02-8109-9303-a400-3dbe-9f0a-cd9b-e2db.ngrok-free.app';
    try {
        const record = await directus.request(readItems('insights', {
            limit: -1,
            fields: ['*', 'author_id.*.*']
        }));
        const insights: Insight[] = record.map(insightMapper);

        if (!insights) {
            return {
                notFound: true
            }
        }

        // TODO: format image url
        insights.forEach((insight) => {
            // insight.image = `${process.env.DIRECTUS_URL}/assets/${insight.image}`;
            insight.image = `${url}/assets/${insight.image}`;
        });

        return {
            props: {
                insights
            }
        }
    } catch (error) {
        console.error('Error fetching Insights:', error)
        return {
            notFound: true
        }
    }
}
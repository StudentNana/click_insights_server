import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';

import { Insight } from '../../../lib/model'
import ArrowLeftIcon from '@/components/icons/icon-arrow-left';
import getInsightContent from '@/lib/getInsightContent';

import 'foundation-sites/dist/css/foundation.css';
import styles from '../../../styles/main.module.scss';

export  default function Page() {

    const url: string = 'http://localhost:8055';
    // const url: string = 'https://b3df-2a02-8109-9303-a400-3dbe-9f0a-cd9b-e2db.ngrok-free.app';
    // const url: string | undefined = process.env.DIRECTUS_URL;
    const { query } = useRouter();
    const [insight, setInsight] = useState<Insight | undefined>(undefined);
    
    useEffect(() => {
        if (query?.slug) {
            getInsightContent(query?.slug)
            .then(insight => {
                // TODO: format image url
                if (insight) {
                    insight.image = `${url}/assets/${insight?.image}`;
                    setInsight(insight);
                }
            })
            .catch((error) => {
                console.error('Error', error);
            })
        }
    }, [query?.slug]);

    return (
        <>
            <section id="content" className="bg">
                <div className={`${styles.pt_6} grid-container`}>
                    <div className="grid-x grid-padding-x align-center">
                        <div className="cell small-11 large-10">
                            <div className={`${styles.mb_3} grid-x`}>
                                <div className="cell small-12 medium-10 xlarge-9">
                                    <Link href="/insights" className="text-decoration-none font-size-small"><i className="icon icon--left"> </i>
                                        <ArrowLeftIcon /> 
                                            Alle Artikel ansehen
                                    </Link>
                                </div>
                            </div>
                            <div className={`${styles.mb_4} grid-x`}>
                                <div className="cell small-12 medium-10 xlarge-9">
                                    <h1 className={styles.font_size_super}>{insight?.title}</h1>
                                    <h2 className={`${styles.font_size_medium} mb-2`}> {insight?.keywords}</h2>
                                    <picture>
                                        <img src={insight?.image} width="1280" height="720" alt="Conversions im Onlinemarketing" loading="lazy" />
                                    </picture>

                                    <div className={`${styles.author} is--detail px-2`}>
                                        <picture className={styles.author__image}>
                                            <img src="/test.jpg" width="200" height="200" alt="author_pic" loading="lazy" />
                                        </picture>
                                        <span className={`${styles.author__name} font_size_xsmall`}>{insight?.author}</span>
                                    </div>

                                </div>
                            </div>

                            <div className="grid-x pb-4">
                                <div className="cell small-12 medium-10 xlarge-9">
                                    <div dangerouslySetInnerHTML={{ __html: insight?.content }}></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </section>
        </>
    );
}
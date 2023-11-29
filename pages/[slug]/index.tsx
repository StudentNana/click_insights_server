import { useRouter } from 'next/router'
import { Insight } from '../../lib/model'
import 'foundation-sites/dist/css/foundation.css';
import directus from '../../lib/directus';
import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import getInsightContent from '@/lib/getInsightContent';
import styles from '../../styles/Home.module.scss';
import Link from 'next/link';

export  default function Page() {

    const url: string = 'https://b3df-2a02-8109-9303-a400-3dbe-9f0a-cd9b-e2db.ngrok-free.app';
    // const url: string = 'http://localhost:8055';
    const { query } = useRouter();
    // const router = useRouter();
    const [insight, setInsight] = useState<Insight | undefined>(undefined);

    useEffect(() => {
        if (query?.slug) {
            getInsightContent(query?.slug)
            .then(insight => {
                console.log('insight useEffect', insight);
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
    }, [query?.slug])

    return (
        <>
            <section id="content" className="bg">
                {/* <p>Slug: {JSON.stringify(insight, null, 4)}</p> */}

                <div className="grid-container pt-6">
                    <div className="grid-x grid-padding-x align-center">
                        <div className="cell small-11 large-10">
                            <div className="grid-x  mb-3">
                                <div className="cell small-12 medium-10 xlarge-9">
                                    <Link href="/" title="Alle Artikel ansehen" className="text-decoration-none font-size-small"><i className="icon icon--left"> </i>Alle Artikel ansehen</Link>
                                </div>
                            </div>
                            <div className="grid-x mb-4">
                                <div className="cell small-12 medium-10 xlarge-9">
                                    <h1 className="font-size-super">{insight?.title}</h1>
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


// async function getPost(slug: string | string[] | undefined) {
//     try {
//         console.log('SLUG GET POST', slug)
//         const record = await directus.request(
//             readItems('insights', {
//                 filter: {
//                     slug: {
//                         _eq: slug,
//                     },
//                 }
//             }
//             ));

//         const post: Insight[] = record.map(insightMapper);
//         return post;

//     } catch (error) {
//         notFound();
//     }
// }




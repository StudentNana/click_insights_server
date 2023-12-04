import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';

import getJobAdvertisement from '@/lib/getJobAdvertisements';
import { JobAdvertisement } from '@/lib/model';
import HeaderCareerPage from '@/components/sections/careerPage/headerCareerPage';
import styles from '../../../styles/main.module.scss';

export default function Page() {
    const [isLoading, setLoading] = useState(true);
    const { query } = useRouter();
    const [job, setJob] = useState<JobAdvertisement | undefined>(undefined);

    useEffect(() => {
        if (query?.slug) {
            getJobAdvertisement(query?.slug)
                .then(job => {
                    setJob(job);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error', error.message);
                })
        }
    }, [query?.slug]);

    if (!isLoading && !!job) {
        return (
            <>
                <HeaderCareerPage title={job.headline} subline={job.subline} />
                <div className={`grid-container ${styles.padding_top_3}`}>
                    <div className="grid-x grid-padding-x align-center">
                        <div className="cell small-11 large-10">
                            <div className="grid-x grid-padding-x">
                                <div className="cell medium-8 text-align-left">
                                    <p className={styles.h2}>Das machst du bei uns</p>
                                    <div dangerouslySetInnerHTML={{ __html: job?.todo_bullets }}></div>
                                </div>

                                <div className="cell medium-8 text-align-left">
                                    <p className={styles.h2}>Das hast du drauf</p>
                                    <div dangerouslySetInnerHTML={{ __html: job?.knowhow_bullets }}></div>
                                </div>

                                {job?.benefit_bullets && <div className="cell medium-8 text-align-left" >
                                    <p className={styles.h2}>Das bieten wir dir</p>
                                    <div dangerouslySetInnerHTML={{ __html: job?.benefit_bullets }}></div>
                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className='grid-x grid-padding-x align-center' style={{ display: 'flex', justifyContent: 'center' }}>
                <DotLoader 
                    size={40}
                    color={"#006dfb"}
                    loading={isLoading}
                    speedMultiplier={1}
                />
            </div>
        )
    }
}
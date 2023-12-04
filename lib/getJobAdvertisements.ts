import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

import { JobAdvertisement, jobAdvertisementMapper } from './model';
import directus from './directus';

export default async function getJobAdvertisement(slug: string | string[]) {
    try {
        const record: Record<string, any>[] = await directus.request(
            readItems('job_advertisements', {
                filter: {
                    slug: {
                        _eq: slug,
                    }
                }
            })
        );
        const job: JobAdvertisement[] = record.map(jobAdvertisementMapper);
        if (job.length) {
            return job[0];
        } else {
            console.log('Error', error.message);
            notFound();
        }
    } catch (error) {
        console.log('Error', error.message);
    }
}

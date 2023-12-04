import { readItems } from '@directus/sdk';
import { notFound } from 'next/navigation';

import directus from './directus';
import { Insight, insightMapper } from './model';

export default async function getInsightContent(slug: string | string[]) {
    try {
        const record: Record<string, any>[] = await directus.request(
            readItems('insights', {
                filter: {
                    slug: {
                        _eq: slug,
                    },
                }
            }
            ));
            const post: Insight[] = record.map(insightMapper);
            if (post.length){
                return post[0];
            } else {
                notFound();
            }
    } catch (error) {
        return notFound();
        // console.error(error.message)
        // return Promise.resolve({})
    }
}
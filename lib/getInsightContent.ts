import { readItems } from '@directus/sdk';
import directus from './directus';
import { Insight } from './model';
import { notFound } from 'next/navigation';
import { useRouter } from 'next/router';

export default async function getInsightContent(slug: any) {
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
                console.log('slug', slug)
                notFound();
            }
    } catch (error) {
        return notFound();
        // console.error(error.message)
        // return Promise.resolve({})
    }
}

const insightMapper = (record: Record<string, any>): Insight => ({
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    author: record.author,
    content: record.content,
    slug: record.slug,
    image: record.image,
    button_label: record.button_label
})
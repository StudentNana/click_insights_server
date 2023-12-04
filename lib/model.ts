export type Insight = {
    id: number,
    title: string,
    subtitle: string,
    author: string,
    content: string,
    image: string,
    button_label: string,
    slug: string,
    keywords: string
};

export type JobAdvertisement = {
    id: number,
    title: string,
    slug: string,
    keywords: string,
    headline: string,
    subline: string,
    todo_bullets: string,
    knowhow_bullets: string,
    benefit_bullets: string
}

export const jobAdvertisementMapper = (record: Record<string, any>): JobAdvertisement => ({
    id: record.id,
    title: record.title,
    slug: record.slug,
    keywords: record.keywords,
    headline: record.headline,
    todo_bullets: record.todo_bullets,
    knowhow_bullets: record.knowhow_bullets,
    subline: record.subline,
    benefit_bullets: record.benefit_bullets
})

export const insightMapper = (record: Record<string, any>): Insight => ({
    id: record.id,
    title: record.title,
    subtitle: record.subtitle,
    author: record.author,
    content: record.content,
    slug: record.slug,
    image: record.image,
    button_label: record.button_label,
    keywords: record.keywords
})

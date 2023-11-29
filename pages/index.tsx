import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import 'foundation-sites/dist/css/foundation.css';
import styles from '../styles/Home.module.scss';
import blocklist from '../styles/components_blocklist.module.scss'
import Link from 'next/link';
import HeaderInsightPage from '@/components/headerInsightPage';
import FooterInsightPage from '@/components/footerInsightPage';

type Insight = {
  id: number,
  title: string,
  subtitle: string,
  author: string,
  content: string,
  image: string,
  button_label: string,
  slug: string
}


/*  
  * Dynamic Server Side Rendering (SSR)
*/
export default function Home({ insights }: { insights: Insight[] }) {

  return (
    <>
      <main>
        <section id="content" className={styles.bg}>

          <HeaderInsightPage/>

          {/* START BLOCKLIST */}
          <div className="grid-container py-4">
            <div className="grid-x align-center">
              <div className="cell small-11 xlarge-10">
                <div className="grid-container full">
                  <div className="grid-x grid-margin-x grid-margin-y align-center" >

                    {insights.map((insight: Insight) => (
                      <div className={`${blocklist.blocklist} cell small-12 medium-6 large-4 text-decoration-none`} title="{{title}}" key={insight.id}>
                        
                        {/* encodeURIComponent is used in the example to keep the path utf-8 compatible. */}
                        <Link href={`/${encodeURIComponent(insight.slug)}`}>
                          {/* <h1 className="text-3xl font-bold hover:underline">{insight.title}</h1> */}
                          <picture>
                            <img src={insight.image} width='500px' height='300px' alt={insight.slug} loading="lazy" />
                          </picture>

                          <div className={styles.author}>
                            <picture className={styles.author__image}>
                              <img src='/test.jpg' width='60px' height='60px' alt='author_name' loading="lazy" />
                            </picture>

                            <span className={`${styles.author__name} ${styles.font_size_xxsmall}`}>{insight.author}</span>
                          </div>

                          <div className="px-2 pt-1 pb-2">
                            <p className={`${styles["color-blue-light"]} mt-0 mb-1`}>{insight.title}</p>
                            <small>Perfomance-Marketing / Lead-Generierung / SEO / UI/UX </small>
                            <p className={`${styles["color-blue-light"]}mt-1`}>
                              <small>{insight.button_label}
                                <i className="icon"> -- </i>
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

          <FooterInsightPage/>

        </section>
      </main>
    </>
  )
}
  
  // This gets called on every request
export async function getServerSideProps() {
  try {
    const record = await directus.request(readItems('insights', {
      limit: -1,
      fields: ['*']
    }));
    const insights: Insight[] = record.map(insightMapper);

    if (!insights) {
      return {
        notFound: true
      }
    }

    // format image url
    insights.forEach((insight) => {
      insight.image = `${process.env.DIRECTUS_URL}/assets/${insight.image}`;
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

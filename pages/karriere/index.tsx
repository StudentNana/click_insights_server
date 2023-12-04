import Link from 'next/link';

import directus from '@/lib/directus';
import { readItems } from '@directus/sdk';
import { JobAdvertisement, jobAdvertisementMapper } from '@/lib/model';
import ArrowRightIcon from '@/components/icons/icon-arrow-right';

import 'foundation-sites/dist/css/foundation.css';
import styles from '../../styles/main.module.scss';
import blocklistStyle from '../../styles/blocklist.module.scss';

export default function CareerPage({jobs}: {jobs: JobAdvertisement[]}) {
  return (
    <section id="content" className="bg">

      <div className="grid-container pt-5 pb-2 pt-medium-6 pb-medium-0">
        <div className="grid-x grid-padding-x align-center">
          <div className="cell small-11 large-10">
            <div className="grid-x">
              <div className="cell small-11 large-8 align-center">
                <h2 className={styles.headline}>Welcher Job wird Deiner?</h2>
                <p>Wir suchen Talente und Könner, die Herausforderungen mit Leidenschaft meistern und unsere Kunden mit Kreativität begeistern. Du musst kein Alleskönner sein, denn was Du nicht weißt, bringen wir Dir bei. Du musst nur neugierig sein – und stets auf der Suche nach unentdeckten Möglichkeiten.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* START BLOCKLIST */}
      <div className={`grid-container ${styles.py_4}`}>
        <div className="grid-x align-center">
          <div className="cell small-11 xlarge-10">
            <div className="grid-container full">
              <div className="grid-x grid-margin-x grid-margin-y align-center" >

                {jobs.map((job: JobAdvertisement) => (
                  <div className={`${blocklistStyle.blocklist} cell small-12 medium-6 large-4 text-decoration-none`} title={job.headline} key={job.id}> 

                    {/* encodeURIComponent is used in the example to keep the path utf-8 compatible. */}
                    <Link href={`/karriere/${encodeURIComponent(job.slug)}`}>
                      <div className={`pt-1 ${styles.pb_2} ${styles.px_2}`}>
                        <p className={`${styles.color_blue_light} mt-0 ${styles.mb_1}`}>{job.headline}</p>
                        <small className={styles.small}>{job.keywords} </small>
                        <p className={`${styles.color_blue_light} ${styles.mt_1}`}>
                          <small>Mehr erfahren
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

      <div className="grid-container pt-5 pb-2 pt-medium-6 pb-medium-0">
        <div className="grid-x grid-padding-x align-center">
          <div className="cell small-11 large-10">
            <div className="grid-x">
              <div className="cell small-11 large-8 align-center">
                <p className="h2">Du gehst noch zur Schule? Steckst mitten im Studium? Willst Dein Talent testen? Bewirb Dich bei uns als:</p>
                <ul>
                  <li>Werkstudent/in, wenn Du schon erste Erfahrungen hast&nbsp;</li>
                  <li>für ein Praktikum, wenn Du mehr Erfahrung brauchst</li>
                  <li>für ein Schülerpraktikum, wenn Du fürs Programmieren brennst und das in Deiner Bewerbung auch rüberkommt</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // const url: string = 'https://b3df-2a02-8109-9303-a400-3dbe-9f0a-cd9b-e2db.ngrok-free.app';
  const url: string = 'http://localhost:8055';
  try {
    const record = await directus.request(readItems('job_advertisements', {
      limit: -1,
      fields: ['*']
    }));
    const jobs: JobAdvertisement[] = record.map(jobAdvertisementMapper);

    if (!jobs) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        jobs
      }
    }
  } catch (error) {
    console.error('Error fetching Job Advertisements:', error)
    return {
      notFound: true
    }
  }
}
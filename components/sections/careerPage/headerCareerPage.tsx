import 'foundation-sites/dist/css/foundation.css';
import styles from '../../../styles/main.module.scss';

export default function HeaderCareerPage(props: {title: string, subline: string}) {
    return (
        <div className={`hero ${styles.bg_color_grey_dark}`} id="top">

            <div className="grid-container full aspect-small-5x4 aspect-medium-16x9 aspect-xlarge-21x9">

                <div className="grid-container">
                    <div className="grid-x grid-padding-x align-center align-middle hero__panel">
                        <div className="cell small-11 medium-11 large-10 pt-2">
                            <div className="grid-x">
                                <div className="cell small-11 medium-11 large-8">

                                    <h1 className={`m-0 ${styles.color_blue_light} ${styles.h1} ${styles.padding_top_3}`}>{props.title}</h1>

                                    <p className={`${styles.h3} color-white mt-1 mb-0`}>{props.subline}</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
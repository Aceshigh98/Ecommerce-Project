import React from 'react'
import Image from 'next/image'
import styles from './home.module.css'
import CigarCarousal from '../components/CigarCarousal/CigarCarousal'

const Home = () => {
  return (
  <>
      <div className={styles.introContainer}>
          <Image src="/cigarasset11.png" fill quality={100} alt=""></Image>
        <div className={styles.introTextContainer}>
          <h3>Taste the perfection</h3>
          <h1>Fresh Aroma <br/>Delicate Taste</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, asperiores recusandae ducimus eligendi voluptate odit saepe illum! Praesentium nulla eos dolor vel? Atque non adipisci ullam repellendus labore minus nostrum?</p>
          <button className={styles.button}>Shop Now</button>
        </div>
      </div>
      <div className={styles.showcaseContainer}>
          <CigarCarousal />
      </div>
      <div className={styles.detailsContainer}>
        <div>
          <Image src="/cigarasset10.png" fill quality={100} alt=""></Image>
        </div>
        <div className={styles.detailsTextContainer}>
          <h1>GREAT VIBES</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam, asperiores recusandae ducimus eligendi voluptate odit saepe illum! Praesentium nulla eos dolor vel? Atque non adipisci ullam repellendus labore minus nostrum?</p>
        </div>
      </div>
      <div className={styles.cigarOfMonthContainer}>
          <Image src="/cigarasset3.png" height={500} width={400} quality={100} alt=""></Image>
        <div className={styles.cigarOfMonthTextContainer}>
          <h1>CIGAR OF THE MONTH</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum vel cupiditate est repudiandae alias ipsum dolore a quo mollitia dolorem libero minus nam quibusdam adipisci consectetur, ex in quas. Vel?</p>
        </div>
    </div>
  </>
  )
}

export default Home

import React from "react";
import Image from "next/image";
import styles from "./home.module.css";
import CigarCarousal from "../components/SignatureSelects/Selects";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <div className={styles.introContainer}>
        <Image src="/cigarasset11.png" fill quality={100} alt="cigars"></Image>
        <div className={styles.introTextContainer}>
          <h3>Taste the perfection</h3>
          <h1>
            Fresh Aroma <br />
            Delicate Taste
          </h1>
          <p>
          At our shop, we take pride in offering an exceptional selection of cigars that cater to true connoisseurs and newcomers alike, featuring the top brands renowned for their outstanding quality, taste, and aroma. 
          </p>
          <Link href={"/shop"}>
            <button className={styles.button}>Shop Now</button>
          </Link>
        </div>
      </div>
      <div className={styles.showcaseContainer}>
        <CigarCarousal />
      </div>
      <div className={styles.detailsContainer}>
        <div>
          <Image src="/cigarasset10.png" fill quality={100} alt="bourbon and cigars" sizes="(max-width: 768px) 100vw, 50vw"
          priority></Image>
        </div>
        <div className={styles.detailsTextContainer}>
          <h1>GREAT VIBES</h1>
          <p>
          Smoking a great cigar is more than just a pastime; it&apos;s a moment of pure relaxation and indulgence that allows you to savor the finer things in life. As you light up and take that first draw, a sense of calm washes over you, releasing the tension of the day and inviting you to slow down and enjoy the present. The rich, complex flavors of a well-crafted cigar dance across your palate, each puff unfolding new layers of taste that complement a good conversation, a quiet evening, or a reflective moment alone. With every inhale, you&apos;re not just smoking a cigar you&apos;re embracing a ritual that enhances your time, turning it into a luxurious experience of peace and enjoyment.
          </p>
        </div>
      </div>
      <div className={styles.cigarOfMonthContainer}>
        <Image
          src="/cigarasset3.png"
          height={500}
          width={400}
          quality={100}
          alt=""
        ></Image>
        <div className={styles.cigarOfMonthTextContainer}>
          <h1>View our Inventory</h1>
          <p>
          Our shop proudly carries a wide variety of cigar brands, wrappers, and sizes to suit every preference, from mild to full-bodied experiences. We feature renowned names such as Cohiba, Montecristo, Arturo Fuente, Padron, and Romeo y Julieta, alongside other top brands celebrated for their quality and craftsmanship. Whether you&apos;re looking for a classic favorite or something new to explore, our diverse selection offers something for every cigar enthusiast.
          </p>
          <Link href={"/shop"}>
            <button className={styles.button}>Shop Now</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;

import Head from 'next/head'
import Image from 'next/image'
import Nav from '../Components/Nav'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import Hero from '../Components/Home/Hero';
import Features from './../Components/Home/Features';
import Pricing from './../Components/Home/Pricing';
import Feedback from './../Components/Home/Feedbacks';
import Footer from '../Components/Home/Footer';

// import tawkTo from "tawkto-react";
import { useEffect } from 'react';



export default function Home() {
  // const tawkToPropertyId = '612c7752d6e7610a49b2a468'
  // const tawkToKey = '059bcfd62e4f34471dea3fe7814caf25d8870d7d'

  useEffect(() => {
    // tawkTo(tawkToPropertyId, tawkToKey)

    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/612c7752d6e7610a49b2a468/1fear470q';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();

  }, [])

  

  return (
    <>

      <Head>
        <title>Easyviews | Boost your Twitch Channel</title>
        <meta name="description" content="Your journey to affiliate begins here, send viewers or followers to any twitch channel using  the safest twitch bots."></meta>
        <meta property="og:title" content="Easyviews | Boost your Twitch Channel"/> 
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0"></meta>
      </Head>

      <Nav/>
      <Hero/>
      <Features/>
      <Pricing/>
      <Feedback/>
      <Footer/>
    </>
  
  )
}

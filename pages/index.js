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

import tawkTo from "tawkto-react";
import { useEffect } from 'react';



export default function Home() {
  const tawkToPropertyId = '612c7752d6e7610a49b2a468'
  const tawkToKey = '059bcfd62e4f34471dea3fe7814caf25d8870d7d'

  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey)
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

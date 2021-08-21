import Head from 'next/head'
import Image from 'next/image'
import Nav from '../Components/Nav'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import Hero from '../Components/Home/Hero';
import Features from './../Components/Home/Features';
import Pricing from './../Components/Home/Pricing';
import Feedback from './../Components/Home/Feedbacks';





export default function Home() {
  return (
    <>
      <Nav/>
      <Hero/>
      <Features/>
      <Pricing/>
      <Feedback/>
    </>
  
  )
}

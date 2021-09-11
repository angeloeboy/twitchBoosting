
import '../styles/globals.css'
import { useRouter } from 'next/router';
import MainDashboard from '../Components/Dashboard/main-dashboard';
import tawkTo from "tawkto-react";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const tawkToPropertyId = '612f8bd5d6e7610a49b31cac'
  const tawkToKey = '1fegrkeue'

  useEffect(() => {
    tawkTo(tawkToPropertyId, tawkToKey)
  }, [])
  let router = useRouter();

  if(router.pathname.startsWith("/dashboard/")){
    return(
      <MainDashboard>
        <Component {...pageProps} />
      </MainDashboard>
      
      );

  }else{
    return <Component {...pageProps} />

  }
}

export default MyApp

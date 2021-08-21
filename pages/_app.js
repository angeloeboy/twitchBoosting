
import '../styles/globals.css'
import { useRouter } from 'next/router';
import MainDashboard from '../Components/Dashboard/main-dashboard';


function MyApp({ Component, pageProps }) {

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

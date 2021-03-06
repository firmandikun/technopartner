import type { NextPage } from 'next'

import Head from 'next/head'
import Layout from '../components/layout'
import CardProfile from '../components/molecules/cardprofile'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from "js-cookie";


const Home: NextPage = () => {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [point, setPoint] = useState("");
  const [saldo, setSaldo] = useState("");
  const [banner, setBanner] = useState([]);
  const [code, setQrcode] = useState("");


  const token = Cookies.get("token");



  const fetchData = async () => {

    //set axios header dengan type Authorization + Bearer token
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
    //fetch user from Rest API
    await axios.get("https://soal.staging.id/api/home", config)
    .then((response) => {

        //set response user to state
        // setUser(response.data);
         console.log(response.data.result)
         const data = response.data.result
        setGreeting(data.greeting)
        setName(data.name)
        setPoint(data.point)
        setSaldo(data.saldo)
        setBanner(data.banner)
        setQrcode(data.qrcode)
        
    })
}
 
    useEffect(() => {
      if(!token) {
        router.push('/user/login');
      }
        fetchData();
    }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Layout>
      <Head>
        <title>Technopartner</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />

      </Head>


      <div className="container">
            <div className="row">
                <div className="col-12 bg-profile">
                     <CardProfile say={greeting} title={name} saldo={saldo} point={point} qrcode={code} />
                </div>

                <div className="col-12">
                <Slider {...settings}>

                  {
                      banner.map((item) => {
                        return (
                              <div>
                                  <img src={item} className="img-fluid" alt="..." />
                              </div>
                        )
                      })
                  }

              </Slider>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Home

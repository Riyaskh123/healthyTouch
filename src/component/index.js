import '../App.css'
import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from "react-use/lib/useWindowSize";
import { Cloudinary } from "@cloudinary/url-gen";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Timeout, getAds } from '../Service';


// const ENDPOINT = "http://127.0.0.1:3005/";
const ENDPOINT = "http://192.168.1.47:3005/";

const settings = {
    showArrows: false,
    interval: 5000,
    dynamicHeight: false,
    stopOnHover: false,
    infiniteLoop: true,
    showStatus: false,
    transitionTime: 500,
    showThumbs: false,
    showIndicators: true,
    swipeable: true,
    emulateTouch: true,
    autoPlay: true,
};

export default function Index() {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);
    const [confelli, setConfelli] = useState(false);
    const [ads,setAds] = useState([])
    const socket = socketIOClient.connect(ENDPOINT);
    const { width, height } = useWindowSize();
    let _id = ''; 
    let cnt = 0; 

    useEffect(()=>{
        socket.on("start", data => {
            console.log(data);
            _id = data._id
            setStart(true);
        });
    
    
        socket.on("count", data => {
            console.log(data);
            if (data % 10 === 0) {
                setConfelli(true)
                setTimeout(() => {
                    setConfelli(false)
                }, 2000)
            }
            setCount(data);
            cnt = data
        });
    
        socket.on("timeout", data => {
            if (setStart) {
                let dt = {
                    Id: _id,
                    count: cnt
                }
                console.log(dt);
                Timeout(dt).then((res) => {
                    console.log(res);
                    setStart(false);
                    setCount(0)
                }).catch(err => {
                    console.log(err);
                })
                    setStart(false);
                    setCount(0)
            }
        });

        getAds().then((res)=>{
            setAds(res.ads)
        })

        // return ()=>{socket.disconnect()}
    },[])
    
    return (
        <>{!start ?
            <div className='carosels'>
                <Carousel {...settings}>
                    {ads.map((dt)=>(
                        <div key={dt._id}>
                        <img src={`${dt.imageURL}`} />
                    </div>
                    ))}
                    {/* <div>
                        <img src="https://www.shutterstock.com/image-vector/flash-sale-shopping-poster-banner-600nw-2147167211.jpg" />
                    </div>
                    <div>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwLIBeZ9QbnmtWL9h6J2e9Ufz3XbEdErR2cw&usqp=CAU" />
                    </div>
                    <div>
                        <img src="https://media.cnn.com/api/v1/images/stellar/prod/160505174531-18-coca-cola-anniversary.jpg?q=w_1600,h_900,x_0,y_0,c_fill/w_1280" />
                    </div> */}
                </Carousel>
                <div className='QRcontainer'>
                    <div>
                        <h2>SCAN QR</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500sk</p>
                    </div>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${window.location.href}addcustomer`} />
                </div>
            </div> :
            <div className="App">
                {/* <Confetti width={width} height={height} recycle={confelli} /> */}
                <h1>{count}</h1>
                <h2>{start ? 'Start pull up' : 'Thank you visit again'}</h2>
            </div>
        }
        {
            <div>
                
            </div>
        }
        </>
    )
}

import '../App.css'
import socketIOClient from "socket.io-client";
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from "react-use/lib/useWindowSize";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Timeout, getAds } from '../Service';
import pullbg from '../assets/pullupbg.jpg'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Modal from 'react-modal';
import { toast } from 'react-toastify';


// const ENDPOINT = "http://127.0.0.1:3005/";
const ENDPOINT = "http://192.168.1.47:3005/";

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return (
            <div className="timer">
                <div className="text">Too lale..</div>
            </div>);
    }

    return (
        <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
        </div>
    );
};



const settings = {
    showArrows: false,
    interval: 4000,
    dynamicHeight: false,
    stopOnHover: false,
    infiniteLoop: true,
    showStatus: false,
    transitionTime: 500,
    showThumbs: false,
    showIndicators: false,
    swipeable: true,
    emulateTouch: true,
    autoPlay: true,
};

export default function Index() {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);
    const [timer, setTimer] = useState(15);
    const [confelli, setConfelli] = useState(false);
    const [ads, setAds] = useState([])
    const [isModalOpen, setModalOpen] = useState(false)
    const [offerImage, setofferImage] = useState(``)



    const socket = socketIOClient.connect(ENDPOINT);
    const { width, height } = useWindowSize();
    let _id = '';
    let cnt = 0;

    useEffect(() => {
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
            setTimer((prevTimer) => prevTimer + 1)
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
                    setofferImage(res.offer.imageURL)
                    setModalOpen(true)

                    setTimeout(() => {
                        setStart(false);
                        setCount(0)
                        setModalOpen(false)
                    }, 8000)
                }).catch(err => {
                    console.log(err);
                    toast.error(err.response.data.message)
                    setStart(false);
                    setCount(0)
                    setModalOpen(false)
                })
            }
        });

        getAds().then((res) => {
            setAds(res.ads)
        })

        // return ()=>{socket.disconnect()}
    }, [])

    return (
        <>{!start ?
            <div className='carosels'>
                <Carousel {...settings}>
                    {ads.map((dt) => (
                        <div key={dt._id}>
                            <img src={`${dt.imageURL}`} />
                        </div>
                    ))}
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
            <div className="count" style={{ backgroundImage: `url(${pullbg})` }}>
                {/* <Confetti width={width} height={height} recycle={confelli} /> */}
                <div className='counterBase'>
                    <CountdownCircleTimer
                        key={timer}
                        isPlaying
                        strokeWidth={15}
                        duration={15}
                        rotation='clockwise'
                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                        colorsTime={[15, 10, 5, 0]}
                        color='#fff'
                        size={200}
                        isSmoothColorTransition
                    >
                        {renderTime}
                    </CountdownCircleTimer>
                </div>
                <h1>{count}</h1>
                <h2>{start ? 'Start pull up' : 'Thank you visit again'}</h2>
            </div>
        }
            <Modal
                isOpen={isModalOpen}
                style={modalStyles}
                contentLabel='Congratulations'
            >
                <img src={`${offerImage}`} />
            </Modal>
        </>
    )
}


const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
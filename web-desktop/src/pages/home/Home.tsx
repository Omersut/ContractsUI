import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Carousel, Spin, Splitter } from 'antd';
import Search from '../../components/search/Search';
import ExcursionList from '../../components/list/ExcursionList';
import { ContractsService } from '../../services/ContractsService';
import { ExcursionDetail } from '../../components/detail/ExcursionDetail';
import { useSpring, animated } from '@react-spring/web';
import Description from '../../components/description/Description';
import Booking from '../../components/booking/Booking';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { mdlSearchExcursionResponse } from '../../models/service-models/SearchExcursionResponse';
import { mdlExcursionDetail } from '../../models/domain/excursionDetail';
import { mdlExcursion } from '../../models/domain/excursion';
import './Home.css'
import mockup from "../../assets/img/mockup.png";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1050);

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1050);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const useMedium = () => {
  const [medium, setMedium] = useState(window.innerWidth <= 1500);

  useEffect(() => {
    const handleResize = () => {
      setMedium(window.innerWidth <= 1500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return medium;
};

export const Home = () => {
  const isMobile = useIsMobile();
  const isMedium = useMedium();
  const [searchExcursionResponse, setSearchExcursionResponse] = useState<mdlSearchExcursionResponse | undefined>();
  const [excursionDetail, setExcursionDetail] = useState<mdlExcursionDetail | undefined>();
  const [startAnimation, setStartAnimation] = useState(true);
  const [bookingActive, setBookingActive] = useState(false);
  const [listSpinActive, setListSpinActive] = useState(false);

  const carouselRef = useRef<any>(null);

  useEffect(() => setStartAnimation(true), []);

  const searchCallback = (response: mdlSearchExcursionResponse) => {
    setExcursionDetail(undefined);
    setSearchExcursionResponse(response);
  };

  const listCallback = async (excursion: mdlExcursion) => {
    setListSpinActive(true);
    const response = await ContractsService.GetExcursionDetails({
      offerId: excursion.offerId,
      searchId: searchExcursionResponse?.metadata?.searchId || '',
    });

    setListSpinActive(false);
    if (response?.data) {
      setExcursionDetail({ detail: excursion, offers: response.data });
    }
  };

  const searchPanelAnimation = useSpring({
    opacity: startAnimation ? 1 : 0,
    transform: startAnimation ? 'translateX(0)' : 'translateX(100%)',
    config: { tension: 180, friction: 32, duration: 600 },
  });

  const listPanelAnimation = useSpring({
    opacity: searchExcursionResponse?.data?.items ? 1 : 0,
    transform: searchExcursionResponse?.data?.items ? 'translateX(0)' : 'translateX(-100%)',
    config: { tension: 200, friction: 40, duration: 600 },
  });

  const detailPanelAnimation = useSpring({
    opacity: excursionDetail ? 1 : 0,
    transform: excursionDetail ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 220, friction: 30, duration: 800 },
  });

  const backgroundImageAnimation = useSpring({
    opacity: excursionDetail ? 1 : 0,
    transform: excursionDetail ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 200, friction: 30, duration: 1000 },
  });

  return (
    <>
      {isMobile ? <>
        <div>
          <Card>
            <Search callback={(response) => { carouselRef.current?.goTo(1); searchCallback(response) }} />
          </Card>
        </div>
        <div >

          {searchExcursionResponse?.data?.items && (
            <Card >

              <ExcursionList list={searchExcursionResponse.data.items} callback={(response) => { listCallback(response) }} />
            </Card>
          )}
        </div>

        <div >

          {excursionDetail ? (
            <ExcursionDetail excursionDetail={excursionDetail} callback={(offer) => { localStorage.setItem('excursionDetail', JSON.stringify({ ...excursionDetail, selectedOffer: offer })); setBookingActive(true) }} />
          ) : <></>}
        </div>
        <div >

          {bookingActive && <Booking />}
        </div>


      </> : <Carousel ref={carouselRef}>
        <div>
          <Splitter style={styles.fullscreen}>
            <Splitter.Panel defaultSize="20%" resizable={false}>
              <animated.div style={searchPanelAnimation}>
                <Search callback={searchCallback} />
              </animated.div>
            </Splitter.Panel>
            {searchExcursionResponse?.data?.items && (
              <Splitter.Panel defaultSize={!isMedium ? "75%" : "25%"} resizable={false}>
                <Spin spinning={listSpinActive}>
                  <animated.div style={listPanelAnimation}>
                    <ExcursionList list={searchExcursionResponse.data.items} callback={listCallback} />
                  </animated.div>
                </Spin>
              </Splitter.Panel>
            )}
            <Splitter.Panel style={excursionDetail ? undefined : { ...styles.imageBack, opacity: startAnimation ? 1 : 0 }}>
              <Spin spinning={listSpinActive}>
                <animated.div style={{ ...detailPanelAnimation, ...backgroundImageAnimation }}>
                  {excursionDetail ? (
                    <ExcursionDetail excursionDetail={excursionDetail} callback={(offer) => { localStorage.setItem('excursionDetail', JSON.stringify({ ...excursionDetail, selectedOffer: offer })); setBookingActive(true); carouselRef.current?.goTo(1); }} />
                  ) : <></>}
                </animated.div>
              </Spin>
            </Splitter.Panel>
          </Splitter>
        </div>
        <div>
          <div style={{ margin: "10px", cursor: 'pointer', fontSize: '20px' }} onClick={() => { setBookingActive(false); carouselRef.current?.goTo(0); }}>
            <LeftOutlined />
          </div>
          {bookingActive && <Booking />}
        </div>
      </Carousel>}

    </>
  );
};

const styles = {
  fullscreen: { height: '100vh' },
  imageBack: {
    // backgroundImage: `url(${mockup})`,
    backgroundImage: `url(https://dev.sanoctopus.com/media/price-search/excursion/bg.jpeg`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

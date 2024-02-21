import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalAdsCount from './TotalAdsCount';
import { gridSpacing } from 'store/constant';
import {getAllAds,getAllUsers,getAllOffer} from '../../../utils/Service'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [adsCount, setAdsCount] = useState(0);
  const [offerCount, setOfferCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const getAdsCount = () => {
    getAllAds().then((res)=>{
    console.log(res.ads.length)
setAdsCount(res.ads.length)
    })
  }

  const getOfferCount = () => {
    getAllOffer().then((res)=>{
      console.log(res.offers.length)
setOfferCount(res.offers.length)
    })
  }

  const getUserCount = () => {
    getAllUsers().then((res)=>{
      console.log(res.users.length)
setUserCount(res.users.length)
    })
  }
  useEffect(() => {
    getAdsCount()
    getOfferCount()
    getUserCount()
    setLoading(false);
  }, []);



  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <EarningCard offerCount={offerCount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TotalOrderLineChartCard userCount={userCount} isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <TotalAdsCount allAdsCount={adsCount} isLoading={isLoading} />
          </Grid>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

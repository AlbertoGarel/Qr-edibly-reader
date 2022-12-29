import {useEffect} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';
// @ts-ignore
import {ADMOB_KEYS} from '@env'
// import {ADMOB_KEYS} from "../projectKeys";
// import {Sentry_Alert} from "../utils";

const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_KEYS.admod_SDK;

function AdMobBanner() {

    useEffect(() => {
        mobileAds()
            .initialize()
            .then(adapterStatuses => {
                if (__DEV__) console.log('ADMOB_BANNER:  Initialization complete!', adapterStatuses)
            })
            .catch(err => console.log('AdMobBanner.js', 'mobileAds', err))
    }, []);

    return (
        <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    );
};
export default AdMobBanner;
import {useEffect} from 'react';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import mobileAds from 'react-native-google-mobile-ads';
// @ts-ignore
import {ADMOB_KEYS_ADMOD_SDK} from '@env'
import {View} from "react-native";
// import {ADMOB_KEYS} from "../projectKeys";
// import {Sentry_Alert} from "../utils";

const adUnitId = __DEV__ ? TestIds.BANNER : ADMOB_KEYS_ADMOD_SDK;

type Props = {
    background: string
}

function AdMobBanner({background}: Props) {

    useEffect(() => {
        mobileAds()
            .initialize()
            .then(adapterStatuses => {
                if (__DEV__) console.log('ADMOB_BANNER:  Initialization complete!', adapterStatuses)
            })
            .catch(err => console.log('AdMobBanner.js', 'mobileAds', err))
    }, []);

    return (
        <View style={{backgroundColor: background}}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    );
};
export default AdMobBanner;
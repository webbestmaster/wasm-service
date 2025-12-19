import type {JSX} from "react";
import {type Location, useLocation} from "react-router-dom";
import {useScreenWidth} from "react-system-hook";

import {googleAdSenseTopAdId} from "../../../const";
import {AdSenseAds} from "../adsense/ad-sense-ads";
import * as bottomAdsWrapperStyle from "../bottom-ads-wrapper/bottom-ads-wrapper.scss";

export function TopAdsWrapper(): JSX.Element {
    const routerLocation: Location<unknown> = useLocation();
    const screenWidth = useScreenWidth();

    return (
        <div className={bottomAdsWrapperStyle.bottom_ads_wrapper__wrapper}>
            <AdSenseAds
                adSlotId={googleAdSenseTopAdId}
                // ignored className={topAdsWrapperStyle.top_ads_wrapper}
                key={`slug:${routerLocation.pathname + googleAdSenseTopAdId}-screen-width:${screenWidth}`}
            />
        </div>
    );
}

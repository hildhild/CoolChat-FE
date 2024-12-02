import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../assets/CoolChat Logo/5.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; 
import ZaloLogo from '../assets/Zalo.svg'; 

function DashboardFooter() {
    const { t } = useTranslation();

    return (
        <div className="bg-[#303030] text-white text-center font-semibold text-sm h-12 p-4">
            {t('copyright')}
        </div>
    );
}

export default DashboardFooter;

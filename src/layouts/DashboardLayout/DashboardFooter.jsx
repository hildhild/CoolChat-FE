import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function DashboardFooter() {
    const { t } = useTranslation();

    return (
        <div className="bg-[#303030] text-white text-center font-semibold text-sm h-12 p-4">
            {t('copyright')}
        </div>
    );
}

export default DashboardFooter;

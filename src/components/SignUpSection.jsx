import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from 'react-router-dom'
import SignUpPopup from "./SignUpPopup";
import { useSelector, useDispatch } from "react-redux";
import { changeSignupEmail } from "../store/slices/SignupDataSlice";
import SignupBg from "../assets/signupbg.jpg";

function SignUpSection() {
    const { t } = useTranslation();
    const email = useSelector(state => state.signupData.signupData.email);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [isSignUpPopupOpen, setIsSignUpPopupOpen] = useState(false);  

    const handleClosePopup = () => {
        setIsSignUpPopupOpen(false);
    };

    const handleChangeEmail = (e) => {
        dispatch(changeSignupEmail(e.target.value));
    }
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        // navigate('/sign-up');
        dispatch(changeSignupEmail(email));
        setIsSignUpPopupOpen(true);
    }

    return (
        <div id="sign-up" className={`px-[16px] bg-[url(${SignupBg})] bg-no-repeat bg-cover h-[281.6px] grid place-content-center`}>
            <div className="text-white font-semibold text-[24px] md:text-[32px] mb-[18px] text-center">{t('signup_free_trial_now')}</div>
            <form className="md:flex md:justify-center px-[16px] md:px-0" onSubmit={handleSubmitEmail}>
                <input name='email' type="email" className="rounded-lg px-[12px] pt-[11.2px] pb-[12.8px] mr-[16px] outline-none border-none w-full md:w-[374px]" placeholder="Email" onChange={handleChangeEmail} value={email}/>
                <input type="submit" className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 mt-[10px] md:mt-0 rounded-lg px-[16px] pt-[11.2px] pb-[12.8px] bg-[#4880FF] text-white cursor-pointer w-full md:w-[auto]" value={t('signup')}/>
            </form>
            <SignUpPopup isOpen={isSignUpPopupOpen} onClose={handleClosePopup}/>
        </div>
    );
}

export default SignUpSection;



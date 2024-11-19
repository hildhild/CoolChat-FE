import { useState } from "react";
import { useTranslation } from "react-i18next";
// import { useNavigate } from 'react-router-dom'
import SignUpPopup from "./SignUpPopup";
import { useSelector, useDispatch } from "react-redux";
import { changeSignupEmail } from "../store/slices/SignupDataSlice";

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
        <div id="sign-up" className="px-[16px] bg-[url(https://img.freepik.com/free-photo/smart-microchip-background-motherboard-closeup-technology-remix_53876-110820.jpg?t=st=1732003789~exp=1732007389~hmac=58ba1de0529d45ba69a6b7dfe4df774f4c8ca9fee3ad334bab81a26d1cc58aee&w=996)] bg-no-repeat bg-cover h-[281.6px] grid place-content-center">
            <div className="text-white font-semibold text-[24px] md:text-[32px] mb-[18px] text-center">Đăng ký dùng thử miễn phí ngay</div>
            <form className="md:flex md:justify-center px-[16px] md:px-0" onSubmit={handleSubmitEmail}>
                <input name='email' type="email" className="rounded-lg px-[12px] pt-[11.2px] pb-[12.8px] mr-[16px] outline-none border-none w-full md:w-[374px]" placeholder="Email" onChange={handleChangeEmail} value={email}/>
                <input type="submit" className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 mt-[10px] md:mt-0 rounded-lg px-[16px] pt-[11.2px] pb-[12.8px] bg-[#4880FF] text-white cursor-pointer w-full md:w-[auto]" value="Đăng ký"/>
            </form>
            <SignUpPopup isOpen={isSignUpPopupOpen} onClose={handleClosePopup}/>
        </div>
    );
}

export default SignUpSection;



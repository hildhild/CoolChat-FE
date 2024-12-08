import { useNavigate } from "react-router-dom";
import { VerifyEmailBody, HeaderAuthen, Footer } from "../components";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function VerifyEmail() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <>
            <HeaderAuthen/>
            <VerifyEmailBody/>
            <Footer/>
        </>
    );
}

export default VerifyEmail;



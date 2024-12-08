import { useSelector } from "react-redux";
import { ResetPasswordBody, HeaderAuthen, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ResetPassword() {
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
            <ResetPasswordBody/>
            <Footer/>
        </>
    );
}

export default ResetPassword;



import { useSelector } from "react-redux";
import { SignUpBody, HeaderAuthen, Footer } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Signup() {
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
            <SignUpBody/>
            <Footer/>
        </>
    );
}

export default Signup;



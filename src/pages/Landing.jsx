import { useSelector } from "react-redux";
import { LandingContent } from "../components";
import { DefaultLayout } from "../layouts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Landing() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <DefaultLayout>
            <LandingContent/>
        </DefaultLayout>
    );
}

export default Landing;



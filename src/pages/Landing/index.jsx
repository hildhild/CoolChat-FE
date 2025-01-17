import { useSelector } from "react-redux";
import LandingContent from "./LandingContent";
import { DefaultLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Landing() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const userRole = useSelector((state) => state.user.role);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken && userRole !== "AGENT") {
            navigate("/chatbot-training");
        } else if (accessToken && userRole === "AGENT") {
            navigate("/chat");
        }
    }, []);

    return (
        <DefaultLayout>
            <LandingContent/>
        </DefaultLayout>
    );
}

export default Landing;



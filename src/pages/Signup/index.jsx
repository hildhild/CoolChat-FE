import { useSelector } from "react-redux";
import SignUpBody from "./SignUpBody";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthenLayout } from "../../layouts";

function Signup() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <AuthenLayout>
            <SignUpBody/>
        </AuthenLayout>
    );
}

export default Signup;



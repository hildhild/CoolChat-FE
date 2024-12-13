import { useSelector } from "react-redux";
import { ResetPasswordBody } from "../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthenLayout } from "../layouts";

function ResetPassword() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    useEffect(()=> {
        if (accessToken) {
        navigate("/chatbot-training");
        }
    }, []);

    return (
        <AuthenLayout>
            <ResetPasswordBody/>
        </AuthenLayout>
    );
}

export default ResetPassword;



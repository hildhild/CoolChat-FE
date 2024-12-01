import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";


function SignUpBody() {
    const { t } = useTranslation();
    const recaptchaRef = React.useRef();
    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current.executeAsync();
    }

    return (
        <div className="w-full h-full lg:px-[256px] pt-[128px] pb-[64px] px-[32px] md:px-[64px]">
            
            <div className="w-full flex justify-center mb-[20px]">
                <img src={Logo} className="w-[50%] sm:w-[30%]"></img>
            </div>
            <div className="text-center w-full text-md">Tạo chatbot cực dễ với CoolChat.vn</div>
            <div className="text-center w-full text-md">- nền tảng mạnh mẽ tạo ra trải nghiệm đối thoại thông minh cho mọi doanh nghiệp.</div>
            <div className="flex justify-center items-center py-8">
                <div className="h-[1px] w-60 bg-slate-200"></div>
                <div className="text-coolchat font-semibold text-lg mx-5">ĐĂNG KÝ</div>
                <div className="h-[1px] w-60 bg-slate-200"></div>
            </div>
            <div className="px-40 mb-24">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input type="text" variant="bordered" label="Tên" placeholder="Nhập tên" className="mb-5"/>
                        <Input type="email" variant="bordered" label="Email" placeholder="Nhập email công ty" className="mb-5"/>
                        <Input type="password" variant="bordered" label="Mật khẩu" placeholder="Nhập mật khẩu" className="mb-5"/>
                    </div>
                    <div>
                        <Input type="text" variant="bordered" label="Số điện thoại" placeholder="Nhập số điện thoại" className="mb-5"/>
                        <Select 
                            variant="bordered"
                            label="Vai trò" 
                            className="mb-5" 
                            placeholder="Chọn vai trò"
                        >
                            <SelectItem key="admin">Quản trị viên</SelectItem>
                            <SelectItem key="csr">Nhân viên chăm sóc khách hàng</SelectItem>
                        </Select>
                        <Input type="password" variant="bordered" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu" className="mb-7"/>
                    </div>
                </div>
                <div className="text-[#676C70] mb-7 text-sm">Bằng cách đăng ký, bạn đồng ý với các <i className="text-coolchat underline">điều khoản dịch vụ</i> và <i className="text-coolchat underline">thông báo về quyền riêng tư</i> của chúng tôi.</div>
                <Button className="bg-coolchat w-full rounded-full text-white font-semibold mb-7" onClick={onSubmitWithReCAPTCHA}>TẠO TÀI KHOẢN MỚI</Button>
                <div className="mb-7 text-center w-full"><i>Đã có tài khoản hoặc gmail?</i> <i className="text-coolchat underline">Đăng nhập</i></div>
            </div>
            <div className="w-full flex flex-col items-center mb-[20px]">
                <img src={GoogleRecaptcha} className="w-[50%] sm:w-[30%]"></img>
                <div className="w-[500px] text-center">Trang web được bảo vệ bởi reCAPTCHA và <a href="https://policies.google.com/privacy" className="underline">Chính sách quyền riêng tư</a> và <a href="https://policies.google.com/terms" className="underline">Điều khoản dịch vụ</a> của Google được áp dụng.</div>
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />

        </div>
    );
}

export default SignUpBody;



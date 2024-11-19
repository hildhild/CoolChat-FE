import { useState } from "react";
import { useTranslation } from "react-i18next";

function SignUpBody() {
    const { t } = useTranslation();
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [ showmore, setShowmore ] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div className="w-full h-full lg:px-[256px] py-[64px] px-[32px] md:px-[64px] bg-[url(/signupBackground.jpg)]  bg-no-repeat bg-cover">
            <div className="mt-[0px] mx-[auto] h-full bg-white rounded-3xl">
                <div className="p-[24px] md:p-[32px]">
                    <div className="w-full flex justify-center mb-[20px]">
                        <img src="/auschainLogo.png" className="w-[50%] sm:w-[30%]"></img>
                    </div>
                    <div className="text-[24px] md:text-[32px] font-semibold md:py-[16px]">{t('Sign up')}</div>
                    <div className="pb-[16px]">{t('Blockchain based credential platform, designed to track and certify information in the agricultural value chain.')}</div>
                    <form>
                        <div>
                            <div className='font-semibold mb-[10px] flex'>Role<div className='text-[red] ml-[5px]'>*</div></div>
                            <select className='mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl outline-[#80AB3D]' name="email">
                                <option value="someOption">Producer</option>
                                <option value="otherOption">Collaborator</option>
                            </select>
                        </div>
                        <div>
                            <div className='font-semibold mb-[10px] flex'>Email<div className='text-[red] ml-[5px]'>*</div></div>
                            <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="email" name="email" placeholder={t('Enter your email')} value={email} onChange={handleChangeEmail}/>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="mr-[8px]">
                                <div className='font-semibold mb-[10px] flex'>{t('First name')}<div className='text-[red] ml-[5px]'>*</div></div>
                                <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="fname" placeholder={t("Enter your first name")}/>
                            </div>
                            <div>
                                <div className='font-semibold mb-[10px] flex'>{t('Last name')}<div className='text-[red] ml-[5px]'>*</div></div>
                                <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="lname" placeholder={t("Enter your last name")}/>
                            </div>
                        </div>
                        <div>
                            <div className='font-semibold mb-[10px] flex'>{t('Phone')}<div className='text-[red] ml-[5px]'>*</div></div>
                            <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="phone" placeholder={t("Enter your phone")}/>
                        </div>
                        {
                            showmore
                            &&
                            <div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('Date of birth')}</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="date" name="dateOfBirth" placeholder={t("Enter your date of birth")}/>
                                </div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('Address')} 1</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="address1" placeholder={t("Enter your address")}/>
                                </div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('Address')} 2</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="address2" placeholder={t("Enter your other address")}/>
                                </div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('Province')}</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="province" placeholder={t("Enter your province")}/>
                                </div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('City')}</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="city" placeholder={t("Enter your city")}/>
                                </div>
                                <div>
                                    <div className='font-semibold mb-[10px] flex'>{t('Invitation code')}</div>
                                    <input className='outline-[#80AB3D] mb-[20px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl' type="text" name="invitationCode" placeholder={t("Enter the invitation code")}/>
                                </div>
                            </div>
                        }
                        <button className="transition ease-in-out delay-100 duration-200 mb-[10px] text-[#80AB3D] font-semibold hover:text-[#65a30d]" onClick={(e) => {e.preventDefault(); setShowmore(showmore?false:true);}}>{showmore ? t('Show less...') : t("Show more...")}</button>
                        <input type="submit" className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 bg-[#80AB3D] text-white w-full cursor-pointer py-[10px] rounded-xl md:my-[20px] hover:bg-[#65a30d] flex items-center justify-center" value={t('Send request')}/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpBody;



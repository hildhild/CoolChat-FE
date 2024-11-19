import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupApi } from '../services/signupApi';
import { TailSpin } from 'react-loading-icons';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { useDispatch, useSelector } from 'react-redux';
import { changeSignupData } from '../store/slices/SignupDataSlice';
import Logo from "/src/assets/Logo TraceLook/Logo ngang/Logo ngang.png";

const SignUpPopup = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [role, setRole] = useState('Producer');
    const [loadingApi, setLoadingApi] = useState(false);
    const formInput = useSelector(state => state.signupData.signupData);
    // const [formInput, setFormInput] = useState({
    //     firstName: signupData.firstName,
    //     lastName: signupData.lastName,
    //     email: signupData.email,
    //     phoneNumber: signupData.phoneNumber,
    //     invitationCode: signupData.invitationCode,
    //     description: signupData.description,
    // });

    if (!isOpen) return null;

    const handleChangeRole = (e) => {
        setRole(e.target.value);
    };

    const handleInputChange = (e) => {
        const target = e.target;
        const field = target.name;
        const value = target.value;

        if (field == "firstName"){
            dispatch(changeSignupData({...formInput, firstName: value}));
        } 
        else if (field == "lastName"){
            dispatch(changeSignupData({...formInput, lastName: value}));
        }
        else if (field == "email"){
            dispatch(changeSignupData({...formInput, email: value}));
        }
        else if (field == "phoneNumber"){
            dispatch(changeSignupData({...formInput, phoneNumber: value}));
        }
        else if (field == "description"){
            dispatch(changeSignupData({...formInput, description: value}));
        }
        else if (field == "invitationCode") {
            dispatch(changeSignupData({...formInput, invitationCode: value}));
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoadingApi(true);
        let res = await signupApi(role, formInput.firstName, formInput.lastName, formInput.email, formInput.phoneNumber, formInput.invitationCode, formInput.description);
        // console.log('res', res);
        if (res && res.name == "SUCCESSFUL") {
            toast.success(res.message);
            dispatch(changeSignupData({ firstName: "", lastName: "", email: "", phoneNumber: "", invitationCode: "", description: "" }));
        } else {
            //error
            toast.error(res.data.message.msg ? res.data.message.msg : res.data.message);
        }
        setLoadingApi(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-[32px] md:px-0" onClick={onClose}> 
            <ToastContainer/>
            <div className=" bg-white shadow-lg w-full md:w-[60%] mx-auto relative rounded-lg p-[30px] bg-[url(https://res.cloudinary.com/agridential/image/upload/v1624953115/AGD_LandingPage/background-contact_pwzqps.svg)] bg-no-repeat bg-right-top" onClick={(e)=> e.stopPropagation()}>
                <button
                    className="absolute top-[20px] right-[20px] text-gray-600 hover:text-gray-900 z-10"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} className='text-[20px]'/>
                </button>
                <div className="w-full flex justify-center mb-[16px]">
                    <img src={Logo} className="w-[30%] md:w-[20%]"></img>
                </div>
                <div className='text-[20px] sm:text-[24px] font-bold mb-[16px]'>Sign up</div>
                <div className='hidden md:block pb-[16px] font-semibold text-[16px]'>{t('Blockchain based credential platform, designed to track and certify information in the agricultural value chain.')}</div>
                <form onSubmit={handleSignup}>
                    <div>
                        <div className='font-semibold mb-[5px] flex'>Role<div className='text-[red] ml-[5px]'>*</div></div>
                        <select className='mb-[10px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl outline-[#92bb53]' name="role" onChange={handleChangeRole} value={role}>
                            <option value="Producer">Producer</option>
                            <option value="Collaborator">Collaborator</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="mr-[8px]">
                            <div className='font-semibold mb-[5px] flex'>{t('First name')}<div className='text-[red] ml-[5px]'>*</div></div>
                            <input onChange={handleInputChange} className='outline-[#92bb53] mb-[10px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="firstName" placeholder={t("First name")} value={formInput.firstName}/>
                        </div>
                        <div>
                            <div className='font-semibold mb-[5px] flex'>{t('Last name')}<div className='text-[red] ml-[5px]'>*</div></div>
                            <input onChange={handleInputChange} className='outline-[#92bb53] mb-[10px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="lastName" placeholder={t("Last name")} value={formInput.lastName}/>
                        </div>
                    </div>
                    <div className="grid grid-cols-5">
                        <div className="col-span-3 mr-[8px]">
                            <div className='font-semibold mb-[5px] flex'>Email<div className='text-[red] ml-[5px]'>*</div></div>
                            <input onChange={handleInputChange} className='outline-[#92bb53] mb-[10px] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="email" name="email" placeholder={t("Email")} value={formInput.email}/>
                        </div>
                        <div className='col-span-2'>
                            <div className='font-semibold mb-[5px] flex'>{t('Phone')}<div className='text-[red] ml-[5px]'>*</div></div>
                            <input onChange={handleInputChange} className='mb-[10px] outline-[#92bb53] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="phoneNumber" placeholder={t("Phone")} value={formInput.phoneNumber}/>
                        </div>
                    </div>
                    {
                        role == 'Producer'
                        &&
                        <div>
                            <div className='font-semibold mb-[5px] flex'>
                                Description
                                <div className='text-[red] mx-[5px]'>*</div>
                                {/* <div 
                                    className='flex items-center cursor-pointer' 
                                    data-tooltip-id="my-tooltip" 
                                    data-tooltip-html="<div><div>Template:</div><div>[{'name':'...', 'type':'...', 'unit':'...', 'estimatePrice':'...'},...]</div></div>" 
                                    data-tooltip-place="top"
                                >
                                    <FontAwesomeIcon icon={faCircleQuestion} className='text-[#92bb53]'/>
                                </div>
                                <Tooltip id="my-tooltip"/> */}
                            </div>
                            <textarea onChange={handleInputChange} name="description" className='mb-[10px] w-full outline-none border-[1px] border-solid px-[15px] py-[5px] rounded-xl' placeholder={t('Description')} value={formInput.description}></textarea>
                        </div>
                    }
                    <div>
                        <div className='font-semibold mb-[5px] flex'>{t('Invitation code')}</div>
                        <input onChange={handleInputChange} className='outline-[#92bb53] w-full border-[1px] border-solid px-[15px] py-[5px] rounded-xl' type="text" name="invitationCode" placeholder={t("Invitation code")} value={formInput.invitationCode}/>
                    </div>
                    <button type='submit' className="flex mt-[16px] transition ease-in-out delay-100 hover:-translate-y-1 duration-200 rounded-lg bg-[#92bb53] text-white py-[5px] px-[20px] cursor-pointer hover:bg-[#7fab3d]">
                        {loadingApi && <TailSpin className='w-[20px] h-[20px] mr-[10px]'/>}
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPopup;

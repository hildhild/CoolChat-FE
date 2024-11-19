import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCircleUser, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const ConsultPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 px-[32px] md:px-0" onClick={onClose}> 
            <div className=" bg-white shadow-lg w-full md:w-[60%] mx-auto relative rounded-lg p-[30px] md:p-[60px] bg-[url(https://res.cloudinary.com/agridential/image/upload/v1624953115/AGD_LandingPage/background-contact_pwzqps.svg)] bg-no-repeat bg-right-top" onClick={(e)=> e.stopPropagation()}>
                <button
                    className="absolute top-[30px] right-[30px] md:top-[50px] md:right-[50px] text-gray-600 hover:text-gray-900 z-10"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} className='text-[20px] text-black'/>
                </button>
                <div className='text-[24px] font-bold text-black'>Quick consult</div>
                <div className="flex mt-[16px] mb-[24px]">
                    <a href="https://zalo.me/948448700" target="_blank" rel="noopener noreferrer" className="mr-4">
                        <img src='ZaloLogo.png' alt="Zalo" className="w-[40px] h-[40px]" />
                    </a>
                    <div className='h-[40px] flex items-center mr-4 text-gray-400'>
                        <div className='bg-white rounded-full size-[20px] text-[12px] flex justify-center items-center'>
                            Or
                        </div>
                    </div>
                    <a href="https://www.facebook.com/vietnamblockchaincorporation" target="_blank" rel="noopener noreferrer" className="mr-">
                        <img src='FacebookLogo.png' alt="Zalo" className="w-[40px] h-[40px]" />
                    </a>
                </div>
                <div className='pb-[30px] font-semibold text-[16px] text-black'>Sending information, we will contact you soon</div>
                <form>
                    <div className='flex border-b-[1px] border-black text-black'>
                        <FontAwesomeIcon icon={faCircleUser} className='text-[20px] p-[12px] text-black'/>
                        <input type='text' name='fullName' placeholder='Full name' className='bg-transparent outline-none w-full py-[12px] pr-[21px]'/>
                    </div>
                    <div className='flex border-b-[1px] border-black text-black'>
                        <FontAwesomeIcon icon={faPhoneVolume} className='text-[20px] p-[12px] text-black'/>
                        <input type='text' name='phoneOrEmail' placeholder='Phone number or Email' className='bg-transparent outline-none w-full py-[12px] pr-[21px]'/>
                    </div>
                    <div className='py-[16px] text-[#0f455d]'>You are interested in the application?</div>
                    <select className='mb-[32px] w-full border-[1px] border-solid px-[15px] py-[10px] rounded-xl outline-[#92bb53] text-black' name="application" defaultValue={"Production Area Management"}>
                        <option value="Traceability">Traceability</option>
                        <option value="Production Area Management">Production Area Management</option>
                        <option value="Supply Chain Management">Supply Chain Management</option>
                        <option value="Traceability Ecommerce">Traceability Ecommerce</option>
                    </select>
                    <input type='submit' value={"Send"} className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 rounded-lg bg-[#92bb53] text-white py-[10px] px-[20px] cursor-pointer hover:bg-[#7fab3d]"/>
                </form>
            </div>
        </div>
    );
};

export default ConsultPopup;

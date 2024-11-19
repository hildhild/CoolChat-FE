import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faGlobe, faMapMarkerAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'; // Corrected import for social media icons
import ZaloLogo from '../assets/Zalo.svg'; // Import Zalo logo
import bgContactImage from '../assets/bgcontact1.png';

const ContactPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Không render nếu popup chưa được mở

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 sm:p-8 overflow-auto" onClick={onClose}>
      <div
        className="relative bg-white shadow-lg w-full mx-auto p-2 flex flex-col lg:flex-row rounded-2xl max-h-full max-w-5xl overflow-y-auto"    //max-h-screen gây ko có padding y  
        // className="relative bg-white shadow-lg rounded-2xl p-3 flex flex-col lg:flex-row w-full  mx-auto max-h-screen overflow-y-auto " 
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
        >
        
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} size="2x" />
        </button>

        {/* Phần liên hệ (trái) */}
        <div 
          className="p-6 rounded-2xl order-2 lg:order-1 w-full lg:w-5/12 flex flex-col justify-between"
          style={{
            backgroundImage: `url(${bgContactImage})`,
            backgroundSize: 'cover', // Adjusts how the image is scaled
            backgroundPosition: 'center', // Centers the image
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="text-white text-lg md:text-2xl font-bold mb-4">Contact Information</h2>
            <div className="text-white space-y-6 text-[16px] mt-[36px]">
              <table className="table-auto text-left w-full">
                <tbody>
                  <tr>
                    <td className="pb-[24px] font-bold text-[16px] md:text-[18px]">Auschain Pty Ltd</td>
                  </tr>
                  <tr>
                    <td className="pb-[16px]">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-[16px]" /> (+61) 481 993 178
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-[16px]">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      <a href="mailto:contact@australiablockchain.au" className="text-[16px]">contact@australiablockchain.au</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-[16px]">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      <a href="https://australiablockchain.au" target="_blank" className="text-[16px]">australiablockchain.au</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="pb-[16px]">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[16px]" /> 81-83 Campbell, Surry Hills, NSW 2010, Australia
                    </td>
                  </tr>

                  {/* Song Long Group */}
                  {/* <tr className="mt-3">
                    <td className="font-bold pt-2 text-[16px] md:text-[18px]">Song Long Group</td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-[14px]" /> (+61) 431 690 985
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      <a href="mailto:longtran@songlong.au" className="text-[14px]">longtran@songlong.au</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      <a href="https://songlong.au" target="_blank" className="text-[14px]">songlong.au</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[14px]" /> PO Box 948, Sutherland NSW 1499, Australia
                    </td>
                  </tr> */}

                  {/* VBC */}
                  {/* <tr className="mt-3">
                    <td className="font-bold pt-2 text-[16px]  md:text-[18px]">VBC</td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faPhone} className="mr-2 text-[14px]" /> (+84) 28 6271 7798
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-[14px]" />
                      <a href="mailto:contact@vietnamblockchain.asia" className="text-[14px]">contact@vietnamblockchain.asia</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                      <a href="https://vietnamblockchain.asia/" target="_blank" className="text-[14px]">vietnamblockchain.asia</a>
                    </td>
                  </tr> */}
                  {/* <tr>
                    <td>
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-[14px]" /> 28/3 Lu Gia, Ward 15, District 11, Ho Chi Minh City
                    </td>
                  </tr> */}
                  <tr>{/* VBC Social Media Links */}
                    <div className="flex mt-[36px] space-x-[30px]">
                      <a href="https://www.youtube.com/channel/UC7k1WHzYlMhGzHJHH0yN1yQ" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-white hover:-translate-y-0.5">
                        <FontAwesomeIcon icon={faYoutube} className='text-[35px]' />
                      </a>
                      <a href="https://www.facebook.com/vietnamblockchaincorporation" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-white hover:-translate-y-0.5">
                        <FontAwesomeIcon icon={faFacebookSquare} className='text-[35px]' />
                      </a>
                      <a href="https://zalo.me/948448700" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px]">
                        <img src={ZaloLogo} alt="Zalo" className="w-[35px] h-[35px] transition duration-300 transform hover:scale-110 hover:-translate-y-0.5" />
                      </a>
                      <a href="https://www.linkedin.com/company/vietnamblockchain/" target="_blank" rel="noopener noreferrer" className="w-[35px] h-[35px] text-white hover:-translate-y-0.5">
                        <FontAwesomeIcon icon={faLinkedin} className='text-[35px]' />
                      </a>
                    </div>
                  </tr>
                </tbody>
                
              </table>
            </div>
          </div>
        </div>

        {/* Phần form (phải) */}
        <div className="p-6 order-1 lg:order-2 w-full lg:w-7/12">
          <h2 className="text-gray-800 mt-2 text-xl md:text-2xl font-bold mb-8">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-[15px] font-medium text-gray-800">Your Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 text-[14px] text-gray-800 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#94bc70]"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[15px] font-medium text-gray-800">Your Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 text-[14px] text-gray-800 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#94bc70]"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-[15px] font-medium text-gray-800">What application are you interested in?</label>
              <input
                type="text"
                id="subject"
                className="mt-1 text-[14px] text-gray-800 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#94bc70]"
                placeholder="Your interested application"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[15px] font-medium text-gray-800">Message</label>
              <textarea
                id="message"
                rows="4"
                className="mt-1 text-[14px] text-gray-800 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#94bc70]"
                placeholder="Write here your message"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#8bb768] w-40 text-white text-semibold py-2 px-4 mt-4 rounded-md hover:bg-[#80ac3e] hover:-translate-y-1 focus:outline-none focus:ring focus:ring-[#94bc70] w-full"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;

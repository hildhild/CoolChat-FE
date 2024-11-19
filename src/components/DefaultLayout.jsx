import Header from "./Header/Header";
import Footer from "./Footer";

function DefaultLayout({children}) {

    return (
        <div className='h-[100vh]'>
            <Header/>
            {children}
            <Footer/>
            
        </div> 
    );
}

export default DefaultLayout;



import '../footer/Footer.css';

function Footer() {
    return (
        <div className="footer">
            <div className='d-flex justify-content-around monospace p-3'>
                <div className='d-flex flex-column align-items-start'>
                    <div className='text-secondary'>
                        ABOUT
                    </div>
                    <div className='footer-links'>
                        Contact Us
                    </div>
                    <div className='footer-links'>
                        About Us
                    </div>
                    <div className='footer-links'>
                        ShopTurant Wholesale
                    </div>
                    <div className='footer-links'>
                        Corporate Information
                    </div>
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <div  className='text-secondary'>
                        HELP
                    </div>
                    <div className='footer-links'>
                        Payments
                    </div>
                    <div className='footer-links'>
                        Shipping
                    </div>
                    <div className='footer-links'>
                        Cancellation & Returns
                    </div>
                    <div className='footer-links'>
                        FAQ
                    </div>
                    <div className='footer-links'>
                        Report Infringement
                    </div>
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <div  className='text-secondary'>
                        CONSUMER POLICY
                    </div>
                    <div className='footer-links'>
                        Return Policy
                    </div>
                    <div className='footer-links'>
                        Terms Of Use
                    </div>
                    <div className='footer-links'>
                        Security
                    </div>
                    <div className='footer-links'>
                        Privacy
                    </div>
                    <div className='footer-links'>
                        EPR Compliance
                    </div>
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <div  className='text-secondary'>
                        MAIL US:
                    </div>
                    <div className='footer-address'>
                        Flipkart Internet Private Limited,
                    </div>
                    <div className='footer-address'> 
                        Buildings Alyssa, Begonia &
                    </div>
                    <div className='footer-address'>
                        Clove Embassy Tech Village,
                    </div>
                    <div className='footer-address'>
                        Outer Ring Road, Devarabeesanahalli Village,
                    </div>
                    <div className='footer-address'>
                        Bengaluru, 560103,
                    </div>
                    <div className='footer-address'>
                        Karnataka, India
                    </div>
                </div>
            </div>
            <h5 className='footerH4'>Copyright © 2023 ShopTurant</h5>
        </div>
    );
}
  
  export default Footer;
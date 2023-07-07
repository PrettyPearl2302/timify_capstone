import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
      <div className='footer-wrapper'></div>
        <div className="footer-section">
          <div>
              <h4>Company</h4>
              <div>
                  <p>About Us</p>
                  <p>Careers</p>
                  <p>Blog</p>
                  <p>Help</p>
              </div>
          </div>
        </div>
        <div className="footer-section">
          <div>
              <h4>Account</h4>
              <div>
                  <p>Login</p>
                  <p>Register</p>
                  <p>Account Setting</p>
                  <p>My Orders</p>
              </div>
          </div>
        </div>
        <div className="footer-section">
          <div>
              <h4>Socials</h4>
              <div>
                  <p>Facebook</p>
                  <p>Twitter</p>
                  <p>Linkedin</p>
                  <p>Instagram</p>
                  <p>Youtube</p>
              </div>
          </div>
        </div>
        <div className="footer-section">
          <div>
              <h4>Our App</h4>
              <div>
                <img className='footer-stores' src="/stores1.png" alt="app stores" />
              </div>
          </div>
        </div>
      </footer>
      </>
  );
}

export default Footer;
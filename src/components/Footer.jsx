import './Footer.css';

const Footer = ({ company_name }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} {company_name} | Designed by {company_name} Team
        </div>
      </div>
    </footer>
  );
};
// Footer js
export default Footer;

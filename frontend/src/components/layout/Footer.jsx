import styles from "./Footer.module.css";

import linkedin from '../../assets/img/linkedin.png'
import instagram from '../../assets/img/instagram.png'
import hopeLogo from '../../assets/img/logobranco.png'

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <img src={hopeLogo} alt="" /> */}
      <p>
        <span className="bold">Hope &copy; 2023</span> 
        <a 
          target="blank"
          href="https://www.linkedin.com/in/tcharles-fernando-rodrigues-a4b36020a/">
          <img src={linkedin} alt="" />
          Linkedin
        </a>
        <a 
          
          target="blank"
          href="https://www.instagram.com/">
          <img src={instagram} alt="" />
          Instagram</a>
      </p>
    </footer>
  );
}

export default Footer;

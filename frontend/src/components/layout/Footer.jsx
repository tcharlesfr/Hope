import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <span className="bold">Hope</span> &copy; 2023
        <a href="https://www.linkedin.com/in/tcharles-fernando-rodrigues-a4b36020a/">Linkedin</a>
      <a href="https://www.instagram.com/">Instagram</a>
      </p>
      
    </footer>
  );
}

export default Footer;

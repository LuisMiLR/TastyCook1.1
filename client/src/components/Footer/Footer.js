import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center p-20`}
    >
      <p className="mr-30">Copyright © 2023 TastyCook By LuisMiLR</p>  
      
    </footer>
  );
}

export default Footer;

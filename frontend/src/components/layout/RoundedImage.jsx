import styles from "./RoundedImage.module.css";

//componente generico que recebe os estilos proprios e passados pelas props
function RoundedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
}

export default RoundedImage;

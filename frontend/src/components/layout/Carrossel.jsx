import Carousel from "react-bootstrap/Carousel";

import foto1 from "../../assets/img/img2.png";
import foto2 from "../../assets/img/img3.png";

function UncontrolledExample() {
  return (
    <Carousel fade>
      <Carousel.Item>        
        <img className="d-block w-100" src={foto1} alt="" />        
      </Carousel.Item>
      <Carousel.Item>        
        <img className="d-block w-100" src={foto2} alt="" />        
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;

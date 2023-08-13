import Carousel from "react-bootstrap/Carousel";
// import ExampleCarouselImage from '../layout/ExampleCarouselImage';

import foto1 from "../../assets/img/img1.png";
// import foto2 from "../../assets/img/img3.png";
// import foto3 from "../../assets/img/img4.png";

function UncontrolledExample() {
  return (
    // className={styles.carrossel}
    <Carousel  fade>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img className="d-block w-100" src={foto1} alt="" />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img className="d-block w-100" src={foto1} alt="" />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img className="d-block w-100" src={foto1} alt="" />
        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;

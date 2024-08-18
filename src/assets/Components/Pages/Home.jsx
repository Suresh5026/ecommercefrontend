import { Col, Container, Row } from "react-bootstrap";
import Filter from "./Filter";
import Products from "./Products";

export default function Home(){
    return(
        <>
        <Container fluid>
            <Row>
                <Col sm={2}><Filter /></Col>
                <Col sm={10}><Products /></Col>
            </Row>
            
        </Container>
        </>
    )
}
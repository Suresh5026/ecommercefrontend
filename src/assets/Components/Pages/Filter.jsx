import { useContext, useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { ProContext } from "../../Context/ProContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Filter() {
  const { product } = useContext(ProContext);
  const [colors, setColors] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const uniqueColors = [...new Set(product.flatMap((prod) => prod.color))];
    const disCounts = [...new Set(product.map((prod) => prod.discount))];

    const priceRanges = {
      "0-200": "0-200",
      "200-600": "200-600",
      "600-800": "600-800",
      "800 and above": "800 and above"
    };

    setColors(uniqueColors);
    setDiscounts(disCounts);
    setAmounts(priceRanges);
  }, [product]);

  const handleFilterChange = (filterType, value) => {
    const queryParams = new URLSearchParams(location.search);

    if (value) {
      queryParams.set(filterType, value);
    } else {
      queryParams.delete(filterType);
    }

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div className="py-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Color</Accordion.Header>
          <Accordion.Body>
            {colors.map((color, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={color}
                onChange={(e) => handleFilterChange('color', e.target.checked ? color : '')}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Discount</Accordion.Header>
          <Accordion.Body>
            {discounts.map((discount, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={`${discount} % OFF`}
                onChange={(e) => handleFilterChange('discount', e.target.checked ? discount : '')}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion defaultActiveKey="0">
        <Accordion.Item>
          <Accordion.Header>Price</Accordion.Header>
          <Accordion.Body>
            {Object.keys(amounts).map((range, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={`Rs. ${range}`}
                onChange={(e) => handleFilterChange('price', e.target.checked ? range : '')}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

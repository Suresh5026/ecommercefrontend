import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProContext = createContext();

export const ProProvider = ({ children }) => {
  const [product, setProduct] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://ecommercebackend-oe27.onrender.com/product/getProducts');
        // console.log(response);
        
        const proData = response.data.data; 
        // console.log(proData);
        setProduct(proData);
        
      } catch (error) {
        console.error("Error fetching products data:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProContext.Provider value={{ product, setProduct }}>
      {children}
    </ProContext.Provider>
  );
};

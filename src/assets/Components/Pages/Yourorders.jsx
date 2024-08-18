import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Yourorders() {
  const headings = [
    "S.No",
    "Order_ID",
    "Product_Id",
    "Amount",
    "Status"
  ];
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
          throw new Error("User ID is not available in local storage");
        }

        const response = await axios.get(`http://localhost:5000/payment/orders/user/${userId}`);
        setOrders(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Table responsive>
      <thead>
        <tr>
          {headings.map((head, index) => (
            <th key={index}>{head}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <tr key={order._id}>
            <td>{index + 1}</td>
            <td>{order.orderId}</td>
            <td>{order.notes.productIds}</td>
            <td>Rs. {order.amount}</td>
            <td>{order.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

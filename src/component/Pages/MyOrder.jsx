import { useContext, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from "../AuthProvider/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("My Orders Report", 14, 15);

    const tableColumn = [
        "#",
      "Product Name",
      "Buyer Name",
      "Price",
      "Quantity",
      "Address",
      "Date",
      "Phone",
    ];

    const tableRows = orders.map((order, index) => [
      index + 1,
      order.productName,
      order.buyerName,
      `$${order.price}`,
      order.quantity,
      order.address,
      order.date,
      order.phone,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
    });

    doc.save("My orders product.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">
          My Orders
        </h2>

        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
          Download Report
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
        <table className="table w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Buyer Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Address</th>
              <th>Date</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.productName}</td>
                <td>{order.buyerName}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>{order.address}</td>
                <td>{order.date}</td>
                <td>{order.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
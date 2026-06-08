import { use, useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { AuthContext } from "../AuthProvider/AuthProvider";
import usePageTitle from "../../hooks/usePageTitle";

const MyOrders = () => {
  usePageTitle("My Orders");
  const { user, loading: authLoading } = use(AuthContext);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setOrdersLoading(true);
      fetch(`http://localhost:3000/orders?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setOrdersLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrdersLoading(false);
        });
    }
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
  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-green-600"></span>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">My Orders</h2>

        <button
          onClick={handleDownloadPDF}
          disabled={ordersLoading || orders.length === 0}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-2 rounded-lg transition"
        >
          {ordersLoading ? "Loading..." : "Download Report"}
        </button>
      </div>

      {/* Loading State */}
      {ordersLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-green-600"></span>
            <p className="mt-4 text-gray-600">Fetching your orders...</p>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      {!ordersLoading && (
        <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200">
          <table className="table w-full">
            <thead className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0">
              <tr>
                <th className="font-semibold py-4">#</th>
                <th className="font-semibold">Product Name</th>
                <th className="font-semibold">Buyer Name</th>
                <th className="font-semibold">Price</th>
                <th className="font-semibold">Quantity</th>
                <th className="font-semibold">Address</th>
                <th className="font-semibold">Date</th>
                <th className="font-semibold">Phone</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-gray-50 transition">
                  <td className="py-4 font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="text-gray-700">{order.productName}</td>
                  <td className="text-gray-700">{order.buyerName}</td>
                  <td className="font-semibold text-green-600">
                    ${order.price}
                  </td>
                  <td className="text-gray-700">{order.quantity}</td>
                  <td className="text-gray-600 text-sm">{order.address}</td>
                  <td className="text-gray-600">{order.date}</td>
                  <td className="text-gray-600">{order.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {!ordersLoading && (
        <div className="md:hidden space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
              <p>No orders found</p>
            </div>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md border-l-4 border-green-600 overflow-hidden hover:shadow-lg transition"
              >
                <div className="bg-gradient-to-r from-green-50 to-transparent p-4 flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm font-semibold">
                      Order #{index + 1}
                    </p>
                    <p className="text-lg font-bold text-green-600">
                      ${order.price}
                    </p>
                  </div>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Qty: {order.quantity}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="border-b border-gray-200 pb-3">
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                      Product Name
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {order.productName}
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-3">
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                      Buyer Name
                    </p>
                    <p className="text-gray-900 font-semibold">
                      {order.buyerName}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pb-3 border-b border-gray-200">
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                        Date
                      </p>
                      <p className="text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                        Phone
                      </p>
                      <p className="text-gray-900">{order.phone}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600 text-xs font-semibold uppercase tracking-wide mb-1">
                      Delivery Address
                    </p>
                    <p className="text-gray-900 text-sm">{order.address}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

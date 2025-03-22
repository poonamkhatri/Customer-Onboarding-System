import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/customers", formData);
      fetchCustomers();
      setFormData({ name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleSyncData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/customers/sync");
      alert("Sync successful: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

      {/* Add Customer Form */}
      <form onSubmit={handleAddCustomer} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="border p-2 w-full mb-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Customer
        </button>
      </form>

      {/* Customer List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sync Button */}
      <button onClick={handleSyncData} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Sync to External API
      </button>
    </div>
  );
};

export default Dashboard;

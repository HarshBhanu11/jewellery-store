import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="content">
        <h1>Welcome Admin 👋</h1>
        <p>Manage your products and messages.</p>
      </div>
    </div>
  );
}

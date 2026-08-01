import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Donor from "./pages/Donor";
import HealthScreening from "./pages/HealthScreening";
import ReceiverRegistration from "./pages/ReceiverRegistration";
import AvailableDonors from "./pages/AvailableDonors";
import Notifications from "./pages/Notifications";
import ReceiverNotifications from "./pages/ReceiverNotifications";
import PreDonationScreening from "./pages/PreDonationScreening";
import MyChats from "./pages/MyChats";
import ChatWindow from "./pages/ChatWindow";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/donor" element={<Donor />} />
      <Route path="/health-screening" element={<HealthScreening />} />
      <Route path="/receiver" element={<ReceiverRegistration/>} />
      <Route path="/available-donors" element={<AvailableDonors />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/receiver-notifications" element={<ReceiverNotifications />}/>
      <Route path="/pre-donation-screening/:requestId" element={<PreDonationScreening />}/>
      <Route path="/mychats" element={<MyChats />}/>
      <Route
  path="/chat/:chatId"
  element={<ChatWindow />}
/>
    </Routes>
  );
}

export default App;
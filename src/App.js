import logo from "./logo.svg";
import Nav from "./Components/navbar/navbar.jsx";
import Footer from "./Components/footer/footer.jsx";
// import MainPage from "./Pages/MainPage";
// import ProductPage from "./Pages/ProductPage";
// import BestSellers from "./Pages/BestSellers";
// import NewItems from "./Pages/NewItems";
// import Deals from "./Pages/Deals";
import UserProfilePage from "./Pages/ProfilePage/profile.jsx";
import SignUpPage from "./Pages/SignUp/signup.jsx";
import LoginPage from "./Pages/Login/login.jsx";
//import CartPage from "./Components/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          {/* <Route path="/" element={<MainPage />} />
          <Route path="/main-page" element={<MainPage />} />
          <Route path="/marketplace" element={<ProductPage />} />
          <Route path="/best-sellers" element={<BestSellers />} />
          <Route path="/all-new" element={<NewItems />} />
          <Route path="/deals-&-promotions" element={<Deals />} />*/}
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

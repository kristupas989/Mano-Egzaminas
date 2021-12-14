import Navbar from "./Navbar";
import Footer from "./Footer";
function Layout({ children }) {
  return (
    <div>
      <Footer />
      {children}
      <Navbar />
    
    </div>
  );
}

export default Layout;

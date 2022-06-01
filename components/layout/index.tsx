import Footer from "../organisms/footer";
import Header from "../organisms/header";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const Layout = (props: Partial<LayoutProps>) => {
  const { children } = props;



  return (
    <div className="position-relative">
    
     <Header />

      {children}

     <div className="fixed-bottom" >
       <Footer />
     </div>
  
    </div>
  );
};

export default Layout;

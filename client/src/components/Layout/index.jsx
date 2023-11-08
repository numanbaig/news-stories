import Header from "./header";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div className="max-h-screen overflow-y-scroll">
      <Header />
      <div className="mt-16 overflow-hidden">{children}</div>
    </div>
  );
};
export default Layout;

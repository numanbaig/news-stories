import Cookies from "universal-cookie";

const Header = () => {
  const cookie = new Cookies();
  const handleLogout = () => {
    cookie.remove("accessToken");
    cookie.remove("refreshToken");
    cookie.remove("CookieRefreshToken");
    cookie.remove("CookieAccesssToken");
    window.location.reload();
  };

  return (
    <div className="flex flex-row justify-between bg-[#d0d0d0] shadow-md shadow-[#c0c0c0]  w-full z-10 border-b-[1px] border-[#c0c0c0] px-10 py-5">
      <p className="text-[22px] font-bold">Newyork Times</p>
      <button
        className="border-[1px] bg-white border-[#b0b0b0] rounded-md px-3"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
export default Header;

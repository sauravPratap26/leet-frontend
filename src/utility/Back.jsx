import { ArrowLeft, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutButton from "../component/LogoutButton";
const BackWrapper = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const { authUser, avatar } = useAuthStore();
  return (
    <div className="h-screen flex flex-col w-full space-y-4 overflow-hidden">
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 py-3 px-2 md:px-4 flex items-center shadow-sm justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm md:text-base text-primary hover:text-primary/80 transition gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar flex flex-row "
          >
            <div className="w-10 rounded-full ">
              <img
                src={authUser?.image || `/assets/leetImages/${avatar}`}
                alt="User Avatar"
                className="object-cover"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-3"
          >
            <li>
              <p className="text-base font-semibold">{authUser?.name}</p>
            </li>
            <hr className="border-gray-200/10" />
            <li>
              <Link
                to="/profile"
                className="hover:bg-primary hover:text-white text-base font-semibold"
              >
                <User className="w-4 h-4 mr-2" />
                My Profile
              </Link>
            </li>
            <li>
              <LogoutButton className="hover:bg-primary hover:text-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </LogoutButton>
            </li>
          </ul>
        </div>
      </div>

      <div
        className="flex-1 overflow-auto px-2 md:px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {!isLogin ? (
          children
        ) : (
          <div className="w-full flex justify-center">
            <div className="w-9/10 max-w-4xl px-4">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BackWrapper;

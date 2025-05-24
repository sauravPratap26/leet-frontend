// components/BackWrapper.tsx
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackWrapper = ({ to = "/", children, label = "Back to Home" }) => {
  return (
    <div className="w-full space-y-4">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 py-3 px-2 md:px-4 flex items-center shadow-sm">
        <Link
          to={to}
          className="inline-flex items-center text-sm md:text-base text-primary hover:text-primary/80 transition gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{label}</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="px-2 md:px-4">{children}</div>
    </div>
  );
};

export default BackWrapper;

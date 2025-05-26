import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackWrapper = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col w-full space-y-4 overflow-hidden">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-base-100 border-b border-base-200 py-3 px-2 md:px-4 flex items-center shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm md:text-base text-primary hover:text-primary/80 transition gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content Scrollable Without Scrollbar */}
      <div
        className="flex-1 overflow-auto px-2 md:px-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`::-webkit-scrollbar { display: none; }`}</style>
        {children}
      </div>
    </div>
  );
};

export default BackWrapper;

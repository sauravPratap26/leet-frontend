const Logo = ({ width = 120, height = 80, className = "" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 120 80"
      className={className}
    >
      <svg
        width="180"
        height="120"
        viewBox="0 0 120 80"
        xmlns="http://www.w3.org/2000/svg"
        class=""
      >
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#60A5FA" stop-opacity="0.8"></stop>
            <stop offset="70%" stop-color="#3B82F6" stop-opacity="0.6"></stop>
            <stop offset="100%" stop-color="#1E40AF" stop-opacity="0.4"></stop>
          </radialGradient>
          <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="1"
              dy="2"
              stdDeviation="1.5"
              flood-color="#000000"
              flood-opacity="0.15"
            ></feDropShadow>
          </filter>
          <filter
            id="laptopShadow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow
              dx="2"
              dy="4"
              stdDeviation="3"
              flood-color="#000000"
              flood-opacity="0.25"
            ></feDropShadow>
          </filter>
        </defs>
        <rect
          x="0"
          y="45"
          width="120"
          height="35"
          fill="#F1F5F9"
          opacity="0.3"
        ></rect>
        <g transform="translate(15, 30)">
          <path
            d="M5 12 L35 10 L35 32 L5 34 Z"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            stroke-width="1"
            filter="url(#paperShadow)"
          ></path>
          <line
            x1="8"
            y1="15"
            x2="32"
            y2="13.5"
            stroke="#CBD5E0"
            stroke-width="0.7"
            opacity="0.5"
          ></line>
          <line
            x1="8"
            y1="18"
            x2="32"
            y2="16.5"
            stroke="#CBD5E0"
            stroke-width="0.7"
            opacity="0.5"
          ></line>
          <line
            x1="8"
            y1="21"
            x2="32"
            y2="19.5"
            stroke="#CBD5E0"
            stroke-width="0.7"
            opacity="0.5"
          ></line>
          <line
            x1="8"
            y1="24"
            x2="32"
            y2="22.5"
            stroke="#CBD5E0"
            stroke-width="0.7"
            opacity="0.5"
          ></line>
          <line
            x1="8"
            y1="27"
            x2="32"
            y2="25.5"
            stroke="#CBD5E0"
            stroke-width="0.7"
            opacity="0.5"
          ></line>
          <g transform="translate(12, 28) rotate(-5)">
            <ellipse
              cx="7"
              cy="2.5"
              rx="7"
              ry="0.8"
              fill="#000000"
              opacity="0.1"
            ></ellipse>
            <rect x="0" y="0" width="12" height="2.2" fill="#FCD34D"></rect>
            <polygon points="12,0 15,1.1 12,2.2" fill="#92400E"></polygon>
            <rect
              x="-1.8"
              y="0.2"
              width="1.8"
              height="1.8"
              fill="#EF4444"
              rx="0.7"
            ></rect>
          </g>
        </g>
        <g transform="translate(25, 15)">
          <ellipse
            cx="25"
            cy="38"
            rx="30"
            ry="4"
            fill="#374151"
            opacity="0.2"
          ></ellipse>
          <path
            d="M0 32 L50 30 L50 38 L0 40 Z"
            fill="#4B5563"
            filter="url(#laptopShadow)"
          ></path>
          <path d="M2 30 L48 28 L48 32 L2 34 Z" fill="#374151"></path>
          <path d="M5 28 L45 26 L45 30 L5 32 Z" fill="#1F2937"></path>
          <path d="M8 5 L42 3 L42 28 L8 30 Z" fill="#1F2937"></path>
          <path d="M6 3 L44 1 L44 30 L6 32 Z" fill="#374151"></path>
          <path d="M9 6 L41 4 L41 27 L9 29 Z" fill="url(#screenGlow)"></path>
          <path
            d="M12 9 L20 8.5 L20 9.5 L12 10 Z"
            fill="#1E293B"
            opacity="0.7"
          ></path>
          <path
            d="M22 8.5 L35 7.8 L35 8.8 L22 9.5 Z"
            fill="#1E293B"
            opacity="0.5"
          ></path>
          <path
            d="M14 12 L22 11.6 L22 12.6 L14 13 Z"
            fill="#1E293B"
            opacity="0.6"
          ></path>
          <path
            d="M24 11.6 L33 11.1 L33 12.1 L24 12.6 Z"
            fill="#1E293B"
            opacity="0.4"
          ></path>
          <path
            d="M12 15 L28 14.2 L28 15.2 L12 16 Z"
            fill="#1E293B"
            opacity="0.5"
          ></path>
          <path
            d="M30 14.2 L38 13.8 L38 14.8 L30 15.2 Z"
            fill="#1E293B"
            opacity="0.6"
          ></path>
          <path
            d="M14 18 L25 17.4 L25 18.4 L14 19 Z"
            fill="#1E293B"
            opacity="0.5"
          ></path>
          <path
            d="M27 17.4 L36 16.9 L36 17.9 L27 18.4 Z"
            fill="#1E293B"
            opacity="0.4"
          ></path>
          <path
            d="M9 6 L41 4 L41 16 L9 18 Z"
            fill="url(#screenGlow)"
            opacity="0.08"
          ></path>
          <rect
            x="10"
            y="30"
            width="30"
            height="6"
            fill="#2D3748"
            opacity="0.3"
            rx="1"
          ></rect>
        </g>
        <circle cx="100" cy="18" r="1.2" fill="#3B82F6" opacity="0.2"></circle>
        <circle cx="108" cy="28" r="0.8" fill="#60A5FA" opacity="0.3"></circle>
        <rect
          x="105"
          y="38"
          width="1.5"
          height="1.5"
          fill="#1E40AF"
          opacity="0.15"
          rx="0.3"
        ></rect>
      </svg>
      ;{/* Your SVG content here */}
    </svg>
  );
};
export default Logo
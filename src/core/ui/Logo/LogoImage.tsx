import classNames from 'clsx';

const LogoImage: React.FCC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 1747 241"
      className={classNames(`w-[95px] sm:w-[105px]`, className)}
    >
      <text
        x="-14.553"
        y="236.754"
        fill="url(#_Linear1)"
        fontFamily="'RobotoMono-Medium', 'Roboto Mono', monospace"
        fontSize="328.375"
      >
        CODESNAPS
      </text>
      <defs>
        <linearGradient
          id="_Linear1"
          x1="0"
          x2="1"
          y1="0"
          y2="0"
          gradientTransform="matrix(1746.18 0 0 240.053 0 120.027)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f97316"></stop>
          <stop offset="1" stopColor="#facc15"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LogoImage;

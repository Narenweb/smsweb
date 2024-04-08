export const MediaIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_415_192"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_415_192)">
        <path
          className={`transition-all ease-in delay-75 ${PathClassName}`}
          d="M3 19.5C2.45 19.5 1.97917 19.3042 1.5875 18.9125C1.19583 18.5208 1 18.05 1 17.5V7.5C1 6.95 1.19583 6.47917 1.5875 6.0875C1.97917 5.69583 2.45 5.5 3 5.5H13C13.55 5.5 14.0208 5.69583 14.4125 6.0875C14.8042 6.47917 15 6.95 15 7.5V17.5C15 18.05 14.8042 18.5208 14.4125 18.9125C14.0208 19.3042 13.55 19.5 13 19.5H3ZM3 17.5H13V7.5H3V17.5ZM4 15.5H12L9.4 12L7.5 14.5L6.1 12.65L4 15.5ZM17 19.5V5.5H19V19.5H17ZM21 19.5V5.5H23V19.5H21Z"
          fill="#D5D5D5" // 8E44AD
        />
      </g>
    </svg>
  );
};

export const RightIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_669_333"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_669_333)">
        <path
          d="M12.6 12.5L8 7.9L9.4 6.5L15.4 12.5L9.4 18.5L8 17.1L12.6 12.5Z"
          fill="#8E44AD"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const EditIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_669_232"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="15"
        height="15"
      >
        <rect y="0.25" width="14.5" height="14.5" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_669_232)">
        <path
          d="M1.2085 14.7502V12.3335H13.2918V14.7502H1.2085ZM3.62516 9.91683H4.471L9.1835 5.21943L8.32256 4.3585L3.62516 9.071V9.91683ZM2.41683 11.1252V8.55745L9.1835 1.80589C9.29426 1.69513 9.42265 1.60954 9.56865 1.54912C9.71466 1.4887 9.86822 1.4585 10.0293 1.4585C10.1904 1.4585 10.3465 1.4887 10.4976 1.54912C10.6486 1.60954 10.7845 1.70016 10.9054 1.821L11.7361 2.66683C11.8569 2.77759 11.945 2.9085 12.0004 3.05954C12.0558 3.21058 12.0835 3.36666 12.0835 3.52777C12.0835 3.67881 12.0558 3.82733 12.0004 3.97334C11.945 4.11935 11.8569 4.25277 11.7361 4.3736L4.98454 11.1252H2.41683Z"
          fill="white"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const SearchIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_761_282"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect x="0.626221" y="0.5" width="19" height="19" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_761_282)">
        <path
          d="M16.1429 17.125L11.1554 12.1375C10.7596 12.4542 10.3043 12.7049 9.78976 12.8896C9.27518 13.0743 8.72761 13.1667 8.14705 13.1667C6.70886 13.1667 5.49167 12.6686 4.49549 11.6724C3.49931 10.6762 3.00122 9.45903 3.00122 8.02083C3.00122 6.58264 3.49931 5.36545 4.49549 4.36927C5.49167 3.37309 6.70886 2.875 8.14705 2.875C9.58525 2.875 10.8024 3.37309 11.7986 4.36927C12.7948 5.36545 13.2929 6.58264 13.2929 8.02083C13.2929 8.60139 13.2005 9.14896 13.0158 9.66354C12.8311 10.1781 12.5804 10.6333 12.2637 11.0292L17.2512 16.0167L16.1429 17.125ZM8.14705 11.5833C9.13664 11.5833 9.97778 11.237 10.6705 10.5443C11.3632 9.85156 11.7096 9.01042 11.7096 8.02083C11.7096 7.03125 11.3632 6.1901 10.6705 5.4974C9.97778 4.80469 9.13664 4.45833 8.14705 4.45833C7.15747 4.45833 6.31632 4.80469 5.62362 5.4974C4.93091 6.1901 4.58455 7.03125 4.58455 8.02083C4.58455 9.01042 4.93091 9.85156 5.62362 10.5443C6.31632 11.237 7.15747 11.5833 8.14705 11.5833Z"
          fill="#1C1B1F"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};
export const BoxIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="90"
      height="89"
      viewBox="0 0 90 89"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_761_322"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="90"
        height="89"
      >
        <rect
          x="0.535034"
          y="0.208008"
          width="88.7311"
          height="88.7311"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_761_322)">
        <path
          d="M19.0207 81.5449C16.9873 81.5449 15.2466 80.8209 13.7985 79.3728C12.3505 77.9248 11.6265 76.184 11.6265 74.1506V32.4655C10.5173 31.7877 9.62384 30.9096 8.94603 29.8313C8.26822 28.753 7.92932 27.5052 7.92932 26.0879V14.9966C7.92932 12.9631 8.65334 11.2224 10.1014 9.77436C11.5494 8.32632 13.2902 7.60229 15.3236 7.60229H74.4776C76.5111 7.60229 78.2518 8.32632 79.6998 9.77436C81.1479 11.2224 81.8719 12.9631 81.8719 14.9966V26.0879C81.8719 27.5052 81.533 28.753 80.8552 29.8313C80.1774 30.9096 79.2839 31.7877 78.1748 32.4655V74.1506C78.1748 76.184 77.4508 77.9248 76.0027 79.3728C74.5547 80.8209 72.8139 81.5449 70.7805 81.5449H19.0207ZM19.0207 33.4822V74.1506H70.7805V33.4822H19.0207ZM15.3236 26.0879H74.4776V14.9966H15.3236V26.0879ZM33.8092 51.9678H55.992V44.5736H33.8092V51.9678Z"
          fill="#8E44AD"
          fill-opacity="0.3"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};
export const InfoIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_439_69"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_439_69)">
        <path
          d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
          fill="#D5D5D5"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const ContactIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_439_74"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_439_74)">
        <path
          d="M14 11.5H21V6.5H14V11.5ZM17.5 10.25L15 8.5V7.5L17.5 9.25L20 7.5V8.5L17.5 10.25ZM2 21.5C1.45 21.5 0.979167 21.3042 0.5875 20.9125C0.195833 20.5208 0 20.05 0 19.5V5.5C0 4.95 0.195833 4.47917 0.5875 4.0875C0.979167 3.69583 1.45 3.5 2 3.5H22C22.55 3.5 23.0208 3.69583 23.4125 4.0875C23.8042 4.47917 24 4.95 24 5.5V19.5C24 20.05 23.8042 20.5208 23.4125 20.9125C23.0208 21.3042 22.55 21.5 22 21.5H2ZM15.9 19.5H22V5.5H2V19.5H2.1C2.8 18.25 3.76667 17.2708 5 16.5625C6.23333 15.8542 7.56667 15.5 9 15.5C10.4333 15.5 11.7667 15.8542 13 16.5625C14.2333 17.2708 15.2 18.25 15.9 19.5ZM9 14.5C9.83333 14.5 10.5417 14.2083 11.125 13.625C11.7083 13.0417 12 12.3333 12 11.5C12 10.6667 11.7083 9.95833 11.125 9.375C10.5417 8.79167 9.83333 8.5 9 8.5C8.16667 8.5 7.45833 8.79167 6.875 9.375C6.29167 9.95833 6 10.6667 6 11.5C6 12.3333 6.29167 13.0417 6.875 13.625C7.45833 14.2083 8.16667 14.5 9 14.5ZM4.55 19.5H13.45C12.8833 18.8667 12.2125 18.375 11.4375 18.025C10.6625 17.675 9.85 17.5 9 17.5C8.15 17.5 7.34167 17.675 6.575 18.025C5.80833 18.375 5.13333 18.8667 4.55 19.5ZM9 12.5C8.71667 12.5 8.47917 12.4042 8.2875 12.2125C8.09583 12.0208 8 11.7833 8 11.5C8 11.2167 8.09583 10.9792 8.2875 10.7875C8.47917 10.5958 8.71667 10.5 9 10.5C9.28333 10.5 9.52083 10.5958 9.7125 10.7875C9.90417 10.9792 10 11.2167 10 11.5C10 11.7833 9.90417 12.0208 9.7125 12.2125C9.52083 12.4042 9.28333 12.5 9 12.5Z"
          fill="#D5D5D5"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const BusinessIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_439_79"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_439_79)">
        <path
          d="M4 21.5C3.45 21.5 2.97917 21.3042 2.5875 20.9125C2.19583 20.5208 2 20.05 2 19.5V8.5C2 7.95 2.19583 7.47917 2.5875 7.0875C2.97917 6.69583 3.45 6.5 4 6.5H8V4.5C8 3.95 8.19583 3.47917 8.5875 3.0875C8.97917 2.69583 9.45 2.5 10 2.5H14C14.55 2.5 15.0208 2.69583 15.4125 3.0875C15.8042 3.47917 16 3.95 16 4.5V6.5H20C20.55 6.5 21.0208 6.69583 21.4125 7.0875C21.8042 7.47917 22 7.95 22 8.5V19.5C22 20.05 21.8042 20.5208 21.4125 20.9125C21.0208 21.3042 20.55 21.5 20 21.5H4ZM10 6.5H14V4.5H10V6.5ZM20 15.5H15V17.5H9V15.5H4V19.5H20V15.5ZM11 15.5H13V13.5H11V15.5ZM4 13.5H9V11.5H15V13.5H20V8.5H4V13.5Z"
          fill="#D5D5D5"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const PartnerIcon = ({
  Color = "#D5D5D5",
  SvgClassName = "",
  PathClassName = "",
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_848_80"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_848_80)">
        <path
          d="M12.375 20C12.4417 20 12.5083 19.9833 12.575 19.95C12.6417 19.9167 12.6917 19.8833 12.725 19.85L20.925 11.65C21.125 11.45 21.2708 11.225 21.3625 10.975C21.4542 10.725 21.5 10.475 21.5 10.225C21.5 9.95833 21.4542 9.70417 21.3625 9.4625C21.2708 9.22083 21.125 9.00833 20.925 8.825L16.675 4.575C16.4917 4.375 16.2792 4.22917 16.0375 4.1375C15.7958 4.04583 15.5417 4 15.275 4C15.025 4 14.775 4.04583 14.525 4.1375C14.275 4.22917 14.05 4.375 13.85 4.575L13.575 4.85L15.425 6.725C15.675 6.95833 15.8583 7.225 15.975 7.525C16.0917 7.825 16.15 8.14167 16.15 8.475C16.15 9.175 15.9125 9.7625 15.4375 10.2375C14.9625 10.7125 14.375 10.95 13.675 10.95C13.3417 10.95 13.0208 10.8917 12.7125 10.775C12.4042 10.6583 12.1333 10.4833 11.9 10.25L10.025 8.4L5.64999 12.775C5.59999 12.825 5.56249 12.8792 5.53749 12.9375C5.51249 12.9958 5.49999 13.0583 5.49999 13.125C5.49999 13.2583 5.54999 13.3792 5.64999 13.4875C5.74999 13.5958 5.86666 13.65 5.99999 13.65C6.06666 13.65 6.13332 13.6333 6.19999 13.6C6.26666 13.5667 6.31666 13.5333 6.34999 13.5L9.74999 10.1L11.15 11.5L7.77499 14.9C7.72499 14.95 7.68749 15.0042 7.66249 15.0625C7.63749 15.1208 7.62499 15.1833 7.62499 15.25C7.62499 15.3833 7.67499 15.5 7.77499 15.6C7.87499 15.7 7.99166 15.75 8.12499 15.75C8.19166 15.75 8.25832 15.7333 8.32499 15.7C8.39166 15.6667 8.44166 15.6333 8.47499 15.6L11.875 12.225L13.275 13.625L9.89999 17.025C9.84999 17.0583 9.81249 17.1083 9.78749 17.175C9.76249 17.2417 9.74999 17.3083 9.74999 17.375C9.74999 17.5083 9.79999 17.625 9.89999 17.725C9.99999 17.825 10.1167 17.875 10.25 17.875C10.3167 17.875 10.3792 17.8625 10.4375 17.8375C10.4958 17.8125 10.55 17.775 10.6 17.725L14 14.35L15.4 15.75L12 19.15C11.95 19.2 11.9125 19.2542 11.8875 19.3125C11.8625 19.3708 11.85 19.4333 11.85 19.5C11.85 19.6333 11.9042 19.75 12.0125 19.85C12.1208 19.95 12.2417 20 12.375 20ZM12.35 22C11.7333 22 11.1875 21.7958 10.7125 21.3875C10.2375 20.9792 9.95832 20.4667 9.87499 19.85C9.30832 19.7667 8.83332 19.5333 8.44999 19.15C8.06666 18.7667 7.83332 18.2917 7.74999 17.725C7.18332 17.6417 6.71249 17.4042 6.33749 17.0125C5.96249 16.6208 5.73332 16.15 5.64999 15.6C5.01666 15.5167 4.49999 15.2417 4.09999 14.775C3.69999 14.3083 3.49999 13.7583 3.49999 13.125C3.49999 12.7917 3.56249 12.4708 3.68749 12.1625C3.81249 11.8542 3.99166 11.5833 4.22499 11.35L10.025 5.575L13.3 8.85C13.3333 8.9 13.3833 8.9375 13.45 8.9625C13.5167 8.9875 13.5833 9 13.65 9C13.8 9 13.925 8.95417 14.025 8.8625C14.125 8.77083 14.175 8.65 14.175 8.5C14.175 8.43333 14.1625 8.36667 14.1375 8.3C14.1125 8.23333 14.075 8.18333 14.025 8.15L10.45 4.575C10.2667 4.375 10.0542 4.22917 9.81249 4.1375C9.57082 4.04583 9.31666 4 9.04999 4C8.79999 4 8.54999 4.04583 8.29999 4.1375C8.04999 4.22917 7.82499 4.375 7.62499 4.575L4.09999 8.125C3.94999 8.275 3.82499 8.45 3.72499 8.65C3.62499 8.85 3.55832 9.05 3.52499 9.25C3.49166 9.45 3.49166 9.65417 3.52499 9.8625C3.55832 10.0708 3.62499 10.2667 3.72499 10.45L2.27499 11.9C1.99166 11.5167 1.78332 11.0958 1.64999 10.6375C1.51666 10.1792 1.46666 9.71667 1.49999 9.25C1.53332 8.78333 1.64999 8.32917 1.84999 7.8875C2.04999 7.44583 2.32499 7.05 2.67499 6.7L6.19999 3.175C6.59999 2.79167 7.04582 2.5 7.53749 2.3C8.02916 2.1 8.53332 2 9.04999 2C9.56666 2 10.0708 2.1 10.5625 2.3C11.0542 2.5 11.4917 2.79167 11.875 3.175L12.15 3.45L12.425 3.175C12.825 2.79167 13.2708 2.5 13.7625 2.3C14.2542 2.1 14.7583 2 15.275 2C15.7917 2 16.2958 2.1 16.7875 2.3C17.2792 2.5 17.7167 2.79167 18.1 3.175L22.325 7.4C22.7083 7.78333 23 8.225 23.2 8.725C23.4 9.225 23.5 9.73333 23.5 10.25C23.5 10.7667 23.4 11.2708 23.2 11.7625C23 12.2542 22.7083 12.6917 22.325 13.075L14.125 21.25C13.8917 21.4833 13.6208 21.6667 13.3125 21.8C13.0042 21.9333 12.6833 22 12.35 22Z"
          fill={Color}
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const UserIcon = ({
  Color = "#D5D5D5",
  SvgClassName = "",
  PathClassName = "",
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={` ${SvgClassName}`}
    >
      <mask
        id="mask0_848_75"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_848_75)">
        <path
          d="M10.5 12C9.4 12 8.45833 11.6083 7.675 10.825C6.89167 10.0417 6.5 9.1 6.5 8C6.5 6.9 6.89167 5.95833 7.675 5.175C8.45833 4.39167 9.4 4 10.5 4C11.6 4 12.5417 4.39167 13.325 5.175C14.1083 5.95833 14.5 6.9 14.5 8C14.5 9.1 14.1083 10.0417 13.325 10.825C12.5417 11.6083 11.6 12 10.5 12ZM2.5 20V17.2C2.5 16.65 2.64167 16.1333 2.925 15.65C3.20833 15.1667 3.6 14.8 4.1 14.55C4.95 14.1167 5.90833 13.75 6.975 13.45C8.04167 13.15 9.21667 13 10.5 13H10.85C10.95 13 11.05 13.0167 11.15 13.05C11.0167 13.35 10.9042 13.6625 10.8125 13.9875C10.7208 14.3125 10.65 14.65 10.6 15H10.5C9.31667 15 8.25417 15.15 7.3125 15.45C6.37083 15.75 5.6 16.05 5 16.35C4.85 16.4333 4.72917 16.55 4.6375 16.7C4.54583 16.85 4.5 17.0167 4.5 17.2V18H10.8C10.9 18.35 11.0333 18.6958 11.2 19.0375C11.3667 19.3792 11.55 19.7 11.75 20H2.5ZM16.5 21L16.2 19.5C16 19.4167 15.8125 19.3292 15.6375 19.2375C15.4625 19.1458 15.2833 19.0333 15.1 18.9L13.65 19.35L12.65 17.65L13.8 16.65C13.7667 16.4167 13.75 16.2 13.75 16C13.75 15.8 13.7667 15.5833 13.8 15.35L12.65 14.35L13.65 12.65L15.1 13.1C15.2833 12.9667 15.4625 12.8542 15.6375 12.7625C15.8125 12.6708 16 12.5833 16.2 12.5L16.5 11H18.5L18.8 12.5C19 12.5833 19.1875 12.675 19.3625 12.775C19.5375 12.875 19.7167 13 19.9 13.15L21.35 12.65L22.35 14.4L21.2 15.4C21.2333 15.6 21.25 15.8083 21.25 16.025C21.25 16.2417 21.2333 16.45 21.2 16.65L22.35 17.65L21.35 19.35L19.9 18.9C19.7167 19.0333 19.5375 19.1458 19.3625 19.2375C19.1875 19.3292 19 19.4167 18.8 19.5L18.5 21H16.5ZM17.5 18C18.05 18 18.5208 17.8042 18.9125 17.4125C19.3042 17.0208 19.5 16.55 19.5 16C19.5 15.45 19.3042 14.9792 18.9125 14.5875C18.5208 14.1958 18.05 14 17.5 14C16.95 14 16.4792 14.1958 16.0875 14.5875C15.6958 14.9792 15.5 15.45 15.5 16C15.5 16.55 15.6958 17.0208 16.0875 17.4125C16.4792 17.8042 16.95 18 17.5 18ZM10.5 10C11.05 10 11.5208 9.80417 11.9125 9.4125C12.3042 9.02083 12.5 8.55 12.5 8C12.5 7.45 12.3042 6.97917 11.9125 6.5875C11.5208 6.19583 11.05 6 10.5 6C9.95 6 9.47917 6.19583 9.0875 6.5875C8.69583 6.97917 8.5 7.45 8.5 8C8.5 8.55 8.69583 9.02083 9.0875 9.4125C9.47917 9.80417 9.95 10 10.5 10Z"
          fill={Color}
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const BuildingIcon = ({
  Color = "#D5D5D5",
  SvgClassName = "",
  PathClassName = "",
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_848_70"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_848_70)">
        <path
          d="M2.5 21V3H12.5V7H22.5V21H2.5ZM4.5 19H10.5V17H4.5V19ZM4.5 15H10.5V13H4.5V15ZM4.5 11H10.5V9H4.5V11ZM4.5 7H10.5V5H4.5V7ZM12.5 19H20.5V9H12.5V19ZM14.5 13V11H18.5V13H14.5ZM14.5 17V15H18.5V17H14.5Z"
          fill={Color}
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const DashboardIcon = ({
  Color = "#D5D5D5",
  SvgClassName = "",
  PathClassName = "",
}) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_848_65"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="25"
        height="24"
      >
        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_848_65)">
        <path
          d="M7.875 21.025C7.275 21.0083 6.70417 20.8542 6.1625 20.5625C5.62083 20.2708 5.10833 19.8417 4.625 19.275C3.95833 18.475 3.4375 17.5208 3.0625 16.4125C2.6875 15.3042 2.5 14.1667 2.5 13C2.5 11.6167 2.7625 10.3167 3.2875 9.1C3.8125 7.88333 4.525 6.825 5.425 5.925C6.325 5.025 7.38333 4.3125 8.6 3.7875C9.81667 3.2625 11.1167 3 12.5 3C13.8833 3 15.1833 3.26667 16.4 3.8C17.6167 4.33333 18.675 5.05833 19.575 5.975C20.475 6.89167 21.1875 7.96667 21.7125 9.2C22.2375 10.4333 22.5 11.7583 22.5 13.175C22.5 14.4583 22.2917 15.6583 21.875 16.775C21.4583 17.8917 20.8667 18.8333 20.1 19.6C19.6333 20.0667 19.1417 20.4208 18.625 20.6625C18.1083 20.9042 17.5833 21.025 17.05 21.025C16.75 21.025 16.45 20.9875 16.15 20.9125C15.85 20.8375 15.55 20.725 15.25 20.575L13.85 19.875C13.65 19.775 13.4375 19.7 13.2125 19.65C12.9875 19.6 12.75 19.575 12.5 19.575C12.25 19.575 12.0125 19.6 11.7875 19.65C11.5625 19.7 11.35 19.775 11.15 19.875L9.75 20.575C9.43333 20.7417 9.12083 20.8625 8.8125 20.9375C8.50417 21.0125 8.19167 21.0417 7.875 21.025ZM7.925 19.025C8.075 19.025 8.22917 19.0083 8.3875 18.975C8.54583 18.9417 8.7 18.8833 8.85 18.8L10.25 18.1C10.6 17.9167 10.9625 17.7833 11.3375 17.7C11.7125 17.6167 12.0917 17.575 12.475 17.575C12.8583 17.575 13.2417 17.6167 13.625 17.7C14.0083 17.7833 14.375 17.9167 14.725 18.1L16.15 18.8C16.3 18.8833 16.45 18.9417 16.6 18.975C16.75 19.0083 16.9 19.025 17.05 19.025C17.3667 19.025 17.6667 18.9417 17.95 18.775C18.2333 18.6083 18.5167 18.3583 18.8 18.025C19.3333 17.3917 19.75 16.6333 20.05 15.75C20.35 14.8667 20.5 13.9583 20.5 13.025C20.5 10.7917 19.725 8.89583 18.175 7.3375C16.625 5.77917 14.7333 5 12.5 5C10.2667 5 8.375 5.78333 6.825 7.35C5.275 8.91667 4.5 10.8167 4.5 13.05C4.5 14 4.65417 14.925 4.9625 15.825C5.27083 16.725 5.7 17.4833 6.25 18.1C6.53333 18.4333 6.80833 18.6708 7.075 18.8125C7.34167 18.9542 7.625 19.025 7.925 19.025ZM12.5 15C13.05 15 13.5208 14.8042 13.9125 14.4125C14.3042 14.0208 14.5 13.55 14.5 13C14.5 12.8667 14.4875 12.7333 14.4625 12.6C14.4375 12.4667 14.4 12.3333 14.35 12.2L15.6 10.525C15.7667 10.7417 15.9125 10.9708 16.0375 11.2125C16.1625 11.4542 16.2667 11.7167 16.35 12H18.4C18.15 10.5333 17.4708 9.33333 16.3625 8.4C15.2542 7.46667 13.9667 7 12.5 7C11.0333 7 9.74167 7.47083 8.625 8.4125C7.50833 9.35417 6.83333 10.55 6.6 12H8.65C8.88333 11.1 9.35833 10.375 10.075 9.825C10.7917 9.275 11.6 9 12.5 9C12.7833 9 13.05 9.025 13.3 9.075C13.55 9.125 13.7917 9.2 14.025 9.3L12.75 11.025C12.7167 11.025 12.675 11.0208 12.625 11.0125C12.575 11.0042 12.5333 11 12.5 11C11.95 11 11.4792 11.1958 11.0875 11.5875C10.6958 11.9792 10.5 12.45 10.5 13C10.5 13.55 10.6958 14.0208 11.0875 14.4125C11.4792 14.8042 11.95 15 12.5 15Z"
          fill={Color}
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const AddUserIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_751_469"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="90"
        height="90"
      >
        <rect
          x="0.510864"
          y="0.599609"
          width="88.7311"
          height="88.7311"
          fill="#D9D9D9"
        />
      </mask>
      <g mask="url(#mask0_751_469)">
        <path
          d="M22.1391 63.8198C25.2817 61.4167 28.7939 59.5219 32.6759 58.1355C36.5579 56.7491 40.6247 56.0558 44.8764 56.0558C49.1281 56.0558 53.195 56.7491 57.077 58.1355C60.959 59.5219 64.4712 61.4167 67.6138 63.8198C69.7704 61.2934 71.4496 58.4282 72.6511 55.224C73.8527 52.0198 74.4535 48.6 74.4535 44.9645C74.4535 36.7692 71.5728 29.7908 65.8114 24.0295C60.0501 18.2681 53.0717 15.3874 44.8764 15.3874C36.6811 15.3874 29.7028 18.2681 23.9414 24.0295C18.1801 29.7908 15.2994 36.7692 15.2994 44.9645C15.2994 48.6 15.9002 52.0198 17.1018 55.224C18.3033 58.4282 19.9824 61.2934 22.1391 63.8198ZM44.8764 48.6616C41.2409 48.6616 38.1754 47.4138 35.6798 44.9182C33.1843 42.4227 31.9365 39.3571 31.9365 35.7216C31.9365 32.0861 33.1843 29.0206 35.6798 26.525C38.1754 24.0295 41.2409 22.7817 44.8764 22.7817C48.512 22.7817 51.5775 24.0295 54.0731 26.525C56.5686 29.0206 57.8164 32.0861 57.8164 35.7216C57.8164 39.3571 56.5686 42.4227 54.0731 44.9182C51.5775 47.4138 48.512 48.6616 44.8764 48.6616ZM44.8764 81.9357C39.7621 81.9357 34.9558 80.9652 30.4576 79.0243C25.9595 77.0833 22.0467 74.4491 18.7193 71.1216C15.3918 67.7942 12.7576 63.8814 10.8166 59.3833C8.87565 54.8851 7.90515 50.0788 7.90515 44.9645C7.90515 39.8501 8.87565 35.0438 10.8166 30.5457C12.7576 26.0475 15.3918 22.1347 18.7193 18.8073C22.0467 15.4798 25.9595 12.8456 30.4576 10.9047C34.9558 8.96366 39.7621 7.99316 44.8764 7.99316C49.9908 7.99316 54.7971 8.96366 59.2952 10.9047C63.7934 12.8456 67.7062 15.4798 71.0336 18.8073C74.361 22.1347 76.9952 26.0475 78.9362 30.5457C80.8772 35.0438 81.8477 39.8501 81.8477 44.9645C81.8477 50.0788 80.8772 54.8851 78.9362 59.3833C76.9952 63.8814 74.361 67.7942 71.0336 71.1216C67.7062 74.4491 63.7934 77.0833 59.2952 79.0243C54.7971 80.9652 49.9908 81.9357 44.8764 81.9357ZM44.8764 74.5415C48.1422 74.5415 51.2232 74.0639 54.1193 73.1089C57.0154 72.1538 59.665 70.7827 62.0681 68.9958C59.665 67.2088 57.0154 65.8378 54.1193 64.8827C51.2232 63.9276 48.1422 63.4501 44.8764 63.4501C41.6106 63.4501 38.5297 63.9276 35.6336 64.8827C32.7375 65.8378 30.0879 67.2088 27.6848 68.9958C30.0879 70.7827 32.7375 72.1538 35.6336 73.1089C38.5297 74.0639 41.6106 74.5415 44.8764 74.5415ZM44.8764 41.2673C46.4785 41.2673 47.8033 40.7436 48.8509 39.696C49.8984 38.6485 50.4221 37.3237 50.4221 35.7216C50.4221 34.1195 49.8984 32.7947 48.8509 31.7472C47.8033 30.6997 46.4785 30.1759 44.8764 30.1759C43.2744 30.1759 41.9495 30.6997 40.902 31.7472C39.8545 32.7947 39.3307 34.1195 39.3307 35.7216C39.3307 37.3237 39.8545 38.6485 40.902 39.696C41.9495 40.7436 43.2744 41.2673 44.8764 41.2673Z"
          fill="#8E44AD"
          fill-opacity="0.3"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const MailIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_776_434"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_776_434)">
        <path
          d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z"
          fill="#8E44AD"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const CallIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_776_439"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_776_439)">
        <path
          d="M19.95 21C17.8667 21 15.8083 20.5458 13.775 19.6375C11.7417 18.7292 9.89167 17.4417 8.225 15.775C6.55833 14.1083 5.27083 12.2583 4.3625 10.225C3.45417 8.19167 3 6.13333 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07917 8.725 3.2375C8.90833 3.39583 9.01667 3.58333 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.70417 12.1125 8.1625 12.6875C8.62083 13.2625 9.125 13.8167 9.675 14.35C10.1917 14.8667 10.7333 15.3458 11.3 15.7875C11.8667 16.2292 12.4667 16.6333 13.1 17L15.45 14.65C15.6 14.5 15.7958 14.3875 16.0375 14.3125C16.2792 14.2375 16.5167 14.2167 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1375 20.775 15.3125C20.925 15.4875 21 15.6833 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21ZM6.025 9L7.675 7.35L7.25 5H5.025C5.10833 5.68333 5.225 6.35833 5.375 7.025C5.525 7.69167 5.74167 8.35 6.025 9ZM14.975 17.95C15.625 18.2333 16.2875 18.4583 16.9625 18.625C17.6375 18.7917 18.3167 18.9 19 18.95V16.75L16.65 16.275L14.975 17.95Z"
          fill="#8E44AD"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const InfoIconfilled = ({
  SvgClassName = "",
  PathClassName = "",
  onClick,
}) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
      onClick={onClick}
    >
      <mask
        id="mask0_948_270"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="19"
        height="18"
      >
        <rect x="0.5" width="18" height="18" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_948_270)">
        <path
          d="M8.75 12.75H10.25V8.25H8.75V12.75ZM9.5 6.75C9.7125 6.75 9.89063 6.67812 10.0344 6.53438C10.1781 6.39062 10.25 6.2125 10.25 6C10.25 5.7875 10.1781 5.60938 10.0344 5.46562C9.89063 5.32187 9.7125 5.25 9.5 5.25C9.2875 5.25 9.10938 5.32187 8.96563 5.46562C8.82188 5.60938 8.75 5.7875 8.75 6C8.75 6.2125 8.82188 6.39062 8.96563 6.53438C9.10938 6.67812 9.2875 6.75 9.5 6.75ZM9.5 16.5C8.4625 16.5 7.4875 16.3031 6.575 15.9094C5.6625 15.5156 4.86875 14.9813 4.19375 14.3063C3.51875 13.6313 2.98438 12.8375 2.59063 11.925C2.19687 11.0125 2 10.0375 2 9C2 7.9625 2.19687 6.9875 2.59063 6.075C2.98438 5.1625 3.51875 4.36875 4.19375 3.69375C4.86875 3.01875 5.6625 2.48438 6.575 2.09063C7.4875 1.69687 8.4625 1.5 9.5 1.5C10.5375 1.5 11.5125 1.69687 12.425 2.09063C13.3375 2.48438 14.1313 3.01875 14.8063 3.69375C15.4813 4.36875 16.0156 5.1625 16.4094 6.075C16.8031 6.9875 17 7.9625 17 9C17 10.0375 16.8031 11.0125 16.4094 11.925C16.0156 12.8375 15.4813 13.6313 14.8063 14.3063C14.1313 14.9813 13.3375 15.5156 12.425 15.9094C11.5125 16.3031 10.5375 16.5 9.5 16.5ZM9.5 15C11.175 15 12.5938 14.4187 13.7563 13.2563C14.9187 12.0938 15.5 10.675 15.5 9C15.5 7.325 14.9187 5.90625 13.7563 4.74375C12.5938 3.58125 11.175 3 9.5 3C7.825 3 6.40625 3.58125 5.24375 4.74375C4.08125 5.90625 3.5 7.325 3.5 9C3.5 10.675 4.08125 12.0938 5.24375 13.2563C6.40625 14.4187 7.825 15 9.5 15Z"
          fill="#DE3163"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const SwitchIcon = ({
  SvgClassName = "",
  PathClassName = "",
  onClick,
}) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_1050_232"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25"
      >
        <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1050_232)">
        <path
          d="M7 22.5L3 18.5L7 14.5L8.4 15.95L6.85 17.5H17V13.5H19V19.5H6.85L8.4 21.05L7 22.5ZM5 11.5V5.5H17.15L15.6 3.95L17 2.5L21 6.5L17 10.5L15.6 9.05L17.15 7.5H7V11.5H5Z"
          fill="#D5D5D5"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};

export const BannerIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <mask
        id="mask0_1030_732"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26"
      >
        <rect x="0.751953" y="0.267578" width="25" height="25" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1030_732)">
        <path
          d="M13.8516 22.5589C13.4349 22.9756 12.9401 23.1839 12.3672 23.1839C11.7943 23.1839 11.2995 22.9756 10.8828 22.5589L3.4349 15.111C3.03559 14.7117 2.83594 14.2212 2.83594 13.6397C2.83594 13.0581 3.03559 12.5676 3.4349 12.1683L12.6016 2.97559C12.7925 2.78461 13.0182 2.6327 13.2786 2.51986C13.5391 2.40701 13.8168 2.35059 14.112 2.35059H21.5599C22.1328 2.35059 22.6233 2.55458 23.0313 2.96257C23.4392 3.37055 23.6432 3.861 23.6432 4.43392V11.8818C23.6432 12.177 23.5868 12.4548 23.474 12.7152C23.3611 12.9756 23.2092 13.2013 23.0182 13.3923L13.8516 22.5589ZM18.9557 8.60059C19.3898 8.60059 19.7587 8.44868 20.0625 8.14486C20.3663 7.84104 20.5182 7.47211 20.5182 7.03809C20.5182 6.60406 20.3663 6.23513 20.0625 5.93132C19.7587 5.6275 19.3898 5.47559 18.9557 5.47559C18.5217 5.47559 18.1528 5.6275 17.849 5.93132C17.5451 6.23513 17.3932 6.60406 17.3932 7.03809C17.3932 7.47211 17.5451 7.84104 17.849 8.14486C18.1528 8.44868 18.5217 8.60059 18.9557 8.60059ZM12.3672 21.1006L21.5599 11.8818V4.43392H14.112L4.91927 13.6527L12.3672 21.1006Z"
          fill="#CA97DF"
          className={PathClassName}
        />
      </g>
    </svg>
  );
};
export const CheckIcon = ({ SvgClassName = "", PathClassName = "" }) => {
  return (
    <svg
      width="13"
      height="10"
      viewBox="0 0 13 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={SvgClassName}
    >
      <path
        d="M4.16406 9.91856L0.164062 5.91856L1.56406 4.51856L4.16406 7.11856L10.7641 0.518555L12.1641 1.91855L4.16406 9.91856Z"
        fill="white"
        className={PathClassName}
      />
    </svg>
  );
};

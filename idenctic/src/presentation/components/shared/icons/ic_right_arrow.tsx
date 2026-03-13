type IcRightArrowProps = {
  color?: string;
  size?: number;
};

export default function IcRightArrow({ color, size }: IcRightArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary-400"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

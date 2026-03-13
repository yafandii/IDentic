interface Props {
  color?: string;
  size?: number;
}

function IcUser({ color, size }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size ?? 20}
      height={size ?? 20}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color ?? "#fff"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-user-round-icon lucide-user-round"
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

export default IcUser;

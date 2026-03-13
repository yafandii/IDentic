type BaseButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
};

export default function BaseButton({
  children,
  onClick,
  disabled,
  className,
  icon,
}: BaseButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-2 bg-gradient-to-br from-primary-100 via-primary-300 to-green-100  hover:bg-primary-600 text-green-900 text-sm font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${className} flex items-center justify-center gap-2`}
    >
      {icon}
      {children}
    </button>
  );
}

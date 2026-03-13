import IcLock from "./icons/ic_lock";
import { useState } from "react";
import IcVisiblePass from "./icons/ic_visible_pass";
import IcInvisiblePass from "./icons/ic_invisible_pass";

type BaseTextInputProps = {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  className?: string;
  iconClassName?: string;
  icon?: React.ReactNode;
  height?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function BaseTextInput({
  name,
  label,
  value,
  placeholder,
  required = false,
  type = "text",
  icon,
  onChange,
  className,
  height = 10,
  iconClassName,
}: BaseTextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs font-medium text-primary-200 mb-2"
      >
        {label}
      </label>
      <div
        className={`w-full h-${height} flex items-center bg-primary-900/50 border border-primary-600 rounded-lg text-white text-sm placeholder-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
      >
        {icon && (
          <div className={`absolute left-2 px-7 ${iconClassName}`}>{icon}</div>
        )}
        <input
          type={type == "password" && isPasswordVisible ? "text" : type}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full h-${height} bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-white placeholder-primary-400 py-2 ${icon ? "px-10" : "px-4"} rounded-lg `}
        />
        {type == "password" && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-11"
          >
            {isPasswordVisible ? <IcVisiblePass /> : <IcInvisiblePass />}
          </button>
        )}
      </div>
    </div>
  );
}

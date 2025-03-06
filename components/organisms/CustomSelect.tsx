import { useState } from "react";
import { useTranslation } from "next-i18next";
import { Image } from "antd";

type Option = {
  label: string;
  value: string;
};
function CustomSelect({
  options,
  onChange,
  backgroundColor = "transparent",
}: {
  options: Option[];
  onChange: Function;
  backgroundColor?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { i18n } = useTranslation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`relative z-10 !border-none text-white !shadow-none !outline-none bg-[${backgroundColor}] text-dark_blue inline-flex items-center bg-transparent px-4 py-2 text-sm font-medium`}
        onClick={toggleDropdown}
      >
        {i18n.language === "ar" ? "عربي" : "en"}
        <div className="ms-2 mt-3">
          <Image
            preview={false}
            src="/assets/auth/lang.svg"
            className="h-auto w-full max-w-6 object-scale-down"
            alt="lang"
          />
        </div>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full !p-2 text-start !text-sm uppercase text-gray"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;

import { useTranslation } from "next-i18next";
import { Button, Image, Tooltip } from "antd";
import { useRouter } from "next/router";
import StorageConstants from "@/helpers/storageConstants";
import { toast } from "react-toastify";
import CustomSelect from "./CustomSelect";
import { saveToStorage } from "@/helpers/storageHelper";

interface LanguageProps {
  isIcon?: boolean;
  backgroundColor?: string;
}

export default function Language({
  isIcon = false,
  backgroundColor = "#fff",
}: LanguageProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { asPath, replace } = router;
  const currentLocale = i18n?.language;

  const handleChange = (value: string) => {
    toast.dismiss();
    saveToStorage(StorageConstants.LOCALE, value);
    replace(asPath, asPath, { locale: value });
    if (value === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
      // reload
      router.reload();
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      router.reload();
    }
  };

  return (
    <div>
      {isIcon ? (
        <Button
          onClick={() => {
            handleChange(currentLocale === "ar" ? "en" : "ar");
          }}
          type="text"
          className="!border-none !bg-transparent !p-0 !text-white !shadow-none !outline-none"
        >
          {currentLocale === "ar" ? "EN" : "عربي"}
          <Image
            preview={false}
            src="/assets/auth/lang.svg"
            className="h-auto w-full object-scale-down"
            alt="lang"
          />
        </Button>
      ) : (
        <CustomSelect
          backgroundColor={backgroundColor}
          onChange={handleChange}
          options={[
            { value: "ar", label: "عربي" },
            { value: "en", label: "EN" },
          ]}
        />
      )}
    </div>
  );
}

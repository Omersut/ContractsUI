import { useTranslation } from "react-i18next";
import { UserDropdown } from "./UserDropdown";
import { LanguageDropdown } from "../common/LanguageDropdown";

export const HeaderTools = () => {
  const { t } = useTranslation();

  return (
    <div className="nk-header-tools">
      <ul className="nk-quick-nav">
        <LanguageDropdown />
        <UserDropdown />
      </ul>
    </div>
  );
};

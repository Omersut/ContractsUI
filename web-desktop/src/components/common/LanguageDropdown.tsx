import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/Hooks";
import { setLanguage, toggleDarkMode } from "../../store/SiteSlice";
import { HtmlHelper } from "../../utils/HtmlHelper";
import { mdlLanguage } from "../../models/ui-models/Language";
import { languages } from "../../consts/Languages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, Input, message } from "antd";
import { FileTextFilled, WalletFilled, WalletOutlined } from "@ant-design/icons";
import { ContractsModal } from "./ContractsModal";

export const LanguageDropdown = () => {
  const { t } = useTranslation();
  const siteStore = useAppSelector((store) => store.site);
  const dispatch = useAppDispatch();
  const selector = "language-dropdown";

  const [open, setOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<mdlLanguage>();
  const [walletId, setWalletId] = useState<string | null>(localStorage.getItem("walletId"));
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (siteStore.language && siteStore.language !== selectedLanguage?.value) {
      const languageItem = languages.find((lang) => lang.value === siteStore.language);
      if (languageItem) setSelectedLanguage(languageItem);
    }
    return HtmlHelper.clickOutside(selector, open, setOpen);
  }, [siteStore.language, open]);

  const changeLanguage = (language: mdlLanguage) => {
    setOpen(false);
    dispatch(setLanguage(language.value));
  };

  const getSelectedLanguageFlag = () => {
    if (selectedLanguage) return selectedLanguage.icon;
    return languages.find((lang) => lang.default)?.icon;
  };

  // Handler for MetaMask connection
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const account = accounts[0];
        setWalletId(account);
        localStorage.setItem("walletId", account);
        message.success("Connected with MetaMask");
      } catch (error) {
        message.error("Failed to connect MetaMask");
      }
    } else {
      message.warning("MetaMask not detected");
    }
  };

  // Handler for manual wallet ID input
  const submitWalletId = (id: string) => {
    setWalletId(id);
    localStorage.setItem("walletId", id);
  };

  // Toggle modal based on wallet ID presence
  const toggleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <li className="dropdown language-dropdown d-none d-sm-block me-n1">
        <Button icon={<FileTextFilled />} onClick={toggleModal}>
          See Contracts
        </Button>
      </li>
      <li className="dropdown language-dropdown d-none d-sm-block me-n1">
        <a
          id={selector}
          className={`dropdown-toggle nk-quick-nav-icon ${open ? "show" : ""}`}
          onClick={() => setOpen(!open)}
        >
          <div className="quick-icon border border-light">
            <img className="icon" src={getSelectedLanguageFlag()} alt="flag" />
          </div>
        </a>
        <div
          className={`dropdown-menu dropdown-menu-end dropdown-menu-s1 language-drop ${open ? "show" : ""}`}
        >
          <ul className="language-list">
            {languages.map((language: mdlLanguage, index: number) => (
              <li key={index}>
                <a onClick={() => changeLanguage(language)} className="language-item">
                  <img src={language.icon} className="language-flag" alt="flag" />
                  <span className="language-name">{t(language.label!)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className="dropdown language-dropdown d-none d-sm-block me-n1">
        <a
          id={selector}
          className="dropdown-toggle nk-quick-nav-icon"
          onClick={() => dispatch(toggleDarkMode())}
        >
          <div className="quick-icon">
            <FontAwesomeIcon icon={siteStore.darkMode ? faSun : faMoon} />
          </div>
        </a>
      </li>


      {/* Wallet Connection Modal */}
      <Modal
        title={walletId ? "Connected" : "Connect Wallet"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >

        <ContractsModal
          walletAddress={walletId}
          callbackForget={() => setWalletId(null)} />

      </Modal>
    </>
  );
};

import React, { useContext } from "react";

interface LanguageContex {
  language: string;
  locale: string;
}

const LanguageContext = React.createContext<LanguageContex>({
  language: "English",
  locale: "en",
});

export const LanguageContextProvider = () => {
  return (
    <LanguageContext.Provider
      value={{
        language: "English",
        locale: "en",
      }}
    ></LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  return useContext(LanguageContext);
};

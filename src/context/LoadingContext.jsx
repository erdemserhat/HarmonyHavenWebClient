import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // 🔹 PropTypes kütüphanesini ekle

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        {children} {/* children prop'u burada kullanılıyor */}
        {isLoading && (
            <div className="loading-container">
              <div className="elegant-spinner"></div>
            </div>
        )}
      </LoadingContext.Provider>
  );
}

// 🔹 PropTypes tanımlaması ekle
LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired, // children, bir React node olmalı
};


// Custom hook ile context'i dışa aktar
export const useLoading = () => useContext(LoadingContext);

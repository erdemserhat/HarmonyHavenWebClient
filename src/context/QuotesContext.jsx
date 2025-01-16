import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const QuotesContext = createContext()

const QUOTE_CATEGORIES = [
  { id: 1, name: "Genel" },
  { id: 2, name: "Kendini Sevmek" },
  { id: 3, name: "Özgüven" },
  { id: 6, name: "Kişisel Gelişim" },
  { id: 7, name: "Yaşam" },
  { id: 8, name: "Güç" },
  { id: 9, name: "Pozitif Düşünmek" },
  { id: 10, name: "Kaygıyla Başetme" },
  { id: 11, name: "Öz Saygı" },
  { id: 13, name: "Üzüntü" },
  { id: 14, name: "Hayata Devam Etmek" },
  { id: 15, name: "İş" },
  { id: 16, name: "Toksik İlişkiler" },
  { id: 17, name: "Ayrılık" },
  { id: 18, name: "Cesaret" },
  { id: 19, name: "Spor" },
  { id: 20, name: "Aşk" },
  { id: 21, name: "Kısa Videolar" }
]

export function QuotesProvider({ children }) {
  const [quotes, setQuotes] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  return (
    <QuotesContext.Provider 
      value={{ 
        quotes, 
        setQuotes, 
        selectedCategory, 
        setSelectedCategory,
        isLoading,
        setIsLoading,
        hasMore,
        setHasMore,
        categories: QUOTE_CATEGORIES
      }}
    >
      {children}
    </QuotesContext.Provider>
  )
}

export function useQuotes() {
  const context = useContext(QuotesContext)
  if (!context) {
    throw new Error('useQuotes must be used within a QuotesProvider')
  }
  return context
}

QuotesProvider.propTypes = {
  children: PropTypes.node.isRequired,
} 
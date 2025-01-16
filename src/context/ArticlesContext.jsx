import { createContext, useContext, useState } from 'react'

const ArticlesContext = createContext()

export function ArticlesProvider({ children }) {
  const [articles, setArticles] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const updateArticles = (newArticles) => {
    setArticles(newArticles)
    setIsLoaded(true)
  }

  return (
    <ArticlesContext.Provider value={{ articles, isLoaded, updateArticles }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticles = () => useContext(ArticlesContext) 
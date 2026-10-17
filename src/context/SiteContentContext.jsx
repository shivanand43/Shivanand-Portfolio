import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loadSiteContent,
  saveSiteContent,
  resetSiteContent,
} from '../utils/siteContentStorage';

const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => loadSiteContent());

  useEffect(() => {
    saveSiteContent(content);
  }, [content]);

  const updateContent = (updates) => {
    setContent((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const handleReset = () => {
    const defaults = resetSiteContent();
    setContent(defaults);
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        profile: content.profile,
        projects: content.projects,
        updateContent,
        resetContent: handleReset,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
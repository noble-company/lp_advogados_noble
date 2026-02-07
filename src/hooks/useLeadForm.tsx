import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface LeadFormContextType {
  isOpen: boolean;
  openLeadForm: () => void;
  closeLeadForm: () => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export const LeadFormProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLeadForm = useCallback(() => setIsOpen(true), []);
  const closeLeadForm = useCallback(() => setIsOpen(false), []);

  return (
    <LeadFormContext.Provider value={{ isOpen, openLeadForm, closeLeadForm }}>
      {children}
    </LeadFormContext.Provider>
  );
};

export const useLeadForm = (): LeadFormContextType => {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return context;
};

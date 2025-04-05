
import React, { createContext, useContext, ReactNode } from 'react';
import { useFamily } from '@/hooks/useFamily';
import { Family, FamilyMember } from '@/lib/supabase';

interface FamilyContextType {
  family: Family | null;
  members: FamilyMember[];
  loading: boolean;
  error: Error | null;
  loadFamily: () => Promise<void>;
  updateFamilyData: (data: Partial<Family>) => Promise<void>;
  addMember: (member: Omit<FamilyMember, 'id' | 'created_at'>) => Promise<void>;
  updateMember: (member: Partial<FamilyMember>) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;
}

const FamilyContext = createContext<FamilyContextType | undefined>(undefined);

export function FamilyProvider({ children }: { children: ReactNode }) {
  const familyData = useFamily();

  return (
    <FamilyContext.Provider value={familyData}>
      {children}
    </FamilyContext.Provider>
  );
}

export function useFamilyContext() {
  const context = useContext(FamilyContext);
  if (context === undefined) {
    throw new Error('useFamilyContext must be used within a FamilyProvider');
  }
  return context;
}

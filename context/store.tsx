"use client";

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



// import { Note } from '@/types';

interface Store {
  year: any,
  setYear: Dispatch<SetStateAction<any>>,
}

export const YearContext = createContext<Store>({
  year: [],
  setYear: () : any => {},
})

export function YearProvider({ children }: {children: React.ReactNode}) {
    const [mounted, setMounted] = useState(false);
    const [year, setYear] = useState(new Array(366));

    const setLocalYear = async (year: any) => {
      try {
        await AsyncStorage.setItem('2024', year);
      } catch (e) {
        // saving error
      }
    }

    const getLocalYear = async () => {
      try {
        const year = await AsyncStorage.getItem('2024');
        if (year) setYear(JSON.parse(year));
      } catch (e) {
        // saving error
      }
    }

    useEffect(() => {
      setMounted(true);
      getLocalYear();
      return () => setMounted(false);
    },[]);

    useEffect(() => {
      if (mounted) setLocalYear(JSON.stringify(year));
    }, [year]);

    return (
        <YearContext.Provider
          value={{
              year,
              setYear,
          }}
        >
        {children}
        </YearContext.Provider>
    )
}

export function useYear() {
  const context = useContext(YearContext)

  if (!context)
    throw new Error('useYear must be used inside a `YearProvider`')

  return context
}
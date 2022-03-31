import {createContext, useContext, useState} from 'react';

const AppContext = createContext<any>({});

export default function AppWrapper({children}) {
  const [context, setContext] = useState({});

  return (
    <AppContext.Provider value={[context, setContext]}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

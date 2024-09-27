import { createContext, useState } from "react";

export const FetchContext = createContext();

// eslint-disable-next-line react/prop-types
export function FetchContextProvider({ children }) {
  const [fakeData, setFakeData] = useState("some fake data");

  return (
    <FetchContext.Provider value={{ fakeData, setFakeData }}>
      {children}
    </FetchContext.Provider>
  );
}

import React, { createContext, useState } from "react";

interface Hospital {
  name: string;
  inputs: {
    name: string;
    value: number;
  }[];
  outputs: {
    name: string;
    value: number;
  }[];
}

interface HospitalsData {
  hospitals: Hospital[];
}

interface App2ContextProps {
  hospitalsData: HospitalsData;
  setHospitalsData: React.Dispatch<React.SetStateAction<HospitalsData>>;
}

const defaultHospitalsData: HospitalsData = {
  hospitals: [],
};

const App2Context = createContext<App2ContextProps | undefined>(undefined);

export const App2Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hospitalsData, setHospitalsData] =
    useState<HospitalsData>(defaultHospitalsData);

  return (
    <App2Context.Provider value={{ hospitalsData, setHospitalsData }}>
      {children}
    </App2Context.Provider>
  );
};

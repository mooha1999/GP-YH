// import { useEffect, useState } from "react";
import OneATM from "../components/app-4/one-atm";
import TwoATMs from "../components/app-4/two-atm";
import { TabItem, Tabs } from "../components/tabs";

export default function App4() {
  const TABS: TabItem[] = [
    {
      label: "One ATM",
      content: <OneATM />,
    },
    {
      label: "Two ATMs",
      content: <TwoATMs />,
    },
  ];

  return <Tabs tabs={TABS} />;
}

import { useEffect, useState } from "react";
import styles from "./app-3.module.css";
import App3Result from "../components/app-3/app-3-result";

const COUNT = 1;
const DEFAULT_VALUES: ClinicData[] = [
  // {
  //   type: "Clinic 1",
  //   meanWaitingTime: 10,
  //   meanServiceTime: 20,
  //   meanPatients: 30,
  // },
  // {
  //   type: "Clinic 2",
  //   meanWaitingTime: 15,
  //   meanServiceTime: 25,
  //   meanPatients: 35,
  // },
  // {
  //   type: "Clinic 3",
  //   meanWaitingTime: 20,
  //   meanServiceTime: 30,
  //   meanPatients: 40,
  // },
];

export default function App3() {
  // this component should look like an excel sheet with different sheets

  // Inputs:
  // - Number of Clinic types
  // - For each clinic type:
  //   - Name
  //   - mean waiting time min.
  //   - mean service time (1/mu) min
  //   - mean # of patients

  const [clinicTypesCount, setClinicTypesCount] = useState(COUNT);
  const [clinicsData, setClinicsData] = useState<ClinicData[]>(DEFAULT_VALUES);

  useEffect(() => {
    const clinics = Array.from({ length: clinicTypesCount }, () => ({
      type: "",
      meanWaitingTime: 0,
      meanServiceTime: 0,
      meanPatients: 0,
    })) satisfies ClinicData[];
    setClinicsData(clinics);
  }, [clinicTypesCount]);

  return (
    <>
      <form className={styles["app-3"]}>
        <label>
          Number of clinic types:
          <input
            type="number"
            value={clinicTypesCount}
            onChange={(e) => setClinicTypesCount(Number(e.target.value))}
            className={styles["app-3-input"]}
          />
        </label>
        {clinicsData.map((clinic, index) => (
          <main key={index} className={styles["app-3-main"]}>
            <label>
              Clinic name:
              <input
                type="text"
                value={clinic.type}
                onChange={(e) => {
                  const updatedClinics = [...clinicsData];
                  updatedClinics[index].type = e.target.value;
                  setClinicsData(updatedClinics);
                }}
                className={styles["app-3-input"]}
              />
            </label>
            <label>
              Mean waiting time (min):
              <input
                type="number"
                value={clinic.meanWaitingTime}
                onChange={(e) => {
                  const updatedClinics = [...clinicsData];
                  updatedClinics[index].meanWaitingTime = Number(
                    e.target.value
                  );
                  setClinicsData(updatedClinics);
                }}
                className={styles["app-3-input"]}
              />
            </label>
            <label>
              Mean service time (min):
              <input
                type="number"
                value={clinic.meanServiceTime}
                onChange={(e) => {
                  const updatedClinics = [...clinicsData];
                  updatedClinics[index].meanServiceTime = Number(
                    e.target.value
                  );
                  setClinicsData(updatedClinics);
                }}
                className={styles["app-3-input"]}
              />
            </label>
            <label>
              Mean number of patients:
              <input
                type="number"
                value={clinic.meanPatients}
                onChange={(e) => {
                  const updatedClinics = [...clinicsData];
                  updatedClinics[index].meanPatients = Number(e.target.value);
                  setClinicsData(updatedClinics);
                }}
                className={styles["app-3-input"]}
              />
            </label>
          </main>
        ))}
      </form>
      {clinicsData.length > 0 && <App3Result clinicsData={clinicsData} />}
    </>
  );
}

export interface ClinicData {
  type: string;
  meanWaitingTime: number;
  meanServiceTime: number;
  meanPatients: number;
}

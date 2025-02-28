import { useState, useEffect } from "react";

import app2Styles from "./app-2.module.css";

export default function App2() {
  // full time equivalent non physician (INPUT)
  // supply expense ($1000s) (INPUT)
  // bed-days avaliable (1000s) (INPUT)
  // medicare (patient-days (1000s) (OUTPUT)
  // non-medicare patient-days (1000s) (OUTPUT)
  // nurses trained (OUTPUT)
  // interns trained (OUTPUT)

  // 1. Ask the user for the number of hosplitals
  // 2. For each hospital, ask for the following information:
  //    - Full time equivalent non physician
  //    - Supply expense ($1000s)
  //    - Bed-days available (1000s)
  //    - Medicare patient-days (1000s)
  //    - Non-medicare patient-days (1000s)
  //    - Nurses trained
  //    - Interns trained

  // 3. Calculate the following:
  //    - Total full time equivalent non physician
  //    - Total supply expense ($1000s)
  //    - Total bed-days available (1000s)
  //    - Total medicare patient-days (1000s)
  //    - Total non-medicare patient-days (1000s)
  //    - Total nurses trained
  //    - Total interns trained

  // 4. Display the following in a table:
  //    - A column for the total of each of the above
  //    - A column for each hospital representing the percentage of the total for each of the above

  // 5. Calculate the following in a table:
  //    - The average of all inputs (Avg1)
  //    - The average of all outputs (Avg2)
  //    - Avg2 * 100 / Avg1

  // 6. For each hospital, display the following:
  //    - A matrix of the inputs and outputs for each hospital
  //    -- The inputs should be displayed in the last row
  //    -- The outputs should be displayed in the last column
  //    -- The leftmost cell should include the hospital number

  const [hospitals, setHospitals] = useState<number>(1);
  const [hospitalData, setHospitalData] = useState<Hospital[]>([]);
  const [totals, setTotals] = useState<Totals>({
    fullTimeEquivalentNonPhysician: 0,
    supplyExpense: 0,
    bedDaysAvailable: 0,
    medicarePatientDays: 0,
    nonMedicarePatientDays: 0,
    nursesTrained: 0,
    internsTrained: 0,
  });
  const [inputAverages, setInputAverages] = useState<number[]>([]);
  const [outputAverages, setOutputAverages] = useState<number[]>([]);
  const [percentageAverages, setPercentageAverages] = useState<number[]>([]);
  const [matrices, setMatrices] = useState<number[][][]>([]);

  useEffect(() => {
    if (hospitals > 0) {
      setHospitalData(
        new Array(hospitals).fill(0).map(() => ({
          fullTimeEquivalentNonPhysician: 0,
          supplyExpense: 0,
          bedDaysAvailable: 0,
          medicarePatientDays: 0,
          nonMedicarePatientDays: 0,
          nursesTrained: 0,
          internsTrained: 0,
        }))
      );
    }
  }, [hospitals]);

  useEffect(() => {
    const newTotals = hospitalData.reduce(
      (acc, hospital) => {
        acc.fullTimeEquivalentNonPhysician +=
          hospital.fullTimeEquivalentNonPhysician;
        acc.supplyExpense += hospital.supplyExpense;
        acc.bedDaysAvailable += hospital.bedDaysAvailable;
        acc.medicarePatientDays += hospital.medicarePatientDays;
        acc.nonMedicarePatientDays += hospital.nonMedicarePatientDays;
        acc.nursesTrained += hospital.nursesTrained;
        acc.internsTrained += hospital.internsTrained;
        return acc;
      },
      {
        fullTimeEquivalentNonPhysician: 0,
        supplyExpense: 0,
        bedDaysAvailable: 0,
        medicarePatientDays: 0,
        nonMedicarePatientDays: 0,
        nursesTrained: 0,
        internsTrained: 0,
      }
    );
    setTotals(newTotals);
  }, [hospitalData]);

  useEffect(() => {
    const inputAverages = hospitalData.map((hospital) => {
      return (
        (hospital.fullTimeEquivalentNonPhysician +
          hospital.supplyExpense +
          hospital.bedDaysAvailable) /
        3
      );
    });

    const outputAverages = hospitalData.map((hospital) => {
      return (
        (hospital.medicarePatientDays +
          hospital.nonMedicarePatientDays +
          hospital.nursesTrained +
          hospital.internsTrained) /
        4
      );
    });

    const percentageAverages = inputAverages.map((inputAverage, index) => {
      return (outputAverages[index] * 100) / inputAverage;
    });

    setInputAverages(inputAverages);
    setOutputAverages(outputAverages);
    setPercentageAverages(percentageAverages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals]);

  useEffect(() => {
    const newMatrices = hospitalData.map((hospital, index) => {
      return [
        // the matrix should contain each output divided by each input
        [
          hospital.medicarePatientDays /
            hospital.fullTimeEquivalentNonPhysician,
          hospital.medicarePatientDays / hospital.supplyExpense,
          hospital.medicarePatientDays / hospital.bedDaysAvailable,
          hospital.medicarePatientDays,
        ],
        [
          hospital.nonMedicarePatientDays /
            hospital.fullTimeEquivalentNonPhysician,
          hospital.nonMedicarePatientDays / hospital.supplyExpense,
          hospital.nonMedicarePatientDays / hospital.bedDaysAvailable,
          hospital.nonMedicarePatientDays,
        ],
        [
          hospital.nursesTrained / hospital.fullTimeEquivalentNonPhysician,
          hospital.nursesTrained / hospital.supplyExpense,
          hospital.nursesTrained / hospital.bedDaysAvailable,
          hospital.nursesTrained,
        ],
        [
          hospital.internsTrained / hospital.fullTimeEquivalentNonPhysician,
          hospital.internsTrained / hospital.supplyExpense,
          hospital.internsTrained / hospital.bedDaysAvailable,
          hospital.internsTrained,
        ],
        [
          hospital.fullTimeEquivalentNonPhysician,
          hospital.supplyExpense,
          hospital.bedDaysAvailable,
          index + 1,
        ],
      ];
    });
    setMatrices(newMatrices);
  }, [hospitalData]);

  return (
    <div className={app2Styles["app-2"]}>
      <h1>Hospital Data</h1>
      <label>
        Number of Hospitals:
        <input
          type="number"
          value={hospitals}
          onChange={(e) => setHospitals(parseInt(e.target.value))}
        />
      </label>
      {hospitalData.map((hospital, index) => (
        <div key={index}>
          <h2>Hospital {index + 1}</h2>
          <label>
            Full Time Equivalent Non Physician:
            <input
              type="number"
              value={hospital.fullTimeEquivalentNonPhysician}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? {
                          ...h,
                          fullTimeEquivalentNonPhysician: parseInt(
                            e.target.value
                          ),
                        }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Supply Expense ($1000s):
            <input
              type="number"
              value={hospital.supplyExpense}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? { ...h, supplyExpense: parseInt(e.target.value) }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Bed-days Available (1000s):
            <input
              type="number"
              value={hospital.bedDaysAvailable}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? { ...h, bedDaysAvailable: parseInt(e.target.value) }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Medicare Patient-days (1000s):
            <input
              type="number"
              value={hospital.medicarePatientDays}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? { ...h, medicarePatientDays: parseInt(e.target.value) }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Non-medicare Patient-days (1000s):
            <input
              type="number"
              value={hospital.nonMedicarePatientDays}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? {
                          ...h,
                          nonMedicarePatientDays: parseInt(e.target.value),
                        }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Nurses Trained:
            <input
              type="number"
              value={hospital.nursesTrained}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? { ...h, nursesTrained: parseInt(e.target.value) }
                      : h
                  )
                )
              }
            />
          </label>
          <label>
            Interns Trained:
            <input
              type="number"
              value={hospital.internsTrained}
              onChange={(e) =>
                setHospitalData((prev) =>
                  prev.map((h, i) =>
                    i === index
                      ? { ...h, internsTrained: parseInt(e.target.value) }
                      : h
                  )
                )
              }
            />
          </label>
        </div>
      ))}
      <h2>Totals</h2>
      <table>
        <thead>
          <tr>
            <th>Total</th>
            {hospitalData.map((_, index) => (
              <th key={index}>Hospital {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(totals).map(([key, value], index) => (
            <tr key={index}>
              <td>{value}</td>
              {hospitalData.map((hospital, i) => (
                <td key={i}>{hospital[key as keyof Hospital]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Averages</h2>
      <table>
        <thead>
          <tr>
            <th>Average</th>
            {hospitalData.map((_, index) => (
              <th key={index}>Hospital {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inputs</td>
            {inputAverages.map((average, index) => (
              <td key={index}>{average.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Outputs</td>
            {outputAverages.map((average, index) => (
              <td key={index}>{average.toFixed(2)}</td>
            ))}
          </tr>
          <tr>
            <td>Percentage</td>
            {percentageAverages.map((average, index) => (
              <td key={index}>{average.toFixed(2)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <h2>Matrices</h2>
      {matrices.map((matrix, i) => (
        <table key={i}>
          <thead></thead>
          <tbody>
            {matrix.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k}>
                    {j === 4 && k === 3 ? `Hospital ${i + 1}` : cell.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
}

interface Hospital {
  fullTimeEquivalentNonPhysician: number;
  supplyExpense: number;
  bedDaysAvailable: number;
  medicarePatientDays: number;
  nonMedicarePatientDays: number;
  nursesTrained: number;
  internsTrained: number;
}

interface Totals {
  fullTimeEquivalentNonPhysician: number;
  supplyExpense: number;
  bedDaysAvailable: number;
  medicarePatientDays: number;
  nonMedicarePatientDays: number;
  nursesTrained: number;
  internsTrained: number;
}

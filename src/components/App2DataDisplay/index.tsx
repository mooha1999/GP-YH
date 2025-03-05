import styles from "./index.module.css";

export interface App2DataDisplayProps {
  hospitals: {
    id: string;
    name: string;
    inputs: {
      name: string;
      value: number;
    }[];
    outputs: {
      name: string;
      value: number;
    }[];
  }[];
}

export default function App2DataDisplay({ hospitals }: App2DataDisplayProps) {
  // the data will be used to display the following tables:
  // - Table 1:
  //   - first row: hospital names
  //   - last column: input/output totals
  //   - other columns: input/output values
  console.log(hospitals);
  const inputsCount = hospitals[0].inputs.length;
  const outputsCount = hospitals[0].outputs.length;
  // create a 2d array consisting of the inputs and outputs values for each hospital
  // each row represents the values of one input/output for all hospitals
  const data = Array.from({ length: inputsCount + outputsCount }).map(
    (_, index) => {
      return hospitals.map((hospital) => {
        if (index < inputsCount) {
          return hospital.inputs[index].value;
        } else {
          return hospital.outputs[index - inputsCount].value;
        }
      });
    }
  );
  // console.log(data);
  const totals = data.map((row) => {
    return row.reduce((acc, value) => Number(acc) + Number(value), 0);
  });
  console.log(totals);

  return (
    <div className={styles["app-2-data-display"]}>
      <h2>Data Display</h2>
      <table>
        <thead>
          <tr>
            {hospitals.map((hospital) => (
              <th key={hospital.id}>{hospital.name}</th>
            ))}
            <th>I/O</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {row.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
              <td>
                {index < inputsCount
                  ? hospitals[0].inputs[index].name
                  : hospitals[0].outputs[index - inputsCount].name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Percentages</h2>
      <table>
        {/* create a table with the n+2 columns where n is the number of hospitals */}
        {/* the first row will contain the hospital names and the first column will contain the total values
        and the last column will contain the I/O names */}

        <thead>
          <tr>
            <th>full</th>
            {hospitals.map((hospital) => (
              <th key={hospital.id}>%{hospital.name}</th>
            ))}
            <th>I/O</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{totals[i]}</td>
              {row.map((value, j) => (
                <td key={j}>{((value / totals[i]) * 100).toFixed(2)}</td>
              ))}
              <td>
                {i < inputsCount
                  ? hospitals[0].inputs[i].name
                  : hospitals[0].outputs[i - inputsCount].name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

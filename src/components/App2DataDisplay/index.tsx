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
  console.log(hospitals);
  const inputsCount = hospitals[0].inputs.length;
  const outputsCount = hospitals[0].outputs.length;

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

  const totals = data.map((row) => {
    return row.reduce((acc, value) => Number(acc) + Number(value), 0);
  });

  const averageInputs = hospitals.map((hospital) => {
    const sum = hospital.inputs.reduce((acc, input) => acc + input.value, 0);
    return sum / inputsCount;
  });

  const averageOutputs = hospitals.map((hospital) => {
    return (
      hospital.outputs.reduce((acc, output) => acc + output.value, 0) /
      outputsCount
    );
  });

  const ioPercentages = Array.from({ length: inputsCount }).map((_, index) => {
    return (averageOutputs[index] * 100) / averageInputs[index];
  });

  const matrices = hospitals.map((hospital) => {
    const inputs = hospital.inputs.map((input) => input.value);
    const outputs = hospital.outputs.map((output) => output.value);
    const matrix = inputs.map((input) => {
      return outputs.map((output) => {
        return (output * 100) / input;
      });
    });
    return matrix;
  });

  // create an array of means that will calculate the average of each input/output in each hospital
  const means = Array.from({ length: inputsCount + outputsCount }).map(
    (_, index) => {
      const sum = hospitals.reduce((acc, hospital) => {
        if (index < inputsCount) {
          return acc + hospital.inputs[index].value;
        } else {
          return acc + hospital.outputs[index - inputsCount].value;
        }
      }, 0);
      return sum / hospitals.length;
    }
  );

  return (
    <div className={styles["app-2-data-display"]}>
      {/* Data Display */}
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
      {/* Percentages */}
      <h2>Percentages</h2>
      <table>
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
      {/* Averages*/}
      <h2>Averages</h2>
      <table>
        <tr>
          <th>Av i/p</th>
          {averageInputs.map((value, index) => (
            <td key={index}>{value.toFixed(2)}</td>
          ))}
        </tr>
        <tr>
          <th>Av o/p</th>
          {averageOutputs.map((value, index) => (
            <td key={index}>{value.toFixed(2)}</td>
          ))}
        </tr>
      </table>
      <table>
        <tr>
          <th>I/O %</th>
          {ioPercentages.map((value, index) => (
            <td key={index}>{value.toFixed(2)}</td>
          ))}
        </tr>
      </table>
      {/* Means */}
      <h2>Means-loc</h2>
      <table>
        <tbody>
          {means.map((value, index) => (
            <tr key={index}>
              <td>{value.toFixed(2)}</td>
              <th>
                {index < inputsCount
                  ? hospitals[0].inputs[index].name
                  : hospitals[0].outputs[index - inputsCount].name}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Matrices */}
      <h2>Matrices</h2>
      {matrices.map((matrix, i) => (
        <table key={i}>
          <tbody>
            {matrix.map((row, j) => (
              <tr key={j}>
                {row.map((value, k) => (
                  <td key={k}>{value.toFixed(2)}</td>
                ))}
                <th>{hospitals[i].outputs[j].value}</th>
              </tr>
            ))}
            <tr>
              {matrix[0].map((_, k) => (
                <th key={k}>{hospitals[i].inputs[k].value}</th>
              ))}
              <th>{hospitals[i].name}</th>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}

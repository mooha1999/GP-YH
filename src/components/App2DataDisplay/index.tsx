import styles from "./index.module.css";

export interface App2DataDisplayProps {
  hospitals: Hospitals;
  evaluationRate: EvaluationRate;
}

export default function App2DataDisplay({
  hospitals,
  evaluationRate,
}: App2DataDisplayProps) {
  console.log(evaluationRate);
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

  const ioPercentages = Array.from({ length: hospitals.length }).map(
    (_, index) => {
      return (averageOutputs[index] * 100) / averageInputs[index];
    }
  );

  const matrices = hospitals.map((hospital) => {
    const inputs = hospital.inputs.map((input) => input.value);
    const outputs = hospital.outputs.map((output) => output.value);
    const matrix = outputs.map((output) => {
      return inputs.map((input) => {
        return output / input;
      });
    });
    return matrix;
  });

  const meansMatrix = matrices.reduce((acc, matrix) => {
    return matrix.map((row, i) => {
      return row.map((value, j) => {
        return acc[i][j] + value;
      });
    });
  });

  const maxMatrix = matrices.reduce((acc, matrix) => {
    return matrix.map((row, i) => {
      return row.map((value, j) => {
        return Math.max(acc[i][j], value);
      });
    });
  });

  // create a matrix of meansMatrix against the maxMatrix
  const meansMaxMatrix = meansMatrix.map((row, i) => {
    return row.map((value, j) => {
      return value / maxMatrix[i][j];
    });
  });

  // get the sum of all the values in the meansMaxMatrix and divide by the number of inputs * number of outputs
  const meansMaxMartixAverage =
    meansMaxMatrix.reduce((acc, row) => {
      return acc + row.reduce((acc, value) => acc + value, 0);
    }, 0) /
    (inputsCount * outputsCount);

  //get the standard deviation of the meansMaxMatrix
  const meansMaxMatrixStandardDeviation = Math.sqrt(
    meansMaxMatrix.reduce((acc, row) => {
      return (
        acc +
        row.reduce((acc, value) => {
          return acc + Math.pow(value - meansMaxMartixAverage, 2);
        }, 0)
      );
    }, 0) /
      (inputsCount * outputsCount)
  );

  //create an array of matrices using the matrices array againt the maxMatrix
  const meansMaxMatrices = matrices.map((matrix, index) => {
    const ret = matrix.map((row, i) => {
      return row.map((value, j) => {
        return value / maxMatrix[i][j];
      });
    });

    return {
      meansMaxMatrices: ret,
      name: hospitals[index].name,
    };
  });
  console.log("meansMaxMatrices", meansMaxMatrices);

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
      {/* I am using tailwindcss for styling */}
      {evaluationRate !== "RATE" && (
        <main className="grid grid-cols-2 gap-4 overflow-auto">
          <main>
            {/* Data Display */}
            <h2>Data Display</h2>
            <DataDisplay
              hospitals={hospitals}
              data={data}
              inputsCount={inputsCount}
            />
          </main>
          <main>
            {/* Percentages */}
            <h2>Percentages</h2>
            <Percentages
              hospitals={hospitals}
              data={data}
              totals={totals}
              inputsCount={inputsCount}
              sortingArray={
                evaluationRate === "INPUT"
                  ? averageInputs
                  : evaluationRate === "OUTPUT"
                  ? averageOutputs
                  : ioPercentages
              }
            />
            {/* Averages*/}
            <h2>Averages</h2>
            {evaluationRate !== "BOTH" && (
              <Averages
                evaluationRate={evaluationRate}
                averageInputs={averageInputs}
                averageOutputs={averageOutputs}
              />
            )}
            {/* I/O Percentages */}
            {evaluationRate === "BOTH" && (
              <IO_Percentages ioPercentages={ioPercentages} />
            )}
          </main>
        </main>
      )}
      {evaluationRate === "RATE" && (
        <>
          <main className="flex gap-4">
            <Means
              means={means}
              inputsCount={inputsCount}
              hospitals={hospitals}
              data={data}
            />
          </main>
          {/* Means */}
          {/* Matrices */}
          <h2>Matrices</h2>
          <Matrices matrices={matrices} hospitals={hospitals} />
          {/* Group Means Matrix */}
          <h2>Group-Means Matrix</h2>
          <GroupMeansMatrix meansMatrix={meansMatrix} hospitals={hospitals} />
          {/* Max Matrix */}
          <h2>Max Matrix</h2>
          <MaxMatrix maxMatrix={maxMatrix} hospitals={hospitals} />
          {/* Means/Max Matrix */}
          <h2>Group-Means/Max Matrix</h2>
          <MeansMaxMatrix
            meansMaxMatrix={meansMaxMatrix}
            hospitals={hospitals}
          />
          <StatsTable
            meansMaxMartixAverage={meansMaxMartixAverage}
            meansMaxMatrixStandardDeviation={meansMaxMatrixStandardDeviation}
          />
          {/* Means/Max Matrices */}
          <h2>Means/Max Matrices</h2>
          <MeansMaxMatrics
            meansMaxMatrices={meansMaxMatrices}
            hospitals={hospitals}
          />
        </>
      )}
    </div>
  );
}

function MeansMaxMatrics({
  meansMaxMatrices,
  hospitals,
}: {
  meansMaxMatrices: {
    meansMaxMatrices: number[][];
    name: string;
  }[];
  hospitals: {
    id: string;
    name: string;
    inputs: { name: string; value: number }[];
    outputs: { name: string; value: number }[];
  }[];
}) {
  return (
    <div className="flex gap-4 overflow-auto">
      {meansMaxMatrices
        .sort((a, b) => {
          // sort the matrices by the average of the meansMaxMatrix
          const averageA = a.meansMaxMatrices.reduce((acc, row) => {
            return acc + row.reduce((acc, value) => acc + value, 0);
          }, 0);
          const averageB = b.meansMaxMatrices.reduce((acc, row) => {
            return acc + row.reduce((acc, value) => acc + value, 0);
          }, 0);
          return averageB - averageA;
        })
        .map((matrix, i) => {
          // calculate the average and standard deviation of the matrix
          const average =
            matrix.meansMaxMatrices.reduce((acc, row) => {
              return acc + row.reduce((acc, value) => acc + value, 0);
            }, 0) /
            (matrix.meansMaxMatrices.length *
              matrix.meansMaxMatrices[0].length);
          const standardDeviation = Math.sqrt(
            matrix.meansMaxMatrices.reduce((acc, row) => {
              return (
                acc +
                row.reduce((acc, value) => {
                  return acc + Math.pow(value - average, 2);
                }, 0)
              );
            }, 0)
          );
          return (
            <div>
              <table key={hospitals[i].id}>
                <tbody>
                  {matrix.meansMaxMatrices.map((row, j) => (
                    <tr key={j}>
                      {row.map((value, k) => (
                        <td key={k}>{value.toFixed(2)}</td>
                      ))}
                      <th>{hospitals[i].outputs[j].name}</th>
                    </tr>
                  ))}
                  <tr>
                    {matrix.meansMaxMatrices[0].map((_, k) => (
                      <th key={k}>{hospitals[i].inputs[k].name}</th>
                    ))}
                    <th>{matrix.name}</th>
                  </tr>
                </tbody>
              </table>
              <StatsTable
                meansMaxMartixAverage={average}
                meansMaxMatrixStandardDeviation={standardDeviation}
              />
            </div>
          );
        })}
    </div>
  );
}

function StatsTable({
  meansMaxMartixAverage,
  meansMaxMatrixStandardDeviation,
}: {
  meansMaxMartixAverage: number;
  meansMaxMatrixStandardDeviation: number;
}) {
  return (
    <table>
      <tr>
        <th>Mean Group</th>
        <td>{meansMaxMartixAverage.toFixed(2)}</td>
      </tr>
      <tr>
        <th>Std Group</th>
        <td>{meansMaxMatrixStandardDeviation.toFixed(2)}</td>
      </tr>
    </table>
  );
}

function MeansMaxMatrix({
  meansMaxMatrix,
  hospitals,
}: {
  meansMaxMatrix: number[][];
  hospitals: Hospitals;
}) {
  return (
    <table>
      <tbody>
        {meansMaxMatrix.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j}>{value.toFixed(2)}</td>
            ))}
            <th>{hospitals[0].outputs[i].name}</th>
          </tr>
        ))}
        <tr>
          {hospitals[0].inputs.map((input, i) => (
            <th key={i}>{input.name}</th>
          ))}
          <th></th>
        </tr>
      </tbody>
    </table>
  );
}

function MaxMatrix({
  maxMatrix,
  hospitals,
}: {
  maxMatrix: number[][];
  hospitals: Hospitals;
}) {
  return (
    <table>
      <tbody>
        {maxMatrix.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j}>{value.toFixed(2)}</td>
            ))}
            <th>{hospitals[0].outputs[i].name}</th>
          </tr>
        ))}
        <tr>
          {hospitals[0].inputs.map((input, i) => (
            <th key={i}>{input.name}</th>
          ))}
          <th></th>
        </tr>
      </tbody>
    </table>
  );
}

function GroupMeansMatrix({
  meansMatrix,
  hospitals,
}: {
  meansMatrix: number[][];
  hospitals: Hospitals;
}) {
  return (
    <table>
      <tbody>
        {meansMatrix.map((row, i) => (
          <tr key={i}>
            {row.map((value, j) => (
              <td key={j}>{(value / hospitals.length).toFixed(2)}</td>
            ))}
            <th>{hospitals[0].outputs[i].name}</th>
          </tr>
        ))}
        <tr>
          {hospitals[0].inputs.map((input, i) => (
            <th key={i}>{input.name}</th>
          ))}
          <th></th>
        </tr>
      </tbody>
    </table>
  );
}

function Matrices({
  matrices,
  hospitals,
}: {
  matrices: number[][][];
  hospitals: Hospitals;
}) {
  console.log(matrices);
  return (
    <div className="flex gap-4 overflow-auto">
      {matrices.map((matrix, i) => (
        <table key={hospitals[i].id}>
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

function Means({
  means,
  inputsCount,
  hospitals,
  data,
}: {
  means: number[];
  inputsCount: number;
  hospitals: Hospitals;
  data: number[][];
}) {
  return (
    <table>
      <thead>
        <tr>
          {hospitals.map((hospital) => (
            <th key={hospital.id}>{hospital.name}</th>
          ))}
          <th>I/O</th>
          <th>Means-loc</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor: index < inputsCount ? "#f0f0f0" : "#aaaaaa",
            }}
          >
            {row.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
            <td>
              {index < inputsCount
                ? `${hospitals[0].inputs[index].name} (I)`
                : `${hospitals[0].outputs[index - inputsCount].name} (O)`}
            </td>
            <td>{means[index].toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DataDisplay({
  hospitals,
  data,
  inputsCount,
}: {
  hospitals: Hospitals;
  data: number[][];
  inputsCount: number;
}) {
  return (
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
          <tr
            key={index}
            style={{
              backgroundColor: index < inputsCount ? "#f0f0f0" : "#aaaaaa",
            }}
          >
            {row.map((value, index) => (
              <td key={index}>{value}</td>
            ))}
            <td>
              {index < inputsCount
                ? `${hospitals[0].inputs[index].name} (I)`
                : `${hospitals[0].outputs[index - inputsCount].name} (O)`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Percentages({
  hospitals,
  data,
  totals,
  inputsCount,
  sortingArray,
}: {
  hospitals: Hospitals;
  data: number[][];
  totals: number[];
  inputsCount: number;
  sortingArray: number[];
}) {
  // Sort the hospitals based on the sortingArray

  const sortedHospitals = hospitals
    .map((hospital, index) => ({ ...hospital, index }))
    .sort((a, b) => sortingArray[b.index] - sortingArray[a.index]);

  // Sort the data based on the sorted hospitals
  const sortedData = data.map((row) => {
    return row
      .map((val, index) => {
        return { val, index };
      })
      .sort((a, b) => {
        return sortingArray[b.index] - sortingArray[a.index];
      })
      .map((item) => item.val);
  });

  // Sort the totals based on the sorted hospitals
  const sortedTotals = totals
    .map((total, index) => {
      return { total, index };
    })
    .sort((a, b) => sortingArray[b.index] - sortingArray[a.index]);

  return (
    <table>
      <thead>
        <tr>
          <th>full</th>
          {sortedHospitals.map((hospital) => (
            <th key={hospital.id}>%{hospital.name}</th>
          ))}
          <th>I/O</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <tr key={i}>
            <td>{sortedTotals[i].total}</td>
            {row.map((value, j) => (
              <td key={j}>
                {((value / sortedTotals[i].total) * 100).toFixed(2)}
              </td>
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
  );
}

function Averages({
  averageInputs,
  averageOutputs,
  evaluationRate,
}: {
  averageInputs: number[];
  averageOutputs: number[];
  evaluationRate: EvaluationRate;
}) {
  const sortedAverageInputs = [...averageInputs].sort((a, b) => b - a);
  const sortedAverageOutputs = [...averageOutputs].sort((a, b) => b - a);
  return (
    <table>
      <tbody>
        {evaluationRate === "INPUT" && (
          <tr>
            <th>Av i/p</th>
            {sortedAverageInputs.map((value, index) => (
              <td key={index}>{value.toFixed(2)}</td>
            ))}
          </tr>
        )}
        {evaluationRate === "OUTPUT" && (
          <tr>
            <th>Av o/p</th>
            {sortedAverageOutputs.map((value, index) => (
              <td key={index}>{value.toFixed(2)}</td>
            ))}
          </tr>
        )}
      </tbody>
    </table>
  );
}

function IO_Percentages({ ioPercentages }: { ioPercentages: number[] }) {
  const sortedIOPercentages = [...ioPercentages].sort((a, b) => b - a);
  return (
    <table>
      <tbody>
        <tr>
          <th>I/O %</th>
          {sortedIOPercentages.map((value, index) => (
            <td key={index}>{value.toFixed(2)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

type Hospitals = {
  id: string;
  name: string;
  inputs: { name: string; value: number }[];
  outputs: { name: string; value: number }[];
}[];

export type EvaluationRate = "INPUT" | "OUTPUT" | "BOTH" | "RATE";

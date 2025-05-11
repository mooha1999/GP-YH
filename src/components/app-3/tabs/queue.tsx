import { ClinicInputs, ClinicOutputs } from "../app-3-result";
import Plot from "react-plotly.js";
interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function QueueTab({ inputs, metrics }: Props) {
  const displayData1 = {
    type: inputs.type,
    meansWaitingTime: inputs.meansWaitingTime,
  };

  const displayData2 = {
    type: inputs.type,
    meanInterarrivalTime: metrics.meanInterarrivalTime,
  };
  console.log("displayData2", displayData2);
  const displayData3 = {
    // the following will be calculated from meansWaitingTime
    Mean:
      displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
      displayData1.meansWaitingTime.value.length,
    "Standard Error":
      Math.sqrt(
        displayData1.meansWaitingTime.value.reduce(
          (a, b) =>
            a +
            Math.pow(
              b -
                displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
                  displayData1.meansWaitingTime.value.length,
              2
            ),
          0
        ) /
          (displayData1.meansWaitingTime.value.length - 1)
      ) / Math.sqrt(displayData1.meansWaitingTime.value.length),
    Median: displayData1.meansWaitingTime.value.sort((a, b) => a - b)[
      Math.floor(displayData1.meansWaitingTime.value.length / 2)
    ],
    Mode: displayData1.meansWaitingTime.value.sort(
      (a, b) =>
        displayData1.meansWaitingTime.value.filter((v) => v === a).length -
        displayData1.meansWaitingTime.value.filter((v) => v === b).length
    )[0],
    "Standard Deviation": Math.sqrt(
      displayData1.meansWaitingTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
                displayData1.meansWaitingTime.value.length,
            2
          ),
        0
      ) / displayData1.meansWaitingTime.value.length
    ),
    "Sample Variance":
      displayData1.meansWaitingTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
                displayData1.meansWaitingTime.value.length,
            2
          ),
        0
      ) /
      (displayData1.meansWaitingTime.value.length - 1),
    Kurtosis:
      displayData1.meansWaitingTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
                displayData1.meansWaitingTime.value.length,
            4
          ),
        0
      ) /
      (displayData1.meansWaitingTime.value.length *
        Math.pow(
          displayData1.meansWaitingTime.value.reduce(
            (a, b) =>
              a +
              Math.pow(
                b -
                  displayData1.meansWaitingTime.value.reduce(
                    (a, b) => a + b,
                    0
                  ) /
                    displayData1.meansWaitingTime.value.length,
                2
              ),
            0
          ),
          2
        ) -
        3 *
          (displayData1.meansWaitingTime.value.length - 1) *
          (displayData1.meansWaitingTime.value.length - 2)),
    Skewness:
      displayData1.meansWaitingTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0) /
                displayData1.meansWaitingTime.value.length,
            3
          ),
        0
      ) /
      (displayData1.meansWaitingTime.value.length *
        Math.pow(
          displayData1.meansWaitingTime.value.reduce(
            (a, b) =>
              a +
              Math.pow(
                b -
                  displayData1.meansWaitingTime.value.reduce(
                    (a, b) => a + b,
                    0
                  ) /
                    displayData1.meansWaitingTime.value.length,
                2
              ),
            0
          ),
          1.5
        ) -
        3 *
          (displayData1.meansWaitingTime.value.length - 1) *
          (displayData1.meansWaitingTime.value.length - 2)),
    Range:
      Math.max(...displayData1.meansWaitingTime.value) -
      Math.min(...displayData1.meansWaitingTime.value),
    Minimum: Math.min(...displayData1.meansWaitingTime.value),
    Maximum: Math.max(...displayData1.meansWaitingTime.value),
    Sum: displayData1.meansWaitingTime.value.reduce((a, b) => a + b, 0),
    Count: displayData1.meansWaitingTime.value.length,
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Queue Metrics</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            {Object.entries(displayData1).map(([key, { label }]) => (
              <th
                key={key}
                className="px-4 py-2 text-left border-r border-gray-300 last:border-r-0"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputs.type.value.map((_, index) => (
            <tr key={index} className="border-b">
              {Object.entries(displayData1).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg font-semibold mt-8 mb-4">Queue Metrics</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            {Object.entries(displayData2).map(([key, { label }]) => (
              <th
                key={key}
                className="px-4 py-2 text-left border-r border-gray-300 last:border-r-0"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {inputs.type.value.map((_, index) => (
            <tr key={index} className="border-b">
              {Object.entries(displayData2).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-b">
            <td></td>
            <td></td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Min</td>
            <td className="px-4 py-2">
              {Math.min(...displayData2.meanInterarrivalTime.value)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Max</td>
            <td className="px-4 py-2">
              {Math.max(...displayData2.meanInterarrivalTime.value)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2">Mean</td>
            <td className="px-4 py-2">
              {(
                displayData2.meanInterarrivalTime.value.reduce(
                  (a, b) => a + b,
                  0
                ) / displayData2.meanInterarrivalTime.value.length
              ).toFixed(2)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2"># of Chairs(patients only)</td>
            <td className="px-4 py-2">
              {(
                (20 *
                  displayData2.meanInterarrivalTime.value.reduce(
                    (a, b) => a + b,
                    0
                  )) /
                displayData2.meanInterarrivalTime.value.length
              ).toFixed(2)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="px-4 py-2"># of Chairs(patient + مرافق)</td>
            <td className="px-4 py-2">
              {(
                (2 *
                  20 *
                  displayData2.meanInterarrivalTime.value.reduce(
                    (a, b) => a + b,
                    0
                  )) /
                displayData2.meanInterarrivalTime.value.length
              ).toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="text-lg font-semibold mt-8 mb-4">Mean Waiting Time</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <tbody>
          {Object.entries(displayData3).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="px-4 py-2 bg-gray-100 border-b border-gray-300">
                {key}
              </td>
              <td className="px-4 py-2 border-b border-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Plot
        data={[
          {
            x: displayData1.type.value,
            y: displayData1.meansWaitingTime.value,
            type: "bar",
            marker: { color: "blue" },
            name: "Mean Waiting Time",
            mode: "lines+markers",
            line: { color: "blue", width: 2 },
            text: displayData1.meansWaitingTime.value.map((val) =>
              val.toFixed(2)
            ),
            textposition: "auto",
            hoverinfo: "text",
          },
        ]}
        layout={{
          title: "Mean Waiting Time",
          xaxis: { title: "Type" },
          yaxis: { title: "Mean Waiting Time" },
          showlegend: true,
        }}
      />
    </div>
  );
}

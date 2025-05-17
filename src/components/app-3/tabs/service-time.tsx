import { ClinicInputs, ClinicOutputs } from "../app-3-result";
import Plot from "react-plotly.js";
interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function ServiceTimeTab({ inputs }: Props) {
  const displayData1 = {
    type: {
      ...inputs.type,
      value: inputs.type.value.concat(["min", "max", "average"]),
    },
    meansServiceTime: {
      ...inputs.meansServiceTime,
      value: inputs.meansServiceTime.value.concat([
        Math.min(...inputs.meansServiceTime.value),
        Math.max(...inputs.meansServiceTime.value),
        inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
          inputs.meansServiceTime.value.length,
      ]),
    },
  };

  const displayData2 = {
    Mean:
      inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
      inputs.meansServiceTime.value.length,
    "Standard Error":
      Math.sqrt(
        inputs.meansServiceTime.value.reduce(
          (a, b) =>
            a +
            Math.pow(
              b -
                inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                  inputs.meansServiceTime.value.length,
              2
            ),
          0
        ) /
          (inputs.meansServiceTime.value.length - 1)
      ) / Math.sqrt(inputs.meansServiceTime.value.length),
    Median: inputs.meansServiceTime.value.sort((a, b) => a - b)[
      Math.floor(inputs.meansServiceTime.value.length / 2)
    ],
    Mode: inputs.meansServiceTime.value.sort(
      (a, b) =>
        inputs.meansServiceTime.value.filter((v) => v === a).length -
        inputs.meansServiceTime.value.filter((v) => v === b).length
    )[0],
    "Standard Deviation": Math.sqrt(
      inputs.meansServiceTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                inputs.meansServiceTime.value.length,
            2
          ),
        0
      ) / inputs.meansServiceTime.value.length
    ),
    "Sample Variance":
      inputs.meansServiceTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                inputs.meansServiceTime.value.length,
            2
          ),
        0
      ) /
      (inputs.meansServiceTime.value.length - 1),
    Kurtosis:
      inputs.meansServiceTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                inputs.meansServiceTime.value.length,
            4
          ),
        0
      ) /
        Math.pow(
          inputs.meansServiceTime.value.reduce(
            (a, b) =>
              a +
              Math.pow(
                b -
                  inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                    inputs.meansServiceTime.value.length,
                2
              ),
            0
          ),
          2
        ) -
      3 *
        (inputs.meansServiceTime.value.length - 1) *
        (inputs.meansServiceTime.value.length - 2),
    Skewness:
      inputs.meansServiceTime.value.reduce(
        (a, b) =>
          a +
          Math.pow(
            b -
              inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                inputs.meansServiceTime.value.length,
            3
          ),
        0
      ) /
        Math.pow(
          inputs.meansServiceTime.value.reduce(
            (a, b) =>
              a +
              Math.pow(
                b -
                  inputs.meansServiceTime.value.reduce((a, b) => a + b, 0) /
                    inputs.meansServiceTime.value.length,
                2
              ),
            0
          ),
          3
        ) -
      3 *
        (inputs.meansServiceTime.value.length - 1) *
        (inputs.meansServiceTime.value.length - 2),
  };

  // Calculate the frequency as the following:
  // frequency = 1 means that there is one customer in the system whose service time is between 0 and 1
  // and so on
  const distnicts = inputs.meansServiceTime.value.map((value) =>
    Math.floor(value)
  );
  const frequency = distnicts.reduce((acc, value) => {
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="w-full  ">
      <h2 className="text-lg font-semibold mb-4">Service Time Metrics</h2>
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

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Service Time Statistics
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <tbody>
          {Object.entries(displayData2).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="px-4 py-2 bg-gray-100 border-b border-gray-300">
                {key}
              </td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mt-8 mb-4">
        Service Time Frequency
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="px-4 py-2 text-left border-r border-gray-300 last:border-r-0">
              Service Time
            </th>
            <th className="px-4 py-2 text-left border-r border-gray-300 last:border-r-0">
              Frequency
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(frequency).map(([key, value]) => (
            <tr key={key} className="border-b">
              <td className="px-4 py-2">{key}</td>
              <td className="px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-lg font-semibold mt-8 mb-4">Service Time Plot</h2>
      <Plot
        data={[
          {
            x: Object.keys(frequency).map((key) => parseInt(key)),
            y: Object.values(frequency),
            type: "bar",
            mode: "text+lines+markers",
            name: "Service Time Frequency",
          },
        ]}
        layout={{
          title: "Service Time Frequency",
          xaxis: { title: "Service Time" },
          yaxis: { title: "Frequency" },
          showlegend: true,
        }}
        config={{ responsive: true, displayModeBar: false }}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}

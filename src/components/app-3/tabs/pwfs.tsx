import { ClinicInputs, ClinicOutputs } from "../app-3-result";
import Plot from "react-plotly.js";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function Pwfs({ inputs, metrics }: Props) {
  const displayData = {
    labels: inputs.type,
    probabilityWaitingForService: metrics.probabilityWaitingForService,
  };
  return (
    <div className="w-full  ">
      <h2 className="text-lg font-semibold mb-4">
        Probability Waiting For Service
      </h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            {Object.entries(displayData).map(([key, { label }]) => (
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
              {Object.entries(displayData).map(([key, { value }]) => (
                <td key={key} className="px-4 py-2">
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Plot
        data={[
          {
            x: displayData.labels.value,
            y: displayData.probabilityWaitingForService.value,
            type: "bar",
            marker: { color: "blue" },
            name: "Probability Waiting For Service",
            mode: "lines+markers",
            line: { color: "blue", width: 2 },
            text: displayData.probabilityWaitingForService.value.map((val) =>
              val.toFixed(2)
            ),
            textposition: "auto",
            hoverinfo: "text",
          },
        ]}
        layout={{
          title: "Probability Waiting For Service",
          xaxis: { title: "Labels" },
          yaxis: { title: "Probability" },
          showlegend: true,
        }}
        style={{ width: "100%", height: "400px" }}
        config={{ responsive: true, displayModeBar: false }}
      />
    </div>
  );
}

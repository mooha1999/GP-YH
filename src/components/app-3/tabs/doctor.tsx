import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function DoctorTap({ inputs, metrics }: Props) {
  // calculate the following:
  // tot time with doctor(min)
  //  -> mean service time * mean patients
  // est clinic duration (min)
  //  -> utilization factor rho * tot time with doctor
  // est clinic duration (hr)
  //  -> est clinic duration (min) / 60

  const totTimeWithDoctor = inputs.meansServiceTime.value.map((time, i) => {
    return time * inputs.meansPatients.value[i];
  });

  const estClinicDurationMin = metrics.utilizationFactor.value.map((rho, i) => {
    return rho * totTimeWithDoctor[i];
  });
  const estClinicDurationHr = estClinicDurationMin.map((time) => {
    return time / 60;
  });

  const displayData = {
    type: inputs.type,
    meanServiceTime: inputs.meansServiceTime,
    meanPatients: inputs.meansPatients,
    utilizationFactor: metrics.utilizationFactor,
    gap: {
      label: "",
      value: Array(inputs.type.value.length).fill(""),
    },
    totTimeWithDoctor: {
      label: "tot time with doctor (min)",
      value: totTimeWithDoctor,
    },
    estClinicDurationMin: {
      label: "est clinic duration (min)",
      value: estClinicDurationMin,
    },
    estClinicDurationHr: {
      label: "est clinic duration (hr)",
      value: estClinicDurationHr,
    },
  };

  return (
    <div className="w-full  ">
      <h2 className="text-lg font-semibold mb-4">Doctor Metrics</h2>
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
            <tr
              key={index}
              className="border-b border-gray-300 last:border-b-0"
            >
              {Object.entries(displayData).map(([key, { value }]) => (
                <td
                  key={key}
                  className="px-4 py-2 border-r border-gray-300 last:border-r-0"
                >
                  {value[index]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { ClinicInputs, ClinicOutputs } from "../app-3-result";
import Plot from "react-plotly.js";
interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function ServiceTimeTab({ inputs, metrics }: Props) {
  const displayData1 = {
    type: inputs.type,
    meansServiceTime: inputs.meansServiceTime,
  };

  return <></>;
}

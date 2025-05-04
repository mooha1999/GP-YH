import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function QueueTab({ inputs, metrics }: Props) {
  console.log("QueueTab inputs", inputs);
  console.log("QueueTab metrics", metrics);
  // const meansWaitingTime = inputs.meansWaitingTime.value;

  return <></>;
}

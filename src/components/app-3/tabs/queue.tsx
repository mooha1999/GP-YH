import { ClinicInputs, ClinicOutputs } from "../app-3-result";

interface Props {
  inputs: ClinicInputs;
  metrics: ClinicOutputs;
}

export default function QueueTab({ inputs, metrics }: Props) {
  const meanWaitingTime = inputs.meansWaitingTime.value;
  return <></>;
}

import { ClinicData } from "../../pages/app-3";
import InptutQueueOutputTab from "./tabs/input-queue-output";
import DoctorTap from "./tabs/doctor";
import PatientCycleTab from "./tabs/patient-cycle";
import QueueTab from "./tabs/queue";
import Pwfs from "./tabs/pwfs";
import SystemTab from "./tabs/system";
import ServiceTimeTab from "./tabs/service-time";
import { TabItem, Tabs } from "../tabs";

export interface App3ResultProps {
  clinicsData: ClinicData[];
}

export default function App3Result({ clinicsData }: App3ResultProps) {
  // the following will be calculated from the clinicsData:
  // mean arrival rate lambda (person / hr)
  //    -> (mean waiting time / (mean service time ^ 2)) / (1+mean waiting time / mean service time) * 60
  // utilization factor rho
  //    -> mean arrival rate lambda * mean service time / 60
  // mean interarrival time 1/lambda min
  //    -> 60 / mean arrival rate lambda
  // idle
  //    -> 1 - utilization factor rho
  // mean service rate mu person/hr
  //    -> 60 / mean service time
  // mean queue length persons
  //    -> (mean arrival rate lambda ^ 2) / ( mean service rate mu * (mean service rate mu - mean arrival rate lambda))
  // mean customers in system #_in_sys
  //    -> mean arrival rate lambda  / (mean service rate mu - mean arrival rate lambda)
  // mean time/customer in system hr
  //    -> 1 / (mean arrival rate lambda - mean service rate mu)
  // probability (waiting for service)
  //    -> 1 - ((1 - mean arrival rate lambda / mean service rate mu)) * (1 + mean arrival rate lambda / mean service rate mu)

  const meanArrivalRate = clinicsData.map((clinic) => {
    const { meanWaitingTime, meanServiceTime } = clinic;
    return (
      (meanWaitingTime /
        meanServiceTime ** 2 /
        (1 + meanWaitingTime / meanServiceTime)) *
      60
    );
  });

  const utilizationFactor = clinicsData.map((clinic, i) => {
    const { meanServiceTime } = clinic;
    return (meanArrivalRate[i] * meanServiceTime) / 60;
  });

  const meanInterarrivalTime = clinicsData.map((clinic) => {
    return 60 / clinic.meanWaitingTime;
  });

  const idle = utilizationFactor.map((rho) => {
    return 1 - rho;
  });

  const meanServiceRate = clinicsData.map((clinic) => {
    return 60 / clinic.meanServiceTime;
  });

  const meanQueueLength = clinicsData.map((_, i) => {
    return (
      meanArrivalRate[i] ** 2 /
      (meanServiceRate[i] * (meanServiceRate[i] - meanArrivalRate[i]))
    );
  });

  const meanCustomersInSystem = clinicsData.map((_, i) => {
    return meanArrivalRate[i] / (meanServiceRate[i] - meanArrivalRate[i]);
  });

  const meanTimeCustomerInSystem = clinicsData.map((_, i) => {
    return 1 / (meanServiceRate[i] - meanArrivalRate[i]);
  });

  const probabilityWaitingForService = clinicsData.map((_, i) => {
    return (
      1 -
      (1 - meanArrivalRate[i] / meanServiceRate[i]) *
        (1 + meanArrivalRate[i] / meanServiceRate[i])
    );
  });

  const metrics: ClinicOutputs = {
    meanArrivalRate: {
      label: "mean arrival rate lambda (person / hr)",
      value: meanArrivalRate,
    },
    utilizationFactor: {
      label: "utilization factor rho",
      value: utilizationFactor,
    },
    meanInterarrivalTime: {
      label: "mean interarrival time 1/lambda min",
      value: meanInterarrivalTime,
    },
    idle: {
      label: "idle",
      value: idle,
    },
    meanServiceRate: {
      label: "mean service rate mu person/hr",
      value: meanServiceRate,
    },
    meanQueueLength: {
      label: "mean queue length persons",
      value: meanQueueLength,
    },
    meanCustomersInSystem: {
      label: "mean customers in system #_in_sys",
      value: meanCustomersInSystem,
    },
    meanTimeCustomerInSystem: {
      label: "mean time/customer in system hr",
      value: meanTimeCustomerInSystem,
    },
    probabilityWaitingForService: {
      label: "probability (waiting for service)",
      value: probabilityWaitingForService,
    },
  };

  const inputs: ClinicInputs = {
    type: {
      label: "Clinic Type",
      value: clinicsData.map((clinic) => clinic.type),
    },
    meansWaitingTime: {
      label: "mean waiting time min",
      value: clinicsData.map((clinic) => clinic.meanWaitingTime),
    },
    meansServiceTime: {
      label: "mean service time (1/mu) min",
      value: clinicsData.map((clinic) => clinic.meanServiceTime),
    },
    meansPatients: {
      label: "mean # of patients",
      value: clinicsData.map((clinic) => clinic.meanPatients),
    },
  };

  const TABS: TabItem[] = [
    {
      label: "input queue output",
      content: <InptutQueueOutputTab inputs={inputs} metrics={metrics} />,
    },
    {
      label: "service time",
      content: <ServiceTimeTab inputs={inputs} metrics={metrics} />,
    },
    {
      label: "queue",
      content: <QueueTab inputs={inputs} metrics={metrics} />,
    },
    {
      label: "system",
      content: <SystemTab inputs={inputs} metrics={metrics} />,
    },
    {
      label: "p(wfs)",
      content: <Pwfs inputs={inputs} metrics={metrics} />,
    },
    {
      label: "patient cycle",
      content: <PatientCycleTab inputs={inputs} metrics={metrics} />,
    },
    {
      label: "doctor",
      content: <DoctorTap inputs={inputs} metrics={metrics} />,
    },
  ];
  return <Tabs tabs={TABS} />;
}

interface ClinicMetrics {
  label: string;
  value: number[];
}
interface ClinicLabels {
  label: string;
  value: string[];
}

export interface ClinicInputs {
  type: ClinicLabels;
  meansWaitingTime: ClinicMetrics;
  meansServiceTime: ClinicMetrics;
  meansPatients: ClinicMetrics;
}
export interface ClinicOutputs {
  meanArrivalRate: ClinicMetrics;
  utilizationFactor: ClinicMetrics;
  meanInterarrivalTime: ClinicMetrics;
  idle: ClinicMetrics;
  meanServiceRate: ClinicMetrics;
  meanQueueLength: ClinicMetrics;
  meanCustomersInSystem: ClinicMetrics;
  meanTimeCustomerInSystem: ClinicMetrics;
  probabilityWaitingForService: ClinicMetrics;
}

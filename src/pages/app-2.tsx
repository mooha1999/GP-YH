import { useFieldArray, useForm } from "react-hook-form";

import app2Styles from "./app-2.module.css";
import InputsOutputsForm from "../components/InputsOutputsForm";

export default function App2() {
  // 1. Ask the user for the number of hosplitals
  // 2. For each hospital, ask for the following information:
  //    - Name
  // 3. For each hospital, create a dynamic form to ask for the following information:
  //    - Field name
  //    - Field value
  //    - Field type (Input or Output)
  // 4. The user should be able to add or remove fields
  // 5. The user should be able to submit the form
  // 6. On submit, the form should be validated then:
  //    - If the form is valid, the following should be displayed in tables:
  //      - A table that has the following columns:
  //        - Totals column for each field type in each hospital
  //        - Another n columns for each field name in each hospital representing the field percentage of the total
  //      - A table that has the following columns:
  //        - N columns for each field name in each hospital representing the average of the input fields
  //      - A table that has the following columns:
  //        - N columns for each field name in each hospital representing the average of the output fields
  //      - A table that has the following columns:
  //        - N columns for each field name in each hospital representing the following formula:
  //          - (average of output fields) * 100 / (average of input fields)
  //    - If the form is invalid, the user should be notified of the errors

  const { register, handleSubmit, formState, watch } = useForm<GeneralInfo>({
    defaultValues: {
      hospitalsCount: 1,
    },
  });

  const hospitalsCount = watch("hospitalsCount");

  const {
    register: registerInput,
    control: controlInputs,
    watch: inputsWatch,
  } = useForm<Inputs>({
    defaultValues: {
      inputs: Array.from({ length: 1 }).map(() => ({
        name: "",
      })),
    },
  }); // for input names

  const i = inputsWatch("inputs");

  const {
    fields: inputFields,
    append: appendInput,
    remove: removeInput,
  } = useFieldArray({
    control: controlInputs,
    name: "inputs",
  });

  const {
    register: registerOutput,
    control: controlOutputs,
    watch: outputsWatch,
  } = useForm<Outputs>({
    defaultValues: {
      outputs: Array.from({ length: 1 }).map(() => ({
        name: "",
      })),
    },
  }); // for output names

  const o = outputsWatch("outputs");

  const {
    fields: outputFields,
    append: appendOutput,
    remove: removeOutput,
  } = useFieldArray({
    control: controlOutputs,
    name: "outputs",
  });

  return (
    <>
      <form className={app2Styles["app-2"]} onSubmit={handleSubmit(() => {})}>
        <label>
          Number of hospitals:
          <input
            type="number"
            {...register("hospitalsCount", {
              required: "This field is required",
              min: {
                value: 1,
                message: "The minimum value is 1",
              },
            })}
          />
        </label>
        {inputFields.map((inputField, index) => (
          <main key={inputField.id}>
            <label>
              Input name:
              <input
                type="text"
                {...registerInput(`inputs.${index}.name` as const, {
                  required: "This field is required",
                })}
              />
            </label>
            {index === 0 && inputFields.length === 1 ? null : (
              <button
                type="button"
                className={app2Styles.remove}
                onClick={() => removeInput(index)}
              >
                Remove input
              </button>
            )}
          </main>
        ))}
        <button
          type="button"
          onClick={() => appendInput({ name: "" })}
          className={app2Styles.add}
        >
          Add input
        </button>
        {outputFields.map((outputField, index) => (
          <main key={outputField.id}>
            <label>
              Output name:
              <input
                type="text"
                {...registerOutput(`outputs.${index}.name` as const, {
                  required: "This field is required",
                })}
              />
            </label>
            {index === 0 && outputFields.length === 1 ? null : (
              <button
                type="button"
                className={app2Styles.remove}
                onClick={() => removeOutput(index)}
              >
                Remove output
              </button>
            )}
          </main>
        ))}
        <button
          type="button"
          onClick={() => appendOutput({ name: "" })}
          className={app2Styles.add}
        >
          Add output
        </button>
        <button type="submit">Generate Second Form</button>
      </form>
      {formState.isSubmitted && (
        <InputsOutputsForm
          hospitalsCount={hospitalsCount}
          inputs={i}
          outputs={o}
        />
      )}
    </>
  );
}

interface GeneralInfo {
  hospitalsCount: number;
}

interface Inputs {
  inputs: {
    name: string;
  }[];
}

interface Outputs {
  outputs: {
    name: string;
  }[];
}

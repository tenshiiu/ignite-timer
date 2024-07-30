import { useForm } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "./styles"
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function NewCycleForm() {

  // Validação do formulário do ciclo
  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "informe a tarefa"),
    minutesAmount: zod
    .number()
    .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
    .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
  })

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> 



  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

    return (
        <FormContainer >
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput 
        id="task" 
        list="task-suggestions" 
        type="text" 
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
        />

        <datalist id="task-suggestions">
          <option value="Projeto 1"/>
          <option value="Projeto 2"/>
          <option value="Projeto 3"/>
          <option value="Banana"/>

        </datalist>

        <label htmlFor="">durante</label>
        <MinutesAmountInput 
        type="number" 
        id="minutesAmount" 
        placeholder="00" 
        step={5} 
        min={5} 
        max={60}
        disabled={!!activeCycle}
         {...register('minutesAmount', {valueAsNumber: true})}
        />

        <span>minutos.</span>
      </FormContainer >
      
    )
}
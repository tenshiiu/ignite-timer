import { ActionTypes } from "./actions";

interface CyclesState {
    cycles: Cycle [];
    activeCycleId: string | null;
}

export interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
  }

export function cyclesReducer(state: CyclesState, action: any){
    switch(action.type) {
      case ActionTypes.ADD_NEW_CYCLE:
        return {
          ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
        }

          // return produce(state, draft => {
          //   draft.cycles.push(action.payload.newCycle);
          //   draft.activeCycleId = action.payload.newCycle.Id;
          // })

      case ActionTypes.INTERRUPT_CURRENT_CYCLE:
        return {
          ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id == state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
        }

      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
        return {
          ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id == state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        })
        }

      default:
        return state
    }
  }
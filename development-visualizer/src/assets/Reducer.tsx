import { IEntry, IReducerAction } from "./Interfaces";

export function reducerHelper(state: IEntry, action: IReducerAction){
    switch(action.type){
        case "HANDLE TEXT INPUT":

            return{
                ...state,
                [action.field]: action.value
            }
        case "HANDLE ARRAY INPUT":
            if(action.location === undefined) throw new Error("Developers array: Action.location is undefined")
            
            let updateDev = state.Developers.slice()
        
            updateDev[action.location] = action.value

            return{
                ...state,
                Developers: updateDev
            }

        case "HANDLE RADIO INPUT":
            if(action.location === undefined) throw new Error("Radio Buttons: Action.location is undefined")

            if(action.location === 0){
                var method = "Agile"
            } else{
                var method = "Waterfall"
            }

            return{
                ...state,
                methodology: method
            }
        default:
            return state
    }

}

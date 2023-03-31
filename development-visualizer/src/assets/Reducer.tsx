import { IEntry, IReducerAction } from "./Interfaces";

// This custom function helps update properties of the useReducer productState in ProductForm.tsx.
export function reducerHelper(state: IEntry, action: IReducerAction){
    
    switch(action.type){

        case "HANDLE TEXT INPUT":

            // Returning a new IEntry object by deconstructing the old productState while also updating the passed property.
            return{
                ...state,
                [action.field]: action.value
            }

        case "HANDLE ARRAY INPUT":

            if(action.location === undefined) throw new Error("Developers array: Action.location is undefined")
            
            // Creating a copy of the productState.Developers array.
            let updateDev = state.Developers.slice()
            
            // Updating the array at index action.location.
            updateDev[action.location] = action.value

            // Returning a new IEntry object by deconstructing the old productState while also updating the Developers array.
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

            // Returning a new IEntry object by deconstructing the old productState while also updating the methodology.
            return{
                ...state,
                methodology: method
            }

        default:

            // Otherwise, just return the current state.
            return state
    }

}

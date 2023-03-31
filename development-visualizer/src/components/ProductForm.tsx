import { SetStateAction, Dispatch, useState, useEffect, useReducer } from "react"
import { IEntry, IFormInfo} from "../assets/Interfaces"

// Importing a custom reducer function for useReducer.
import { reducerHelper } from "../assets/Reducer"

// Styling
import '../styling/ProductFormStyles.css'


function ProductForm({formSettingInfo, formData, productInfo, updateEntries}: {formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, formData: IFormInfo, productInfo: IEntry | undefined, updateEntries: IEntry[]}){
    
    // State for tracking if we are modifying a product or creating a new one.
    const [editingMode, setEditMode] = useState<boolean>(false)
    

    // Setting the initial IEntry Object depending on if a new product is being added
    // or modifying an existing one.
    const initialProduct: IEntry = {
        productId: productInfo === undefined ? 2222 : productInfo.productId,
        productName: productInfo === undefined ? "" : productInfo.productName,
        productOwnerName: productInfo === undefined ? "" : productInfo.productOwnerName,
        Developers: productInfo === undefined ? ["","","","",""] : productInfo.Developers,
        scrumMasterName: productInfo === undefined ? "" : productInfo.scrumMasterName,
        startDate: productInfo === undefined ? "" : productInfo.startDate,
        methodology: productInfo === undefined ? "" : productInfo.methodology
    }

    // useReducer for tracking and updating the initialProduct properties.
    // this allows for different properties to be changed without affecting others.
    const [productState, productDispatch] = useReducer(reducerHelper, initialProduct)

    // This useEffect only runs one time and that is each time the Form becomes visible
    useEffect(() =>{

        // Determining if an existing product is being modified or creation of a new one.
        setEditMode(formData.editOrAdd === "edit")

    }, [])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        // Constructing the finalized product.
        const sendProduct: IEntry = {
            productId: productState.productId,
            productName: productState.productName,
            productOwnerName: productState.productOwnerName,
            Developers: productState.Developers.filter(item => item), // This filter statement prevents empty strings in the Developer array.
            scrumMasterName: productState.scrumMasterName,
            startDate: productState.startDate.replace(/-/g, "/"), // Input type date format is YYYY-MM-DD and this just changes it to YYYY/MM/DD.
            methodology: productState.methodology
        }

        // Setting the fetch location and method type to send the Product to the backend.
        if(editingMode){

            var fetchLocation = `http://localhost:3000/api/products/update/${sendProduct.productId}`
            var methodOption = "PUT"

            // Finding the modifying product's index location in the entries array from App.tsx.
            let pIndex = updateEntries.findIndex((id) => id.productId === productState.productId)
            
            // Updating the entries array from the App.tsx, thus causing the table to update and display the modified product.
            updateEntries[pIndex] = sendProduct

        } else {

            var fetchLocation = "http://localhost:3000/api/products/add"
            var methodOption = "POST"

            // Updating the entries array from the App.tsx, thus causing the table to update and display the new product.
            updateEntries.push(sendProduct)
        }
        
        // Sending the product to the backend.
        await fetch(fetchLocation, {

            method: methodOption,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sendProduct)

        }).catch(error =>{
            
            window.alert(error)
            
            return

        })

        // Hide the form now that the Save button was pressed.
        formSettingInfo({visible: false, editOrAdd: "add"})
    }

    // This function determine which property of productState are to be changed. 
    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>, actionType: string, indexLocation?: number) =>{
        productDispatch({
            type: actionType, // Determines which type of change to be made in the custom reducer function.
            field: e.currentTarget.name, // Name of the property to change.
            value: e.currentTarget.value, // New value for property.
            location: indexLocation // This is optional, and only used for the Developers array and Methodology. This determines which developer name to change or which Radio button was selected.
        })
    }


    return(
        <div className='formBackground'>

            {/* Conditional styling depending on which form is visible */}
            <form className={editingMode ? 'editForm' : 'addForm'} onSubmit={onSubmit}>
                <label><h2>{editingMode ? "Product Edit": "Add New Product"}</h2></label>
                <label> All boxes must be filled before submission (except for Developers)</label>
                <br />

                {/*Product Name Input*/}
                <label>
                    Enter Product Name: 
                    <input type="text" name="productName" defaultValue={initialProduct.productName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required ></input>
                </label>
                <br />

                {/*Owner Name Input*/}
                <label>
                    Enter Owner Name: 
                    <input type="text" name="productOwnerName" defaultValue={initialProduct.productOwnerName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required></input>
                </label>
                <br />

                {/*Developers Array Input*/}
                <label>
                    Enter Developers (Minimum 1 developer name):
                    <div className='developerNames'>
                        <input key="D0" type="text" name="Developers" defaultValue={initialProduct.Developers[0]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 0)} required />
                        <input key="D1" type="text" name="Developers" defaultValue={initialProduct.Developers[1]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 1)}  />
                        <input key="D2" type="text" name="Developers" defaultValue={initialProduct.Developers[2]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 2)}  />
                        <input key="D3" type="text" name="Developers" defaultValue={initialProduct.Developers[3]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 3)}  />
                        <input key="D4" type="text" name="Developers" defaultValue={initialProduct.Developers[4]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 4)}  />
                    </div>
                </label>

                {/*Scrum Master Input*/}
                <label>
                    Enter Scrum Master Name:
                    <input type="text" name="scrumMasterName" defaultValue={initialProduct.scrumMasterName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required></input>
                </label>
                <br />

                {/*Start Date Input, Only Visible when creating a product not modifying*/}
                {!editingMode && <label>
                    Enter Start Date:
                    <input type="date" min="1930-12-31" name="startDate" onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required />
                </label>}
                {!editingMode && <br />}
                
                {/*Methodology Input*/}
                <label>
                    Enter Methodology:
                    <label>
                        <input type="radio" defaultChecked={initialProduct.methodology === "Agile"} name="method" onChange={(e)=> handleInputChanges(e, "HANDLE RADIO INPUT", 0)} required/>
                        Agile
                    </label>
                    <label>
                        <input type="radio" defaultChecked={initialProduct.methodology === "Waterfall"} name="method" onChange={(e)=> handleInputChanges(e, "HANDLE RADIO INPUT", 1)} />
                        Waterfall
                    </label>
                </label>
                <br />

                {/*Call To Action Buttons*/}
                <div className='btnDiv'>
                    <input className='saveBTN goodBTN' type="submit" value={"Save"}/>
                    <button onClick={()=> formSettingInfo({visible: false, editOrAdd: "add"})}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
import { SetStateAction, Dispatch, useState, useEffect, useReducer } from "react"
import { IEntry, IFormInfo} from "../assets/Interfaces"
import { reducerHelper } from "../assets/Reducer"

import '../styling/ProductFormStyles.css'



function ProductForm({formSettingInfo, formData, productInfo, updateEntries}: {formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, formData: IFormInfo, productInfo: IEntry | undefined, updateEntries: IEntry[]}){
    
    // State for tracking if we are modifying a product or creating a new one
    const [editingMode, setEditMode] = useState<boolean>(false)
    

    // Setting the initial IEntry Object depending on if they are adding a new product
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

    const [productState, productDispatch] = useReducer(reducerHelper, initialProduct)

    useEffect(() =>{

        // Determining which button the user clicked on.
        setEditMode(formData.editOrAdd === "edit")

    }, [])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        const sendProduct: IEntry = {
            productId: productState.productId,
            productName: productState.productName,
            productOwnerName: productState.productOwnerName,
            Developers: productState.Developers.filter(item => item),
            scrumMasterName: productState.scrumMasterName,
            startDate: productState.startDate.replace(/-/g, "/"),
            methodology: productState.methodology
        }

        if(editingMode){
            var fetchLocation = `http://localhost:3000/api/products/update/${sendProduct.productId}`
            var methodOption = "PUT"
            let pIndex = updateEntries.findIndex((id) => id.productId === productState.productId)
            updateEntries[pIndex] = sendProduct

        } else {
            var fetchLocation = "http://localhost:3000/api/products/add"
            var methodOption = "POST"
            updateEntries.push(sendProduct)
        }
        
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

        formSettingInfo({visible: false, editOrAdd: "add"})
    }

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>, actionType: string, indexLocation?: number) =>{
        productDispatch({
            type: actionType,
            field: e.currentTarget.name,
            value: e.currentTarget.value,
            location: indexLocation
        })
    }


    return(
        <div className='formBackground'>
            <form className={editingMode ? 'editForm' : 'addForm'} onSubmit={onSubmit}>
                <label><h2>{editingMode ? "Product Edit": "Add New Product"}</h2></label>
                <label> All boxes must be filled before submission (except for Developers)</label>
                <br />
                <label>
                    Enter Product Name: 
                    <input type="text" name="productName" defaultValue={initialProduct.productName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required ></input>
                </label>
                <br />
                <label>
                    Enter Owner Name: 
                    <input type="text" name="productOwnerName" defaultValue={initialProduct.productOwnerName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required></input>
                </label>
                <br />
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
                <label>
                    Enter Scrum Master Name:
                    <input type="text" name="scrumMasterName" defaultValue={initialProduct.scrumMasterName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required></input>
                </label>
                <br />
                {!editingMode && <label>
                    Enter Start Date:
                    <input type="date" min="1930-12-31" name="startDate" onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required />
                </label>}
                {!editingMode && <br />}
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
                <div className='btnDiv'>
                    <input className='saveBTN goodBTN' type="submit" value={"Save"}/>
                    <button onClick={()=> formSettingInfo({visible: false, editOrAdd: "add"})}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
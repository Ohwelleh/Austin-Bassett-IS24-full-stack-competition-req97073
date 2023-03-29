import { SetStateAction, Dispatch, useState, useEffect, useReducer } from "react"
import { IEntry, IFormInfo} from "../assets/Interfaces"
import { reducerHelper } from "../assets/Reducer"



function ProductForm({formSettingInfo, formData, productInfo}: {formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, formData: IFormInfo, productInfo: IEntry | undefined}){
    
    const [startProdDate, setProdStart] = useState<Date>(new Date())
    
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

        const sendProduct: IEntry = {...productState}

        if(editingMode){
            var fetchLocation = `http://localhost:3000/api/products/update/${sendProduct.productId}`
            var methodOption = "PUT"
        } else {
            var fetchLocation = "http://localhost:3000/api/products/add"
            var methodOption = "POST"
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
        <form onSubmit={onSubmit}>
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
                <ol>
                    <li><input key="D0" type="text" name="Developers" defaultValue={initialProduct.Developers[0]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 0)} required /> </li>
                    <li><input key="D1" type="text" name="Developers" defaultValue={initialProduct.Developers[1]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 1)}  /> </li>
                    <li><input key="D2" type="text" name="Developers" defaultValue={initialProduct.Developers[2]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 2)}  /> </li>
                    <li><input key="D3" type="text" name="Developers" defaultValue={initialProduct.Developers[3]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 3)}  /> </li>
                    <li><input key="D4" type="text" name="Developers" defaultValue={initialProduct.Developers[4]} onChange={(e)=> handleInputChanges(e, "HANDLE ARRAY INPUT", 4)}  /> </li>
                </ol>
            </label>
            <label>
                Enter Scrum Master Name:
                <input type="text" name="scrumMasterName" defaultValue={initialProduct.scrumMasterName} onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required></input>
            </label>
            <br />
            {!editingMode && <label>
                Enter Start Date:
                <input type="date" name="startDate" onChange={(e)=> handleInputChanges(e, "HANDLE TEXT INPUT")} required />
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
            <input type="submit" />
            <button onClick={()=> formSettingInfo({visible: false, editOrAdd: "add"})}>Cancel</button>
        </form>
    )
}

export default ProductForm
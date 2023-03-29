import { SetStateAction, Dispatch, useState, useEffect } from "react"
import { IEntry, IFormInfo} from "../assets/Interfaces"

function ProductForm({formSettingInfo, formData, productInfo}: {formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, formData: IFormInfo, productInfo: IEntry | undefined}){
    
    const [startProdDate, setProdStart] = useState<Date>(new Date())
    
    const [editingMode, setEditMode] = useState<boolean>(false)

    const developerNames: string[] = ["", "", "", "", ""]
    const [changedProduct, setChangeProduct] = useState<IEntry>({
            productId: productInfo === undefined ? 0 : productInfo.productId,
            productName: "",
            productOwnerName: "",
            Developers: [],
            scrumMasterName: "",
            startDate: productInfo === undefined ? "" : productInfo.startDate,
            methodology: productInfo === undefined ? "" : productInfo.methodology
    })

    useEffect(() =>{
    
        if(productInfo !== undefined){
            setChangeProduct(productInfo)
        }
    
        setEditMode(formData.editOrAdd === "edit")



    }, [])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        // const Product: IEntry = {
        //     productId: number,
        //     productName: string,
        //     productOwnerName: string,
        //     Developers: string[],
        //     scrumMasterName: string,
        //     startDate: string,
        //     methodology: string
        // }
    }



    return(
        <form onSubmit={onSubmit}>
            <label> All boxes must be filled before submission (except for Developers)</label>
            <br />
            <label>
                Enter Product Name: 
                <input type="text" defaultValue={changedProduct.productName} required ></input>
            </label>
            <br />
            <label>
                Enter Owner Name: 
                <input type="text" defaultValue={changedProduct.productOwnerName} required></input>
            </label>
            <br />
            <label>
                Enter Developers (Minimum 1 developer name):
                <ol>
                    <li><input type="text" defaultValue={changedProduct.Developers[0]} required/> </li>
                    <li><input type="text" defaultValue={changedProduct.Developers[1]}/> </li>
                    <li><input type="text" defaultValue={changedProduct.Developers[2]}/> </li>
                    <li><input type="text" defaultValue={changedProduct.Developers[3]}/> </li>
                    <li><input type="text" defaultValue={changedProduct.Developers[4]}/> </li>
                </ol>
            </label>
            <label>
                Enter Scrum Master Name:
                <input type="text" defaultValue={changedProduct.scrumMasterName} required></input>
            </label>
            <br />
            {!editingMode && <label>
                Enter Start Date:
                <input type="date" required />
            </label>}
            {!editingMode && <br />}
            <label>
                Enter Methodology:
                <label>
                    <input type="radio" defaultChecked={changedProduct.methodology === "Agile"} name="method" required/>
                    Agile
                </label>
                <label>
                    <input type="radio" defaultChecked={changedProduct.methodology === "Waterfall"} name="method"/>
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
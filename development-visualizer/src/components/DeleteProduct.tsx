import { IEntry } from "../assets/Interfaces"


function DeleteProduct({selectedProduct}: {selectedProduct: IEntry}){

    async function deleteProduct(product: IEntry){
        await fetch(`http://localhost:3000/api/products/delete/${product.productId}`, {
            method: "DELETE"
        })
    }

    return(
        <button onClick={() => deleteProduct(selectedProduct)}>Del</button>
    )
}

export default DeleteProduct
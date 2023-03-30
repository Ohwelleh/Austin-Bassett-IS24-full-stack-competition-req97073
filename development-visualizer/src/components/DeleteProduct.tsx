import { IEntry } from "../assets/Interfaces"


function DeleteProduct({selectedProduct}: {selectedProduct: IEntry}){

    async function deleteProduct(product: IEntry){

        await fetch(`http://localhost:3000/api/products/delete/${product.productId}`, {
            method: "DELETE"
        })
        window.location.reload()
    }

    return(
        <button className='deleteBTN badBTN' onClick={() => deleteProduct(selectedProduct)}>D</button>
    )
}

export default DeleteProduct
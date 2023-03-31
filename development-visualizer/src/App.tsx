import { useEffect, useState } from 'react'
import { IEntry, IFormInfo } from './assets/Interfaces'


// Styling.
import './styling/App.css'

// Components.
import TableView from './components/TableView'
import TASBar from './components/TASBar'
import ProductForm from './components/ProductForm'

// String array for table column headers.
const TableHeaders = ["Product Name", "Owner", "Developers", "Scrum Master", "Start Date", "Methodology"]

// Initial state to set the form useState.
const initialForm: IFormInfo ={
  visible: false,
  editOrAdd: "edit"
}


function App() {

  // useStates.
  const [entries, setEntries] = useState<IEntry[] | []>([]) // Tracking the entire list of Products.
  const [search, setSearches] = useState<IEntry[]>([]) // Tracking the results when a user searches for a Scrum Master or Developer.
  const [formInfo, setFormInfo] = useState<IFormInfo>(initialForm) // Tracking whether the Add/Edit Form should be visible.
  const [changeProductData, setNewProductData] = useState<IEntry | undefined>(undefined) // Tracking the modified/newly created product.

  // This useEffect fetches all the products from the endpoint, and sets the search and entries states to
  // the fetched data. This occurs whenever the page is reloaded or the length of entires is changed. 
  useEffect(() =>{
    async function getProducts(){
      try{
        const response = await fetch('http://localhost:3000/api/products')
        
        if(!response.ok){
        
          const message = `An error occured ${response.statusText}`
          window.alert(message)
        
          return
        
        }

        const productJSON = await response.json()
        setEntries(productJSON)
        setSearches(productJSON)

      }catch(err){
        console.error("[Fetch Error:", err)
      }
    }

      getProducts()
      return

  }, [entries.length])


  return (
    <div>
      {/* Conditionally loading the ProductForm */}
      {formInfo.visible && <ProductForm formSettingInfo={setFormInfo} formData={formInfo} productInfo={changeProductData} updateEntries={entries}/>}
      <section className='landing-title'>
        <h1>IMB Development/Maintainance Visualizer</h1>
        {/* <button onClick={() => randomizData()} >Randomized Dataset</button> */}
      </section>
      <section>
        <TASBar searchResults={search} completeData={entries} formSettingInfo={setFormInfo} productSetInfo={setNewProductData} searchArray={setSearches}/>
        <TableView tableHeader={TableHeaders} tableData={search} formSettingInfo={setFormInfo} productSetInfo={setNewProductData} />
      </section>
    </div>
  )
}

export default App

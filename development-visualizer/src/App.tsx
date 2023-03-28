import { useEffect, useState } from 'react'
import { IEntry, IFormInfo } from './assets/Interfaces'


// Styling
import './styling/App.css'
import Data from './assets/MockData.json'

// Components
import TableView from './components/TableView'
import SearchBar from './components/SearchBar'
import TotalAdd from './components/TotalAdd'
import ProductForm from './components/ProductForm'

// String array for table column headers.
const TableHeaders = ["Product Name", "Owner", "Developers", "Scrum Master", "Start Date", "Methodology"]

const initialForm: IFormInfo ={
  visible: false,
  editOrAdd: "edit"
}

function App() {

  const [entries, setEntries] = useState<IEntry[] | []>([])
  const [search, setSearches] = useState<IEntry[]>([])
  const [formInfo, setFormInfo] = useState<IFormInfo>(initialForm)
  const [changeProductData, setNewProductData] = useState<IEntry | undefined>(undefined)

  useEffect(() =>{
    async function getProducts(){
      const response = await fetch('http://localhost:3000/api/products')
      if(!response.ok){
        const message = `An error occured ${response.statusText}`
        window.alert(message)
        return
      }

      const productJSON = await response.json()
      setEntries(productJSON)
      setSearches(productJSON)

    }

      getProducts()
      return

  }, [entries.length])

  return (
    <div>
      {formInfo.visible && <ProductForm formSettingInfo={setFormInfo} formData={formInfo} productInfo={changeProductData}/>}
      {!formInfo.visible && <section className='landing-title'>
        <h1>IMB Development/Maintainance Visualizer</h1>
      </section>}
     {!formInfo.visible && <SearchBar searchArray={setSearches} completeData={entries} />}
      {!formInfo.visible && <section>
        <TotalAdd searchResults={search} completeData={entries} formSettingInfo={setFormInfo} productSetInfo={setNewProductData}/>
        <TableView tableHeader={TableHeaders} tableData={search} formSettingInfo={setFormInfo} productSetInfo={setNewProductData}/>
      </section>}
    </div>
  )
}

export default App

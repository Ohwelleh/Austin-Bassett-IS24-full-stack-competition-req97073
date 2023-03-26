import '../styling/TotalAddStyles.css'


function TotalAdd({searchResults, completeData}: {searchResults: any, completeData: any}){
    var totalAmount = searchResults === undefined ? completeData.length : searchResults.length
    
    return(
        <section className='total-add'>
            <div className='total'>
                <h3>Total: {totalAmount}</h3>
            </div>
            <div className='add-div'>
                <button>Add</button>
            </div>
        </section>
    )
}

export default TotalAdd
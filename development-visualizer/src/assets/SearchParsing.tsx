import { IEntry } from "./Interfaces";

// This function checks each name in the Developers array with the Regular expression.
function checkArray(arrayValues: string[], rex: RegExp){
    let value = false
    for(const name of arrayValues){
        if(rex.test(name)){
            value = true
            break
        }
    }

    return value
}

// This custom function searches for the passed name and returns a IEntry[].
// The returned IEntry[] contains products where the searchName was in the scrumMasterName property OR Deverlopers array (Can be both as data was randomized).
// If the searchName as results in either scrumMasterName or Developers array I check the productOwner as well
// Because sometimes searchName is a scrumMaster on one product while being an owner on another.
export function findName(searchName: string, rawData: IEntry[]){
    
    if(searchName === "") return rawData

    // Regular expression for finding the passed name, i = case-insensitive; g=global
    var re = new RegExp(searchName, "gi")

    // Creating IEntry of all the products where Scrum Master Name was a match with searchName.
    let searchScrumNameResults: IEntry[] = rawData
    .filter((entrySearchName) => re.test(entrySearchName.scrumMasterName))
    .map(({productId, productName, productOwnerName, Developers, scrumMasterName, startDate, methodology}) => ({
        productId: productId,
        productName: productName,
        productOwnerName: productOwnerName,
        Developers: Developers,
        scrumMasterName: scrumMasterName,
        startDate: startDate,
        methodology: methodology
    }))

    // Creating IEntry of all the products where searchName was in the Developers array.
    let searchDevelopersNameResult: IEntry[] = rawData
    .filter((entrySearchName) => checkArray(entrySearchName.Developers, re))
    .map(({productId, productName, productOwnerName, Developers, scrumMasterName, startDate, methodology}) => ({
        productId: productId,
        productName: productName,
        productOwnerName: productOwnerName,
        Developers: Developers,
        scrumMasterName: scrumMasterName,
        startDate: startDate,
        methodology: methodology
    }))

    // Creating IEntry of all the products where Product Owner Name was a match with searchName.
    let searchOwnerNameResult: IEntry[] = rawData
    .filter((entrySearchName) => re.test(entrySearchName.productOwnerName))
    .map(({productId, productName, productOwnerName, Developers, scrumMasterName, startDate, methodology}) => ({
        productId: productId,
        productName: productName,
        productOwnerName: productOwnerName,
        Developers: Developers,
        scrumMasterName: scrumMasterName,
        startDate: startDate,
        methodology: methodology
    }))

    // Return a empty array if both Scrum Master and Developer didn't find any products with matching names.
    if(searchDevelopersNameResult.length === 0 && searchScrumNameResults.length === 0) return []
    
    // Return a new IEntry[] by deconstructing all three results.
    return [...searchScrumNameResults, ...searchDevelopersNameResult, ...searchOwnerNameResult]
}
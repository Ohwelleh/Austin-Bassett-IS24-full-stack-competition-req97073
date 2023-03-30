import { IEntry } from "./Interfaces";

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

export function findName(searchName: string, rawData: IEntry[]){
    if(searchName === "") return rawData

    var re = new RegExp(searchName, "gi")

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

    if(searchDevelopersNameResult.length === 0 && searchScrumNameResults.length === 0) return []
    

    return [...searchScrumNameResults, ...searchDevelopersNameResult, ...searchOwnerNameResult]
}
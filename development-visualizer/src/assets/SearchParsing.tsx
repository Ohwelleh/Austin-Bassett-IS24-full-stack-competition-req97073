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

    let scrumMasterResults: IEntry[] = rawData
    .filter((entryScrumName) => re.test(entryScrumName.scrumMasterName) || checkArray(entryScrumName.Developers, re))
    .map(({productId, productName, productOwnerName, Developers, scrumMasterName, startDate, methodology}) => ({
        productId: productId,
        productName: productName,
        productOwnerName: productOwnerName,
        Developers: Developers,
        scrumMasterName: scrumMasterName,
        startDate: startDate,
        methodology: methodology
    }))

    return scrumMasterResults
}
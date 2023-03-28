export interface IEntry{
    productId: number,
    productName: string,
    productOwnerName: string,
    Developers: string[],
    scrumMasterName: string,
    startDate: string,
    methodology: string
}

export interface IFormInfo{
    visible: boolean,
    editOrAdd: string
}

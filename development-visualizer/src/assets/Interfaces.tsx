
// Each product is represented as a IEntry type.
export interface IEntry{
    productId: number,
    productName: string,
    productOwnerName: string,
    Developers: string[],
    scrumMasterName: string,
    startDate: string,
    methodology: string
}

// Giving key Form information a Type.
export interface IFormInfo{
    visible: boolean,
    editOrAdd: string
}

// Giving key information being passed to the custom reducer function a Type.
export interface IReducerAction{
    type: string,
    field: string,
    value: string,
    location?: number
}

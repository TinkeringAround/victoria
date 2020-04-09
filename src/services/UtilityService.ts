export const getRootUrlFromAssetImport = (importedAsset: string, spreadOperator = "/") => {
    const pathParts = importedAsset.split(spreadOperator);
    pathParts.pop();
    return pathParts.join("/") + "/";
};

export const getFileNameFromAssetImport = (importedAsset: string, spreadOperator = "/") => importedAsset.split(spreadOperator).pop();

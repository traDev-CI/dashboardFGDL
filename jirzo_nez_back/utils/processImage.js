const getFileName = (file) => {
    const filePath = file.path;
    const fileSplit = filePath.split(`\\`);
    const fileName = fileSplit[2];
    const extSplit = fileName.split(".");
    const fileExt = extSplit[1];

    if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") return "The image extention is not valid (Allowed extensions: png, jpg and jpeg)"
    
    return fileName;
}

module.exports = {
    getFileName
}
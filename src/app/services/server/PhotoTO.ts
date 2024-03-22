export class PhotoTO {

    fileName: string|undefined;
    fileValue: string|undefined

    constructor(fileName: string|undefined, fileValue: string|undefined) {
        this.fileName = fileName;
        this.fileValue = fileValue;
     }
}
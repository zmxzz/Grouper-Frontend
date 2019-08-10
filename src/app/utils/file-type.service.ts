import { Injectable } from '@angular/core';

@Injectable()
export class FileTypeService {
    private uploadFiles: object[] = [];
    private uploadFileUrls: string[] = [];
    private acceptImage: string[] = ['.jpg', '.png', '.jpeg'];        // If moment contains image, no video is allowed
    private acceptNothing: string[] = ['.invalidFile'];                            // If moment contains nine images or one video, nothing more can be uploaded
    private fileType: string = null;                                 // File type denotes the file type is getting uploaded, [null, 'image', 'video']                                        


    // Helper function to decide accept file type
    getAcceptTypes(): string[] {
        return this.uploadFiles.length === 1 ? this.acceptNothing : this.acceptImage;
    }

    // Return the file type uploaded
    getFileType() {
        return this.fileType;
    }

    // Add file into uploadedFiles
    uploadFile(uploadedFile: object): void {
        this.readFile(uploadedFile);
        this.uploadFiles.push(uploadedFile);
    }

    // Read File as data url
    readFile(file) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
            this.uploadFileUrls.push(event.target.result);
        }
        reader.readAsDataURL(file);
    }

    // Return file that has been uploaded
    getUploadedFiles() {
        return this.uploadFiles;
    }

    // Get uploaded file urls
    getUploadedFileUrls(): string[] {
        return this.uploadFileUrls;
    }

    // Destroy
    destroy(): void {
        this.uploadFiles = [];
        this.uploadFileUrls = [];
        this.fileType = null;
    }

}
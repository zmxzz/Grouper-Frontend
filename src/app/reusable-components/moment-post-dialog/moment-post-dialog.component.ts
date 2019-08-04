import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileTypeService } from '../../utils/file-type.service';
import { FileService } from '../../../service/file.service';
import { ObjectBuilderService } from '../../../service/object-builder.service';
import { MomentService } from '../../../service/moment.service';

@Component({
    selector: 'app-moment-post-dialog',
    templateUrl: './moment-post-dialog.component.html',
    styleUrls: ['moment-post-dialog.component.css', '../../app.component.css']
})
export class MomentPostDialogComponent {
    // dialogRef: Floating Dialog Component
    // activityService: Service helps communicate with backend
    // fileTypeService: Service helps detect file types
    constructor(
        public dialogRef: MatDialogRef<MomentPostDialogComponent>, 
        private fileService: FileService,
        private momentService: MomentService,
        private fileTypeService: FileTypeService,
        private objectBuilderService: ObjectBuilderService
    ) {}

    currFile = '';
    momentContent: string = '';

    onCancelClick(): void {
        this.fileTypeService.destroy();
        this.dialogRef.close();
    }

    saveUploadFile(event) {
        if (event.target.files.length > 0) {
            this.fileTypeService.uploadFile(event.target.files[0]);
        } 
    }

    async uploadFile() {
        this.dialogRef.close();
        let files = this.fileTypeService.getUploadedFiles();
        let fileUrls: string[] = [];
        // Upload all the files into file server and get its url
        for (let i: number = 0; i < files.length; i++) {
            try {
                let currUrl: string = await this.fileService.uploadFile(files[i]);
                fileUrls.push(currUrl);
            } catch (error) {
                console.log('Fail to upload file ' + error);
            }
        }
        // Initialize moment info
        let momentInfo = this.objectBuilderService.buildMoment(this.fileTypeService.getFileType(), this.momentContent, fileUrls);
        try {
            await this.momentService.postMoment(momentInfo);
        } catch (error) {
            alert('Fail to post moment');
            console.log('Fail to post moment: ' + error);
        }
        this.fileTypeService.destroy();
    }

}
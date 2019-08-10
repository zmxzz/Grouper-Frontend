import { Component, Input, OnInit, Inject, APP_INITIALIZER } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommentService } from 'src/service/comment.service';

@Component({
    selector: 'app-comment-post-dialog',
    templateUrl: './comment-post-dialog.component.html',
    styleUrls: ['./comment-post-dialog.component.css']
})
export class CommentPostDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CommentPostDialogComponent>,
        private commentService: CommentService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    momentInfo: object;
    comment: string = '';

    async postComment() {
        if (this.comment === '') {
            return;
        }
        try {
            let commentId = await this.commentService.postComment(this.momentInfo['_id'], this.comment);
            this.momentInfo['comments'].push(commentId);
        } catch (error) {
        }
    }

    ngOnInit() {
        this.momentInfo = this.data.momentInfo;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

}
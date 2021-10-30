import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { EmbarquesRoutingModule } from './embarques-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { UploadComponent } from '../upload/upload.component';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EmbarquesRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent,
        UploadComponent
    ]
})
export class EmbarquesModule { }
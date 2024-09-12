import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { FileItem, FileType } from '../../models/file.item.model';

@Component({
  selector: 'app-owner-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './owner-form.component.html',
  styleUrl: './owner-form.component.css',
})
export class OwnerFormComponent {
  @Output() fileCreated = new EventEmitter<FileItem>();

  fileForm: FormGroup;
  
  FileType=FileType;

  constructor(private fb: FormBuilder) {
    this.fileForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      creattion: ['', Validators.required],
      type: [FileType.FILE, Validators.required],
    });
  }

  onSubmit() {
    if(this.fileForm.valid){
      const newFile: FileItem={
        id: Math.random().toString(36).substring(2,15),
        name: this.fileForm.value.name,
        creation: new Date(this.fileForm.value.creation),
        owners:[],
        type:this.fileForm.value.type
      }
      this.fileCreated.emit(newFile)
    }
  }
}

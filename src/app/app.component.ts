import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FileItem, FileType } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  selected: FileItem[] = []


  ngOnInit(){
    this.sorting()
    console.log(this.files);

  }
  
  sorting(){
    const folders = this.files.filter(item=> item.type===FileType.FOLDER)
    const file = this.files.filter(item=> item.type===FileType.FILE)

    folders.sort((a,b)=>a.name.localeCompare(b.name))
    file.sort((a,b)=> a.name.localeCompare(b.name))

    this.files = [...folders,...file]
  }

  logCheck(item:  FileItem) {
    console.log('checked');

    //i need a way to remove it when it click again 

    if (!this.selected.includes(item)) {
      this.selected.push(item)
    }
    
    console.log(this.selected);
    
  }
  title = 'file-management';
}

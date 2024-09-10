import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FileItem, FileType } from '../models/file.item.model';
import { FILE_LIST } from '../data/file.storage';
import { DatePipe } from '@angular/common';
import { retry } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  selected: FileItem[] = [];
  selectedAction: string = '';

  ngOnInit() {
    this.sorting();
    console.log(this.files);
  }

  sorting() {
    const folders = this.files.filter((item) => item.type === FileType.FOLDER);
    const file = this.files.filter((item) => item.type === FileType.FILE);

    folders.sort((a, b) => a.name.localeCompare(b.name));
    file.sort((a, b) => a.name.localeCompare(b.name));

    this.files = [...folders, ...file];
  }

  logCheck(item: number) {
    if (!this.selected.includes(this.files[item])) {
      this.selected.push(this.files[item]);
      console.log('added: ' + this.files[item]);

      console.log(this.selected);
      return;
    }
    if (this.selected.includes(this.files[item])) {
      this.selected = this.selected.filter(
        (owner) => owner !== this.files[item]
      );
      console.log('removed: ' + this.files[item]);

      console.log(this.selected);
      return;
    }
  }

  dlete() {
    this.selected.forEach((element) => {
      for (let index = 0; index < this.files.length; index++) {
        if (this.files[index] === element) {
          this.files = this.files.filter((a) => a !== this.files[index]);
          console.log('found one');
          console.log(this.files[index]);
        }
      }
    });
    console.log(this.files);
    this.selected = [];
  }

  resetSelect(): void {
    console.log(this.selectedAction);

    if (this.selectedAction === 'delete') {
      this.dlete();
    } else if (this.selectedAction === 'add') {
      //nothing for now
    }
    this.selectedAction = ''; // this isn't resetting the combobox
    console.log(this.selectedAction);
  }
}

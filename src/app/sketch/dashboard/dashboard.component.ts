import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFolderPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  faAdd = faPlusSquare as IconProp;

  todo=['obj1', 'obj2', 'obj3'];
  done=['done1', 'done2', 'done3'];
  inprogress: string[] = [];
  finished: string[] = [];

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
   }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  displayNone(event: Event) {
    (<HTMLElement>event.target).classList.remove('d-block');
  }

  showModal() {
    document.querySelector('.modal')?.classList.add('d-block');
  }

}

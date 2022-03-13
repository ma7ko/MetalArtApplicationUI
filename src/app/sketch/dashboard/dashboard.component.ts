import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Icon, IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEllipsisV, faLock, faLockOpen, faPaperclip, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { LetterFormControl } from 'src/app/model/letter-only/letter-form-control';
import { PositiveNumberFormControl } from 'src/app/model/positive-number-only/positive-number-form-control';
import { AddNewSketchRequest } from 'src/app/service/sketch/request/sketch-request';
import { SketchService } from 'src/app/service/sketch/sketch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  faAdd = faPlusSquare as IconProp;
  faAttach = faPaperclip as IconProp;
  locked = faLock as IconProp;
  unlocked = faLockOpen as IconProp;
  hamburger = faEllipsisV as IconProp;
  dashboardCardGroup: any;
  showModal: boolean = false;

  todo: any =[];
  done: any =[];
  inprogress: any[] = [];
  finished: any[] = [];
  image: File | undefined;

  isSingleClick: boolean = true;

  clickCount: number = 0;

  constructor(private translateService: TranslateService, private sketchService: SketchService) {
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
   }

  ngAfterViewInit(): void {
    document.querySelectorAll('.example-box').forEach(e => {
      e.addEventListener('dblclick', (event) => {
        (<HTMLElement>event.target).style.cursor = "grab";
      });
    });
  }

  ngOnInit(): void {
    this.sketchService.getAllSketches().subscribe((response) => {
      console.log(response);
      response.forEach((el: any) => {
        this.todo.push(el);
      });
    }, (error) => {
      console.log(error);
    });
    this.dashboardCardGroup = new FormGroup({
      title: new LetterFormControl(''),
      description: new LetterFormControl(''),
      width: new PositiveNumberFormControl(''),
      height: new PositiveNumberFormControl(''),
      depth: new PositiveNumberFormControl('')
    });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event.previousContainer);
    console.log(event.container);
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  displayNone(event: Event) {
    (<HTMLElement>document.querySelector('.modal')).classList.remove('d-block');
  }

  displayModal() {
    document.querySelector('.modal')?.classList.add('d-block');
  }

  focusedInput(event: Event, className?: any, className2?: any) {
    (<HTMLElement>event.target).parentElement?.classList.remove(className);
    (<HTMLElement>event.target).parentElement?.classList.add(className2);
  }

  checkEmptyInput(event: Event, className?: any, className2?: any) {
    if ((<HTMLInputElement>event.target).value == "") {
      (<HTMLElement>event.target).parentElement?.classList.remove(className2);
      (<HTMLElement>event.target).parentElement?.classList.add(className);
    }
  }

  onChange(event: Event) {
    let element = <HTMLInputElement>event.target;

    if (element.files != null) {
      this.image = element.files[0];
    }

    var reader = new FileReader();
    reader.onload = function (e) {
      if (document.getElementById('img-holder')?.firstChild == null) {
        var img = document.createElement("img");
        if (e.target?.result?.toString() != undefined)
          img.src = e.target?.result?.toString();
        img.classList.add('w-100');
        img.style.borderRadius = "0px";
        img.style.border = "none";
        img.style.boxShadow = "3px 3px 3px 0px lightgrey";
        img.style.padding = "24px";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        document.getElementById('img-holder')?.appendChild(img);
      } else {
        let imgElement = document.getElementById('img-holder')?.firstChild;
        if (imgElement)
          if (e.target?.result?.toString() != undefined)
            (<HTMLImageElement>imgElement).src = e.target?.result?.toString();
      }
    }

    if (this.image)
      reader.readAsDataURL(this.image);

    this.checkAllFilled();

  }

  onHover(event: Event) {
    (<HTMLElement>event.target).classList.add('hover-class');
  }

  removeHover(event: Event) {
    (<HTMLElement>event.target).classList.remove('hover-class');
  }

  checkAllFilled() {
    let values = Object.keys(this.dashboardCardGroup.controls).map(key => {
      let val = this.dashboardCardGroup.controls[key].value;
      if ((key == 'width' || key == 'height' || key == 'depth') && isNaN(val))
        return 'invalid';
      if (val != null && val != undefined && val != '') {
        if ((key == 'title' || key == 'description') && val.length > 4) {
          return 'valid';
        } else if (key != 'title' && key != 'description') {
          return 'valid';
        } else {
          return 'invalid';
        }
      }
      else 
        return 'invalid';
    });

    console.log(values);
    console.log(this.dashboardCardGroup.controls);

    if (!values.includes('invalid') && this.image)
      (<HTMLButtonElement>document.querySelector('.submit-btn')).disabled = false;
    else 
      (<HTMLButtonElement>document.querySelector('.submit-btn')).disabled = true;
  }

  submitForm(event: Event) {
    event.preventDefault();

    let request: AddNewSketchRequest = new AddNewSketchRequest();
    request.title = this.dashboardCardGroup.controls['title'].value;
    request.description = this.dashboardCardGroup.controls['description'].value;
    request.width = this.dashboardCardGroup.controls['width'].value;
    request.height = this.dashboardCardGroup.controls['height'].value;
    request.depth = this.dashboardCardGroup.controls['depth'].value;

    this.sketchService.addNewSketch(request, this.image).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  showDeleteConfirm(id: number) {
    console.log(id);
    this.showModal = true;
  }

  deleteSketch(isConfirm: boolean) {
    console.log(isConfirm);
  }

  onDblClick(event: any) {

    let clickInit = parseInt(event.clicked.toString());
    let clickTimes = parseInt(event.clicked.toString());

    if (this.clickCount > 0) {
      clickTimes = clickTimes - this.clickCount;
    }

    console.log(clickTimes);
    console.log(this.clickCount);

    if (clickTimes > 1) {
      console.log('multiple click');
      this.isSingleClick = false;
    } else {
      console.log('signle click');
      this.isSingleClick = true;
    }

    this.clickCount = clickInit;
}

  showDraggingHand(event: Event) {
    console.log(event.target);
    ((<HTMLElement>event.target)).style.cursor = "grab";
  }

  setIcons(event: CdkDragStart) {
    let parent = (<HTMLElement>document.querySelector('.table-holder'));;
    console.log(parent);
    parent.style.cursor = "grab";
  }

  ngOnDestroy(): void {
    console.log("changing page");
  }
}

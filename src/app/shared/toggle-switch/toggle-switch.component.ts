import { AfterViewInit, Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent implements OnInit, AfterViewInit {

  toggleButton: any;
  active = false;
  startPosition = 0;
  currentX = 0;
  initialX = 0;
  container: any;
  element: any;

  @Input() toggledOn: boolean = false;
  @Output() emitShowPrice: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
     let element = document.querySelectorAll('.shape-definer')[0];
          console.log(element);
      this.element = element;
      
      this.container = element.firstElementChild;

      this.toggleButton = this.container?.firstElementChild;
      if (this.toggledOn) {
        this.active = true;
      this.currentX = 22;
      this.setTranslate();
      this.toggleOn();
      this.active = false;
      }
      var decisionPoint = this.toggleButton?.getBoundingClientRect()?.width ?? 0 / 2;
      var  toggleWidth = this.toggleButton?.clientWidth;
      console.log(this.getDecisionPoint());
      console.log( this.getToggleWidth());
  }

   getDecisionPoint() {
    return this.toggleButton?.getBoundingClientRect().width / 2;
  }

 getToggleWidth() {
    return this.toggleButton.clientWidth;
}

 getX( event: any, element: any ) {
    return event.pageX - element.offsetLeft;
}

 toggleClasses(addedClass: any, removedClass: any) {
    this.container.classList.add(addedClass);
    this.container.classList.remove(removedClass);
}

 toggleOn() {
    this.currentX =  this.getToggleWidth() ;
    this.active = false;
    this.toggleClasses('toggled-on', 'toggled-off');
    this.emitShowPrice.emit(true);
}

 toggleOff() {
    this.currentX = this.startPosition;
    this.active = false;
    this.toggleClasses('toggled-off', 'toggled-on');
    this.emitShowPrice.emit(false);
}

 isToggledOn() {
    return this.container.classList.contains('toggled-on');
    //return initialX > (container.getBoundingClientRect().left +  getToggleWidth() + container.style.borderWidth.split('px')[0]);
}

/* get position of mouse click on the container AND toggleButton */
 startedDragging( event: any ) {

    console.log('Started dragging');

    console.log('current toggle width: ',  this.getToggleWidth());
    this.initialX = event.pageX - this.element.offsetLeft;
    this.active = true;

    event.stopPropagation();
}

/* on mouse release or on mouse out of the bonds of the container end the dragging */
 endedDragging( event: any) {

    console.log('Ended dragging');

    if (this.active) {
        if (this.currentX > this.getDecisionPoint()) {
            this.toggleOn();
        } else {
            this.toggleOff();
        }
        this.setTranslate();
    }
}

/* do not allow toggler to go beyond right limit of container */
 checkUpperLimitCurrentX() {
    if ( this.currentX >  this.getToggleWidth() ) {
        this.toggleOn();
    }
}

/* do not allow toggler to go beyond left limit of container */
 checkLowerLimitCurrentX() {
    if ( this.currentX < this.startPosition) {
        this.toggleOff();
    }
}

setTranslate() {
    console.log('Toggle dragged to x position: ', this.currentX);
    this.toggleButton.style.transform = "translate3d(" + this.currentX + "px, 0px, 0)";
}

drag( event: any ) {

    var movedX = event.pageX - this.element.offsetLeft;
    if (this.active) {
        event.preventDefault();

        console.log(this.isToggledOn());
        this.currentX = (this.isToggledOn()) ?  this.getToggleWidth() - (this.initialX - movedX) : (movedX - this.initialX);
        
        this.checkUpperLimitCurrentX();
        this.checkLowerLimitCurrentX();

        this.setTranslate();  
    } 
}

  ngAfterViewInit(): void {
      
  }

}

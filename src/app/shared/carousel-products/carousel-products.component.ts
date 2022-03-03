import { Component, Input, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel-products',
  templateUrl: './carousel-products.component.html',
  styleUrls: ['./carousel-products.component.css']
})
export class CarouselProductsComponent implements OnInit {

  @Input() title: string = '';
  @Input() products: any;

  faNote = faAddressCard as IconProp;
  constructor(private translateService: TranslateService) { 
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
  }

  rotateArrow(event: Event) {
    let icon = (<HTMLElement>(<HTMLElement>event.target).parentElement?.parentElement?.querySelector('.icon'));
    document.querySelectorAll('.icon').forEach(i => { if (i != icon) (<HTMLElement>i).style.transform = "rotate(0deg)"; });
    if (icon.style.transform == "rotate(90deg)")
      icon.style.transform = "rotate(0deg)";
    else 
      icon.style.transform = "rotate(90deg)";
    console.log(icon);
  }

  toggleAccordion(event: Event) {
    this.rotateArrow(event);
    let content = (<HTMLElement>event.target).parentElement?.parentElement?.parentElement?.querySelector('.content');
    let isToggledOn = (<HTMLElement>content).style.maxHeight == "1500px";
    document.querySelectorAll('.content').forEach(e => (<HTMLElement>e).style.maxHeight = "0px");
    document.querySelectorAll('.title').forEach(e => { if (e != content?.parentElement?.firstElementChild) (<HTMLElement>e).style.color = "#0006" });
    console.log(content);
    if (content) {
      if ((<HTMLElement>content).style.maxHeight == "1500px" || isToggledOn) {
        (<HTMLElement>content).style.maxHeight = "0px";
        (<HTMLElement>content.parentElement?.firstElementChild).style.color = "#0006";
        setTimeout(function () {(<HTMLElement>document.querySelector('.historyPoint')).style.zIndex = "1";}, 1000);
      }
      else {
        (<HTMLElement>content).style.maxHeight = "1500px";
        (<HTMLElement>document.querySelector('.historyPoint')).style.zIndex = "-1";
        (<HTMLElement>content.parentElement?.firstElementChild).style.color = "#333";
      }
    }
  }

}

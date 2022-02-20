import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.css']
})
export class SvgComponent implements OnInit {

  @Input() image: string = '';
  draw: boolean = false;
  constructor() { }

  ngOnInit(): void {
    document.addEventListener("scroll", this.scroll);
  }

  scroll(event: Event) {
    let top = document.getElementById("paint");
    console.log(top?.getBoundingClientRect());

    if (top && top?.getBoundingClientRect().top < 200) {
      document.querySelectorAll('.drawing')[1].classList.add('draws');
      setTimeout(function() { document.querySelectorAll('.drawing')[0].classList.add('draws'); }, 3000);
      this.draw = true;
  }

/*
    if (top != undefined && top/2 < parseInt(window.scrollY.toString())) {
      this.draw = true;
      console.log(this.draw);
    }
  }*/}

}

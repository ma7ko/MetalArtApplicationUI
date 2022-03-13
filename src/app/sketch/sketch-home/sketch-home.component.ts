import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faGripLines, faCircle, faSquare, faEraser, faPaintBrush, faPaperPlane, IconLookup, IconPrefix, IconPack, IconName, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Dimension } from 'src/app/service/products/request/product-request';
import { SketchRequest } from 'src/app/service/sketch/request/sketch-request';
import { SketchService } from 'src/app/service/sketch/sketch.service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sketch-home',
  templateUrl: './sketch-home.component.html',
  styleUrls: ['./sketch-home.component.css']
})
export class SketchHomeComponent implements OnInit {

  startingPoint: any;
  context: any;
  canvas: any;
  active: boolean = false;
  line: any;
  lineNum: number = 0;
  shape: string = "line";
  faLine = faGripLines as IconProp;
  faSquare = faSquare as IconProp;
  faCircle = faCircle as IconProp;
  faEraser = faEraser as IconProp;
  faPaint = faPaintBrush as IconProp;
  faPaperPlane = faPaperPlane as IconProp;

  sketchForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    width: new FormControl(''),
    height: new FormControl(''),
    depth: new FormControl(''),
    metric: new FormControl('mm')
  });

  constructor(private sketchService: SketchService, private translateService: TranslateService) {
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
   }

  ngOnInit(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log(document.getElementById("svg-el")?.getBoundingClientRect());
    this.canvas = (<HTMLCanvasElement>document.getElementById('canvas'));
    if (this.canvas)
      this.context = this.canvas.getContext("2d");
    var fragment = document.createDocumentFragment();


  }

  setStartingPoint(event: Event) {
    this.active = true;
    this.startingPoint = ((<MouseEvent>event).clientX - 50, (<MouseEvent>event).clientY - 55);
    console.log(this.startingPoint);
    this.context.moveTo((<MouseEvent>event).clientX - 50, (<MouseEvent>event).clientY - 55);
  }

  setStart(event: Event) {
    var line1 = document.createElementNS("http://www.w3.org/2000/svg", this.shape);
    line1.setAttribute("id", this.lineNum.toString());
    if (this.shape == "line") {
      line1.setAttribute("x1", ((<MouseEvent>event).pageX - 50).toString());
      line1.setAttribute("y1", ((<MouseEvent>event).pageY - 55 - 50).toString());
    } else if (this.shape == "rect") {
      line1.setAttribute("x", ((<MouseEvent>event).pageX - 50).toString());
      line1.setAttribute("y", ((<MouseEvent>event).pageY - 55 - 50).toString());
    } else if (this.shape == "ellipse") {
      line1.setAttribute("cx", ((<MouseEvent>event).pageX - 50).toString());
      line1.setAttribute("cy", ((<MouseEvent>event).pageY - 55 - 50).toString());
    } else if (this.shape == "path") {
      line1.setAttribute("d", "M " + ((<MouseEvent>event).pageX - 50).toString() + " " + ((<MouseEvent>event).pageY - 55 - 50).toString()) + " ";
    }
    document.getElementById("svg-el")?.appendChild(line1);
    this.active = true;
  }

  move(event: Event) {
    if (this.active) {
      console.log(event);
      let line2 = document.getElementById(this.lineNum.toString());
      if (this.shape == "line") {
        line2?.setAttribute("x2", ((<MouseEvent>event).pageX - 50).toString());
        line2?.setAttribute("y2", ((<MouseEvent>event).pageY - 55 - 50).toString());
      } else if (this.shape == "rect") {
        let x = line2?.getAttribute("x");
        let y = line2?.getAttribute("y");
        if (x && y) {
          line2?.setAttribute("width", Math.abs(parseInt(x) - (<MouseEvent>event).pageX + 50).toString());
          line2?.setAttribute("height", Math.abs(parseInt(y) - Math.abs((<MouseEvent>event).pageY - 55 - 50)).toString());
        }
      } else if (this.shape == "ellipse") {
        let x = line2?.getAttribute("cx");
        let y = line2?.getAttribute("cy");
        if (x && y) {
          line2?.setAttribute("rx", Math.abs(parseInt(x) - Math.abs((<MouseEvent>event).pageX - 50)).toString());
          line2?.setAttribute("ry", Math.abs(parseInt(y) - Math.abs((<MouseEvent>event).pageY - 55 - 50)).toString());
        }
      } else if (this.shape == "path") {
        line2?.setAttribute("d", line2?.getAttribute("d") + "C " + ((<MouseEvent>event).pageX + 50) + " " + ((<MouseEvent>event).pageY - 55 - 50) + " " + ((<MouseEvent>event).pageX + 30) + " " + ((<MouseEvent>event).pageY - 55 - 30) + " " + ((<MouseEvent>event).pageX + 50) + " " + ((<MouseEvent>event).pageY - 55 - 50));
      }
      line2?.setAttribute("style", "stroke: black;");
    }
  }

  setEnd(event: Event) {
    this.active = false;
    this.lineNum = this.lineNum + 1;
  }

  dragging(event: Event) {
    if (this.active) {

      this.context.lineTo((<MouseEvent>event).clientX - 10, (<MouseEvent>event).clientY - 55 - 50);
      this.context.stroke();
    }
  }

  endDrawing(event: Event) {
    if (this.active) {
      this.context.lineTo((<MouseEvent>event).clientX - 10, (<MouseEvent>event).clientY - 55 - 50);
      this.context.stroke();
      this.active = false;
    }
  }

  changePen(event: Event, value: any) {
    document.querySelectorAll(".btn-draw").forEach(element => element.classList.remove("btn-active"));
    (<HTMLElement>event.target).classList.add('btn-active');
    this.shape = value;
  }

  eraseContent() {
    let element = document.querySelector("#svg-el");
    (<HTMLElement>element).innerHTML = "";
  }

  setDimensions(dimension: Dimension) {
    console.log(dimension);
    this.sketchForm.controls['width'].setValue(dimension.width);
    this.sketchForm.controls['height'].setValue(dimension.height);
    this.sketchForm.controls['depth'].setValue(dimension.depth);
  }

  setMetrics(value: string) {
    this.sketchForm.controls['metric'].setValue(value);
  }

  submitForm(event: Event) {
    event.preventDefault();
    let request: SketchRequest = new SketchRequest();
    request.name = this.sketchForm.controls['name'].value;
    request.description = this.sketchForm.controls['description'].value;
    request.width = this.sketchForm.controls['width'].value;
    request.height = this.sketchForm.controls['height'].value;
    request.depth = this.sketchForm.controls['depth'].value;
    request.metric = this.sketchForm.controls['metric'].value;

    var svgData = document.getElementById("svg-el")?.outerHTML;
    if (svgData) {
      var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      var file = new File([svgBlob], "uploadedFile");

      this.sketchService.sendSketch(request, file).subscribe((response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });
    }
  }

}

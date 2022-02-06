import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {

  @Input() product: any = null;
  imageFile: Blob | undefined;
  constructor() { }

  ngOnInit(): void {
    if (this.product) {
      this.readFile();

    }
  }

  readFile() {

    if (this.product.image) {
      document.getElementById('fetched')?.setAttribute('src', `data:image/jpeg;base64,${this.product.image}`);
      console.log(this.product.image);
    }
      

  }



}

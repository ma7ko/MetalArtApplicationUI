import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() emitValue: EventEmitter<any> = new EventEmitter<any>();
  constructor(private translateService: TranslateService) { 
    this.translateService.setDefaultLang('mk');
    this.translateService.use('mk');
  }

  ngOnInit(): void {
  }

  searchProducts() {
    this.emitValue.emit((<HTMLInputElement>document.getElementById('search-field')).value);
  }
}

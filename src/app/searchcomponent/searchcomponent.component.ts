import { Component, OnInit ,EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-searchcomponent',
  templateUrl: './searchcomponent.component.html',
  styleUrls: ['./searchcomponent.component.css']
})
export class SearchcomponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

enteredsearchvalue:string="";
@Output()
searchtextchanged:EventEmitter<string>=new EventEmitter<string>();
OnSearchTextChanged(){
  this.searchtextchanged.emit(this.enteredsearchvalue)
}

}

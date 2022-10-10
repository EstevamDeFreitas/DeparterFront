import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  opened: boolean = true;

  constructor() { }

  ngOnInit(): void {
   
  }

  sideAbreFecha() {
    
    if(this.opened = true){
      this.opened = false;
    }else{
      this.opened= true;
    }
  }

}

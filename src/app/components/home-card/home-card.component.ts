import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {

  @Input() author?:string;
  @Input() title!:string;
  @Input() date!:string;
  @Input() id!:number;

  constructor() { }

  ngOnInit(): void {
  }

}

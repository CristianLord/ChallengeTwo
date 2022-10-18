import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
/**
 * This component shows the information of the journal uploaded by a user subscription
 */
export class HomeCardComponent implements OnInit {

  /**
   * Author of the journal.
   */
  @Input() author?:string;

  /**
   * Title of the journal.
   */
  @Input() title!:string;

  /**
   * Uploaded date of the journal.
   */
  @Input() date!:string;

  /**
   * ID of the journal.
   */
  @Input() id!:number;

  constructor() { }

  ngOnInit(): void {}

}

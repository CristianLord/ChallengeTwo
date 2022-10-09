import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})

/**
 * This component appears when there is a 404 error.
 */
export class Error404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

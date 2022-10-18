import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { Subscription, UserViewModel } from 'src/app/api/models';
import { SubscriptionsService } from 'src/app/api/services';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
/**
 * This component shows all the current user's subscriptions. 
 */
export class MySubscriptionsComponent implements OnInit {

  /**
   * List of the user's subscriptions.
   */
  subscriptions!:UserViewModel[];

  /**
   * MySubcription component contructor.
   * @param api Subscription API service.
   * @param data Current data user.
   */
  constructor(private readonly api:SubscriptionsService, private data:DataService) { }

  ngOnInit(): void {
    this.api.apiSubscriptionsGetSubscriptionsUserIdUserGet$Json({idUser:this.data.user?.id!}).subscribe(
      {
        next:(res) => this.subscriptions = res,
        error: (error) => {}
      }
    );
  }

}

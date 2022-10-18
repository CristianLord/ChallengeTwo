import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { Subscription, UserViewModel } from 'src/app/api/models';
import { SubscriptionsService, UsersService } from 'src/app/api/services';

@Component({
  selector: 'app-subscription-find',
  templateUrl: './subscription-find.component.html',
  styleUrls: ['./subscription-find.component.scss']
})
/**
 * This component shows all user suggestions to subscribe.
 */
export class SubscriptionFindComponent implements OnInit {

  /**
   * List of users.
   */
  userList!:UserViewModel[];

  /**
   * SubscriptionFind component constructor.
   * @param api User API service.
   * @param data Current data user.
   */
  constructor(private readonly api:UsersService, private data:DataService) { }

  ngOnInit(): void {
    this.api.apiUsersGetWoutSubscIdUserGet$Json({idUser:this.data.user?.id!}).subscribe(
      {
        next: res => {this.userList = res},
        error: error => {}
      }
    )
  }

}

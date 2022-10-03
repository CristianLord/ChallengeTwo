import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';
import { Subscription, UserViewModel } from 'src/app/api/models';
import { SubscriptionsService } from 'src/app/api/services';

@Component({
  selector: 'app-my-subscriptions',
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss']
})
export class MySubscriptionsComponent implements OnInit {

  subscriptions!:UserViewModel[];

  constructor(private readonly api:SubscriptionsService, private data:DataService) { }

  ngOnInit(): void {
    this.api.apiSubscriptionsGetSubscriptionsUserIdUserGet$Json({idUser:this.data.user?.id!}).subscribe(
      res => this.subscriptions = res
    );
  }

}

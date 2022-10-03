import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { SubscriptionsService } from 'src/app/api/services';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})
export class SubscriptionCardComponent implements OnInit {

  @Input() name!:string;
  @Input() id!:number;
  @Input() subscribed!:boolean;

  constructor(private readonly api:SubscriptionsService, 
    private data:DataService,
    private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Subscribe or unsubscribe a user from another.
   */
  subscription(){
    if(this.subscribed)
    {
      this.api.apiSubscriptionsIdUserIdSubscribedDelete({
        idUser:this.data.user?.id!,
        idSubscribed:this.id
      }).subscribe(res => {
        this.router.navigate(['/find-new']);
      });
    }
    else
    {
      this.api.apiSubscriptionsPost$Json({
        body:{
          idUser: this.data.user?.id,
          idSubscribedUser: this.id
        }
      }).subscribe(res => {
        this.router.navigate(['/my-subscriptions']);
      });
    }
  }

}

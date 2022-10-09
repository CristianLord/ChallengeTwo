import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/api/data.service';
import { SubscriptionsService } from 'src/app/api/services';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss']
})

/**
 * This component shows the face with the user information.
 */
export class SubscriptionCardComponent implements OnInit {

  /**
   * Name of the user
   */
  @Input() name!:string;

  /**
   * ID of the user
   */
  @Input() id!:number;

  /**
   * If the user is subscribed to it or not
   */
  @Input() subscribed!:boolean;

  /**
   * Subscription Card component constructor.
   * @param api Subscription API service
   * @param data Current user data service
   * @param router Redirect a new page when the user subscribes or unsubscribes from another one.
   */
  constructor(
    private readonly api:SubscriptionsService, 
    private data:DataService,
    private router:Router) { }

  ngOnInit(): void {
  }

  /**
   * Subscribe or unsubscribe a user from another.
   */
  subscription(){

    //Verify if the user is subscribed to the selected user.
    if(this.subscribed)
    {
      if(confirm(`Are you sure you want to unsubscribe to ${this.name}?`)){
        this.api.apiSubscriptionsIdUserIdSubscribedDelete({
          idUser:this.data.user?.id!,
          idSubscribed:this.id
        }).subscribe({
          error: error => {},
          complete: () => this.router.navigate(['/find-new'])
        });
      }
    }
    else
    {
      this.api.apiSubscriptionsPost$Json({
        body:{
          idUser: this.data.user?.id,
          idSubscribedUser: this.id
        }
      }).subscribe({
        error: error => {},
        complete:() => this.router.navigate(['/my-subscriptions'])
      });
    }
  }

}

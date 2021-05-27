import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ApiService } from 'src/app/api.service';
import { MessagingService } from './service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck {
  title = 'testpwa';
  articles: any = [];
  userpagedata: number = 2;
  message: any;

  constructor(private apiService: ApiService, private swUpdate: SwUpdate, private messagingService: MessagingService) { }

  ngOnInit() {
    // https://medium.com/mighty-ghost-hack/angular-8-firebase-cloud-messaging-push-notifications-cc80d9b36f82
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    
    // Notification.requestPermission(function (status) {
    //   console.log('Notification permission status:', status);
    // });

    // function displayNotification() {
    //   if (Notification.permission == 'granted') {
    //     navigator.serviceWorker.getRegistration().then(function (reg: any) {
    //       var options = {
    //         body: 'New version Updated',
    //         icon: 'assets/Images-pwa/Singtel_billing_footer_logo.png',
    //         vibrate: [100, 50, 100],
    //         actions: [{ action: 'close', title: 'Close' }]
    //       };
    //       reg.showNotification('Hello world!', options);
    //     });
    //   }
    // }

    console.log(this.swUpdate)
    if (this.swUpdate.isEnabled) {
      console.log(this.swUpdate.isEnabled)
      this.swUpdate.available.subscribe(() => {
        // window.location.reload();
        // if(confirm("New version available. Load New Version?")) {
        //   window.location.reload();
        // }
        // displayNotification();
        window.location.reload();
      });
    }

    this.apiService.getNews(this.userpagedata).subscribe((data: any) => {
      console.log(data);
      this.articles = data.data;
    });

    this.apiService.getUnknown(this.userpagedata).subscribe((data: any) => {
      console.log(data);
    });

  }

  ngDoCheck() {
    this.message = this.messagingService.currentToken.value;
  }

}

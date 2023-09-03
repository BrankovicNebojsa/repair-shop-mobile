import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-brand-element',
  templateUrl: './brand-element.component.html',
  styleUrls: ['./brand-element.component.scss'],
})
export class BrandElementComponent  implements OnInit {

  @Input() brand: Brand = {id: '4', name: "VW"};

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  openAlert() {
    this.alertController.create({
      header: "Delete brand",
      message: "Are you sure you want to delete this brand?",
      buttons: [
        {
          text: "Delete",
          handler: () => {
            console.log("Deleted!");
          }
        },
        {
          text: "Cancel",
          handler: () => {
            console.log("Canceled!");
          }
        }
      ]
    }).then((alert:HTMLIonAlertElement) => {
      alert.present();
    });
  }

}

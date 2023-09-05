import { Component, OnInit } from '@angular/core';
import { Model } from '../../model.model';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ModelsService } from '../../models.service';
import { ModelModalComponent } from '../../model-modal/model-modal.component';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.page.html',
  styleUrls: ['./model-details.page.scss'],
})
export class ModelDetailsPage implements OnInit {
  model: Model;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modelService: ModelsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.modelService.getModel(this.route.snapshot.params?.['modelId'])
    );
    this.model = new Model('1', 'Audi', 'A6', '1');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('modelId')) {
        this.navCtrl.navigateBack('/models/tabs/explore');
        return;
      }

      this.modelService.getModel(paramMap.get('modelId')).subscribe((model) => {
        this.model = model;
      });
    });
  }

  async onEditModel() {
    const modal = await this.modalCtrl.create({
      component: ModelModalComponent,
      componentProps: {
        title: 'Edit model',
        brand_name: this.model.brand_name,
        model_name: this.model.model_name,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.modelService
        .editModel(
          this.model.id!,
          data.modelData.brand_name,
          data.modelData.model_name,
          this.model.userId
        )
        .subscribe((res) => {
          this.model.brand_name = data.modelData.brand_name;
          this.model.model_name = data.modelData.model_name;
        });
    }
  }
}

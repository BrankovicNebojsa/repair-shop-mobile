import { Component, OnInit } from '@angular/core';
import { Engine } from '../../engine.model';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { EnginesService } from '../../engines.service';
import { EngineModalComponent } from '../../engine-modal/engine-modal.component';

@Component({
  selector: 'app-engine-details',
  templateUrl: './engine-details.page.html',
  styleUrls: ['./engine-details.page.scss'],
})
export class EngineDetailsPage implements OnInit {
  engine: Engine;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private engineService: EnginesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.engineService.getEngine(this.route.snapshot.params?.['engineId'])
    );
    this.engine = new Engine(
      '1',
      '140',
      '1968',
      '4',
      '1',
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('engineId')) {
        this.navCtrl.navigateBack('/engines/tabs/explore');
        return;
      }

      this.engineService.getEngine(paramMap.get('engineId')).subscribe((engine) => {
        this.engine = engine;
      });
    });
  }

  async onEditEngine() {
    const modal = await this.modalCtrl.create({
      component: EngineModalComponent,
      componentProps: {
        title: 'Edit engine',
        horse_power: this.engine.horse_power,
        engine_capacity: this.engine.engine_capacity,
        number_of_cylinders: this.engine.number_of_cylinders
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.engineService
        .editEngine(
          this.engine.id!,
          data.engineData.horse_power,
          data.engineData.engine_capacity,
          data.engineData.number_of_cylinders,
          this.engine.userId
        )
        .subscribe((res) => {
          this.engine.horse_power = data.engineData.horse_power;
          this.engine.engine_capacity = data.engineData.engine_capacity;
          this.engine.number_of_cylinders = data.engineData.number_of_cylinders;
        });
    }
  }

}

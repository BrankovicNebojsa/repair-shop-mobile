import { Component, OnInit } from '@angular/core';
import { Engine } from '../engine.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { EnginesService } from '../engines.service';

@Component({
  selector: 'app-engine-modal',
  templateUrl: './engine-modal.component.html',
  styleUrls: ['./engine-modal.component.scss'],
})
export class EngineModalComponent implements OnInit {
  engine: Engine;

  editEngineForm: FormGroup;

  title: string = 'Edit engine';

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private engineService: EnginesService
  ) {
    this.editEngineForm = new FormGroup({
      horse_power: new FormControl(null, [Validators.required]),
      engine_capacity: new FormControl(null, [Validators.required]),
      number_of_cylinders: new FormControl(null, [Validators.required]),
    });
    this.engine = new Engine('1', '140', '1968', '4', '1');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('engineId')) {
        this.navCtrl.navigateBack('/engines/tabs/explore');
        return;
      }

      this.engineService
        .getEngine(paramMap.get('engineId'))
        .subscribe((engine) => {
          this.engine = engine;
        });
    });
  }

  isFormValid() {
    if (this.editEngineForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editEngineForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        engineData: {
          horse_power: this.editEngineForm.get('horse_power')?.value,
          engine_capacity: this.editEngineForm.get('engine_capacity')?.value,
          number_of_cylinders: this.editEngineForm.get('number_of_cylinders')
            ?.value,
        },
      },
      'confirm'
    );
  }
}

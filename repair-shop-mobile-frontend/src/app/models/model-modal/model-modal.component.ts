import { Component, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-model-modal',
  templateUrl: './model-modal.component.html',
  styleUrls: ['./model-modal.component.scss'],
})
export class ModelModalComponent implements OnInit {
  model: Model;

  editModelForm: FormGroup;

  title: string = 'Edit model';

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modelService: ModelsService
  ) {
    this.editModelForm = new FormGroup({
      brand_name: new FormControl(null, [Validators.required]),
      model_name: new FormControl(null, [Validators.required]),
    });
    this.model = new Model('1', 'Audi', 'A5', '1');
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

  isFormValid() {
    if (this.editModelForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editModelForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        modelData: {
          brand_name: this.editModelForm.get('brand_name')?.value,
          model_name: this.editModelForm.get('model_name')?.value,
        },
      },
      'confirm'
    );
  }
}

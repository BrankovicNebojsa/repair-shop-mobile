import { Component, OnDestroy, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  models: Model[] | undefined;
  private modelSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private modelService: ModelsService
  ) {}

  ngOnInit() {
    this.modelSub = this.modelService.models.subscribe((models) => {
      this.models = models;
    });
  }

  ionViewWillEnter() {
    this.modelService.getModels().subscribe((models) => {});
  }

  ngOnDestroy() {
    if (this.modelSub) {
      this.modelSub.unsubscribe();
    }
  }
}

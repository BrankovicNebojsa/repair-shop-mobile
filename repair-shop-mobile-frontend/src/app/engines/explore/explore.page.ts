import { Component, OnInit } from '@angular/core';
import { Engine } from '../engine.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { EnginesService } from '../engines.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  engines: Engine[] | undefined;
  private engineSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private engineService: EnginesService
  ) {}

  ngOnInit() {
    this.engineSub = this.engineService.engines.subscribe((engines) => {
      this.engines = engines;
    });
  }

  ionViewWillEnter() {
    this.engineService.getEngines().subscribe((engines) => {});
  }

  ngOnDestroy() {
    if (this.engineSub) {
      this.engineSub.unsubscribe();
    }
  }
}

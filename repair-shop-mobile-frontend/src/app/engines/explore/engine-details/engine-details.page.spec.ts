import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EngineDetailsPage } from './engine-details.page';

describe('EngineDetailsPage', () => {
  let component: EngineDetailsPage;
  let fixture: ComponentFixture<EngineDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EngineDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

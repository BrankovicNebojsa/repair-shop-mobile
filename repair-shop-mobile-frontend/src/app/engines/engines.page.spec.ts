import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnginesPage } from './engines.page';

describe('EnginesPage', () => {
  let component: EnginesPage;
  let fixture: ComponentFixture<EnginesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EnginesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

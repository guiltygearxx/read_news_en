import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MNewsLoadingCardMulti4Component } from './m-news-loading-card-multi-4.component';

describe('MNewsLoadingCardMulti4Component', () => {
  let component: MNewsLoadingCardMulti4Component;
  let fixture: ComponentFixture<MNewsLoadingCardMulti4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MNewsLoadingCardMulti4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MNewsLoadingCardMulti4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

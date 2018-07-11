import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsLoadingCard4Component} from './news-loading-card-4.component';

describe('NewsLoadingCard4Component', () => {
  let component: NewsLoadingCard4Component;
  let fixture: ComponentFixture<NewsLoadingCard4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLoadingCard4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoadingCard4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

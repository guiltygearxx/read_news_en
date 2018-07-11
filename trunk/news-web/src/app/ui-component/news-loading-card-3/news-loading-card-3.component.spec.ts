import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsLoadingCard3Component} from './news-loading-card-3.component';

describe('NewsLoadingCard3Component', () => {
  let component: NewsLoadingCard3Component;
  let fixture: ComponentFixture<NewsLoadingCard3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLoadingCard3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoadingCard3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

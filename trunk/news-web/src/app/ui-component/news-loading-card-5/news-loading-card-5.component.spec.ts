import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLoadingCard5Component } from './news-loading-card-5.component';

describe('NewsLoadingCard5Component', () => {
  let component: NewsLoadingCard5Component;
  let fixture: ComponentFixture<NewsLoadingCard5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLoadingCard5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLoadingCard5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

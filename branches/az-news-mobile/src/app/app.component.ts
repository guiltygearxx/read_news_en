import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePage} from "../pages/home/home";
import {TranslateService} from "@ngx-translate/core";
import {CategoryService} from "../providers/category.service";
import {Category} from "../bean/category";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;

  splashScreen: SplashScreen;

  menuTitle: string;

  menuCategoryIds: string[] = [
    "6a494fbc-0f09-4ab0-95a3-12c1b7e02945",
    "23b0f84f-3828-4a4c-aec2-6501d2ec309a",
    "1bc09a1e-d8d4-4b01-b081-cf14b1463444",
    "1ebd44cb-1ad5-4597-858a-978882c57765",
    "70da8161-7f75-474f-acdf-6b76e825d96c",
    "c548902c-9338-4b93-aac1-f25aa252e935",
    "d6cc2752-5d45-43ca-860e-a9c675e1fd2d",
    "f0b2ebb7-83ab-4087-ab9a-9ec38d14bfc8",
    "82483751-ff0c-44cf-88aa-3fbde77d2040",
    "90916f71-d10d-4540-b5ac-a7f857721b96",
    "2fb4c139-9e35-4eaa-9660-8422fbf6db72",
    "c0e3235c-424e-4cbb-acfa-471f18671c8d"
  ];

  menuCategories: Category[];

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              translate: TranslateService,
              public categoryService: CategoryService) {

    translate.setDefaultLang('vi');

    translate
      .get("menu.header.moreCategory")
      .subscribe(translated => this.menuTitle = translated);

    this.splashScreen = splashScreen;

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleDefault();

      this.loadCategory();
    });
  }

  menuCategoryClicked(category: Category): void {


  }

  private loadCategory(): void {

    this.categoryService.get({}).subscribe(categories => {

      this.categoryService.categories = categories;

      this.rootPage = HomePage;

      this.splashScreen.hide();

      this.splashScreen = null;

      this.initMenu();
    })
  }

  private initMenu(): void {

    let categories = this.categoryService.categories;

    this.menuCategories = this.menuCategoryIds
      .map(categoryId => categories.find(category => category.id == categoryId));
  }
}

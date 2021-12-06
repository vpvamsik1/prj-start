import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HeaderComponent } from './header.component';

const mockUser = new User('vpvamsik1@gmail.com', '3', '7338', new Date());
const authService = {
  user: of(mockUser),
  logout: () => {
    localStorage.removeItem('userData');
  }
}

fdescribe('HeaderComponent', () => {
  let app: HeaderComponent;
  let fixture;

  let user: Observable<User>;
  let userSubscription: Subscription;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
      ],
      providers: [
        // DataStorageService,
        // AuthService
        RecipeService,
        ShoppingListService,
        {
          provide: AuthService, useValue: authService
        }
      ],
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ]

    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('should create the header component', async(() => {

    expect(app).toBeTruthy();
  }));

  it('should fetch the data', () => {
    // const fixture = TestBed.createComponent(HeaderComponent);
    // const app = fixture.componentInstance;
    spyOn(app.dataStorageService, 'fetchRecipes').and.returnValue(of());
    app.onFetchData();
    expect(app.dataStorageService.fetchRecipes).toHaveBeenCalled();
    // console.log(data);
  });

  it('should test if the user is authenticated or not', () => {
    // const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    // const fixture = TestBed.createComponent(HeaderComponent);
    // const app = fixture.componentInstance;

    app.ngOnInit();

    expect(app.isAuthenticated).toBeTrue();

  });

  it('should save the data', () => {

    spyOn(app.dataStorageService, 'storeRecipes');
    app.onSaveData();
    expect(app.dataStorageService.storeRecipes).toHaveBeenCalled();
  });

  it('should logout', () => {
    const user = new User(
      'vpvamsik1@gmail.com',
      '123',
      '456',
      new Date('2022-12-1')
    );

    localStorage.setItem('userData', JSON.stringify(user));

    app.onLogout();
    const user2 = localStorage.getItem('userData');
    expect(user2).toBeNull();
  });

  // it('should unsubscribe the user ', () => {

  //   spyOn(app.userSub, 'unsubscribe').and.callThrough();
  //   // app.ngOnInit();
  //   const userSub = authService.user.subscribe((data)=>{});
  //   // spyOn(app.userSub, 'unsubscribe').and.returnValue(userSub);
  //   app.ngOnDestroy();
  //   // expect(app.userSub.unsubscribe).toHaveBeenCalled();
  //   expect(app.userSub.unsubscribe).toHaveBeenCalled();
  // });
});

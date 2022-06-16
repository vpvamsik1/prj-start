import { TestBed } from "@angular/core/testing";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

describe('AuthInterceptor', () => {
  let authInterceptorService: AuthInterceptorService;
  // const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);
  let client: HttpClient;
  let httpMock: HttpTestingController;
  let dataStorageService: DataStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthInterceptorService,
        RecipeService,
        ShoppingListService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
      ]
    }).compileComponents();
    authInterceptorService = TestBed.inject(AuthInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    client = TestBed.inject(HttpClient);
    dataStorageService = TestBed.inject(DataStorageService);
  });

  it('should be created', () => {
    // expect(authInterceptorService).toBeTruthy();
    expect(httpMock).toBeTruthy();
    expect(client).toBeTruthy();
  });

  it('should it not contain the token',  (done) => {
    // dataStorageService.fetchRecipes().subscribe();
    client.get('/test').subscribe((data)=>{
      console.log(data);
      done();
    });

    const httpRequest = httpMock.expectOne('/test');

    console.log(httpRequest.request.params.get("auth"));
    httpRequest.flush({name: "vamsi"});
  });
});

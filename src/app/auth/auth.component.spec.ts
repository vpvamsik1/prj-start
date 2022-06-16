import { HttpClientModule } from "@angular/common/http";
import { ComponentFactoryResolver, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthComponent } from "./auth.component";
import { AuthService } from "./auth.service";

describe('AuthComponent', () => {
  let authComponent: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'signup']);
  const componentFactoryResolverSpy = jasmine.createSpyObj('ComponentFactoryResolver', ['resolveComponentFactory']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        PlaceholderDirective,
        AlertComponent
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ComponentFactoryResolver, useValue: componentFactoryResolverSpy}
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]

    }).compileComponents();
    // authComponent = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    authComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(authComponent).toBeTruthy();
  });

  it('should reverse loginMode upon click', () => {
    authComponent.isLoginMode = true;
    authComponent.onSwitchMode();
    expect(authComponent.isLoginMode).toBeFalse();
  });

  it('should login if isloginMode is true', () => {
    const mockAuthObs =  {
      "kind": "identitytoolkit#VerifyPasswordResponse",
      "localId": "EvtrUcSIBUaMelt4WepQPJiQg232",
      "email": "test2@test.com",
      "displayName": "",
      "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkYzBlNmRmOTgyN2EwMjA2MWU4MmY0NWI0ODQwMGQwZDViMjgyYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctY291cnNlLXJlY2lwZS1ib29rLTItYzAwNGYiLCJhdWQiOiJuZy1jb3Vyc2UtcmVjaXBlLWJvb2stMi1jMDA0ZiIsImF1dGhfdGltZSI6MTY0NjYyNjQ4NiwidXNlcl9pZCI6IkV2dHJVY1NJQlVhTWVsdDRXZXBRUEppUWcyMzIiLCJzdWIiOiJFdnRyVWNTSUJVYU1lbHQ0V2VwUVBKaVFnMjMyIiwiaWF0IjoxNjQ2NjI2NDg2LCJleHAiOjE2NDY2MzAwODYsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDJAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Eg3t5_viCq-L-hcRdhcSqvRZGDZKGI-qH9IkoxVR0HAS4pzcj80G7E1BrKylZ0xcu1NkqjQkeEjw-pddMvNM0iU7j5w5GnVKU56uT4oz_p-XP5GQUvH-Ld4xPsfDLW9ct7pA_OmF7HrAtoBWnO48ilYoCaCx3HHZESKpV4B29ryUSHmoi-N0C4X7YW2lma_P2ILI0krKBO5MbFra5v5swdCf_yCeyVB5zElIFHgNVmKuDqqXkugK1eN226kisWYzFKQtqzq2QB0ZVXnZMtE1Vek2XwcPQuHlMLM3GqcNaxJ4L6Tq8aIkc0ylZKWZnVg2GqGdGqAQuwNNuyEBQnsI9g",
      "registered": true,
      "refreshToken": "AIwUaOkzyPYGdyLOlhofE0ZePgS2IW8vuG77F2A0l3VBiwWidMVhnRpAqJEg7NZi1hM-VE-jfbLt6Qh8KAwk5YJgXDYJza4pKuQRqVMmmMJE1cjZa7Vil4Z19pQlGEuZ59GbJ_SObnOkULieHsSsJAIBwWJM95a3IKxev9okz2YFyc7osrMZgXs82tmD7vHjfTqLi-hJ2Yer7wB-HGoZyoGT0TYtNgTYJhf0gSwJwglW4Q5rV-UHsQk",
      "expiresIn": "3600"
    }
    authServiceSpy.login.and.returnValue(of(mockAuthObs));
    const testForm = <NgForm>{
      value: {
          email: "test3@test.com",
          password: "va01mk"
      },
      valid: true,
      reset: ()=>{},
    };
    // spyOn(authServiceSpy, 'login');
    authComponent.isLoginMode = true;
    fixture.detectChanges();
    authComponent.onSubmit(testForm);
    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it('should sign up if isloginMode is false', () => {
    const mockAuthObs = {
      "kind": "identitytoolkit#VerifyPasswordResponse",
      "localId": "EvtrUcSIBUaMelt4WepQPJiQg232",
      "email": "test2@test.com",
      "displayName": "",
      "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYxZDU2YTI1MWU0ZGRhM2Y0NWM0MWZkNWQ0ZGEwMWQyYjlkNzJlMGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctY291cnNlLXJlY2lwZS1ib29rLTItYzAwNGYiLCJhdWQiOiJuZy1jb3Vyc2UtcmVjaXBlLWJvb2stMi1jMDA0ZiIsImF1dGhfdGltZSI6MTY0NzIyNTExNywidXNlcl9pZCI6IkV2dHJVY1NJQlVhTWVsdDRXZXBRUEppUWcyMzIiLCJzdWIiOiJFdnRyVWNTSUJVYU1lbHQ0V2VwUVBKaVFnMjMyIiwiaWF0IjoxNjQ3MjI1MTE3LCJleHAiOjE2NDcyMjg3MTcsImVtYWlsIjoidGVzdDJAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDJAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.WNl6e4lAIi8fzFLD7UGNA9t3KrvUC4FDvFh9ru_WQdfGXb0nrIpCaJkCuJhSmgjV8w_vUOOP0Wqfufjem6Q928p7UyiTexAH6Nx7Vzs0HSudaH27FUDa3hD1KnjWn6QnSt0Ynlm6y2-zw2qBWVrFLBaDZ78Zxcu1zenzzfCzCCvJckOKT1lb5NSEz2DFROrRHgnW5J6ZgK2OiSOZd0wQuw4AcDnZfQNq0TwRBWeQ12ESm7Xw9hK71Wz66oB-H8PuWgNJB7bQLN4EN_c7yP4MoNbi3g0hhxjSkiLpkp87LzkNROxFMk-OVzYHbHt8IOaK_PEGCs75Oa63aysURGUiTw",
      "registered": true,
      "refreshToken": "AIwUaOnPdIQucA0YF2CYUGy9uQwrShMeemZJF-ib714naqfQVHOk-jqORkQJGcFuq9qBjpJfLlJLd_vJKzG4moGwkR7oRTBJ8p4vU7uXlhcaE1jlOn7rBEHAh6uLqC7CB1fKQYciKhPAqnpw3-GpWK2LdKN1xMXt15xbe7e3wT1auBnP4LeiAlSprqnWA8kRz59L64rjXyFXGIgI-0bV8Xz27jU2GkVtegdo_zg-3yQixH8hrDBZH4c",
      "expiresIn": "3600"
    }
    authServiceSpy.signup.and.returnValue(of(mockAuthObs));
    const testForm2 = <NgForm>{
      value: {
        email: 'test7@test.com',
        password: 'va01mk'
      },
      valid: true,
      reset: () => {}
    }
    authComponent.isLoginMode = false;
    fixture.detectChanges();
    authComponent.onSubmit(testForm2);
    expect(authServiceSpy.signup).toHaveBeenCalledWith(testForm2.value.email, testForm2.value.password);
  });

  it('should do what what the funciton is asking for', () => {

    spyOn(authComponent, 'showErrorAlert');

    authServiceSpy.login.and.returnValue(throwError('my custom error'));
    const testForm2 = <NgForm>{
      value: {
        email: 'test7@test.com',
        password: 'va01mk'
      },
      valid: true,
      reset: () => {}
    }
    // authComponent.isLoginMode = false;
    fixture.detectChanges();
    authComponent.onSubmit(testForm2);
    expect(authComponent.showErrorAlert).toHaveBeenCalled();
    // expect(aut)
  });

  // fit('should throw an error if there is one in sign up', () => {
  //   authComponent.showErrorAlert('My custom error');
  //   expect(componentFactoryResolverSpy.resolveComponentFactory).toHaveBeenCalled();

  // });
});

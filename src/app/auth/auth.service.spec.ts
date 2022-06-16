import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from '@angular/router/testing';
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";

describe('AuthService', () => {
  let authService: AuthService;
  const httpSpy = jasmine.createSpyObj('HttpClient', ['post']);

  let routerMock = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {provide: HttpClient, useValue: httpSpy},
        {provide: Router, useValue: routerMock}
      ],

    }).compileComponents();
    authService = TestBed.inject(AuthService);

  });



  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should sign the user up', () => {
    const signupData = {
      email: "test5@test.com",
      password: "va01mk"
    }

    spyOn(authService, 'logout').and.callFake(()=>{});
    httpSpy.post.and.returnValue(of(signupData));

    authService.signup("test5@test.com", "va01mk").subscribe((data) => {
      // console.log("hi", data);
      expect(data.email).toEqual(signupData.email);
    });

  });

  it('should handle authentication in sign up', () => {
    // const signupData = {
    //   email: "test5@test.com",
    //   password: "va01mk"
    // }

    const resData = {
      kind: "identitytoolkit#SignupNewUserResponse",
      idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI3ZGRlMTAyMDAyMGI3OGZiODc2ZDdiMjVlZDhmMGE5Y2UwNmRiNGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctY291cnNlLXJlY2lwZS1ib29rLTItYzAwNGYiLCJhdWQiOiJuZy1jb3Vyc2UtcmVjaXBlLWJvb2stMi1jMDA0ZiIsImF1dGhfdGltZSI6MTY0NDk4MjYyNiwidXNlcl9pZCI6IlUxWFdEeEU2eThQVTRBREdLNjVEVVN2ZnpuUzIiLCJzdWIiOiJVMVhXRHhFNnk4UFU0QURHSzY1RFVTdmZ6blMyIiwiaWF0IjoxNjQ0OTgyNjI2LCJleHAiOjE2NDQ5ODYyMjYsImVtYWlsIjoidGVzdDVAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDVAdGVzdC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.bpxkxxExiXclyfrv9nwL6lUzZyvia7bmqyegZR_pFFZd3YlanIbqlrZAstgQDcbRSBDGajyPSgNtfCleH-M4F4s3Lof7qFUflQuAmGRK6K-BI1sc-NaonOSodBegLu7GbHphQOsb-hJyjTzp1gRjnP45W0soI1_uphsz5gFyyFiYR5Ab71qQsdgy_TClj59SnZTAznLcxX4IXPT6UKxyFBLrjRkuKCI14ZzsDMPbChxr6nOXj8fBKD6xzLEBupTuDq0MeLhSR5Hp6HrYL9mVoc4M_YTy-EwEUx6sNKGYvvwjUsJTrnKMHV7nUv43fDh-K1Ycp7vhN6YqxoLKfnukgA",
      email: "test5@test.com",
      refreshToken: "AIwUaOlLPXcjtl_rsmuH6t6WU3tPHG9I0kpvit9RvU3xT0IpN7D4-LYAS0a6_GOqvBJAHDlSggNWWXCEoRoXbVqa_kTYSd_QAMuUqXERhYGG8Fm-VeDGIw9Ik7RnTFlTW45Hp7WM5C5WVj70TW12I3M7KfrRZS7nA6YXRQZRaFu7Ee0yFcHgcte9ZJlAi5_mJ13TYKzY-1--x7BdB_JPpEuQTWmRreMpxS_-KvSMPcvSsXd4XhlPuGc",
      expiresIn: "3600",
      localId: "U1XWDxE6y8PU4ADGK65DUSvfznS2"
    }

    httpSpy.post.and.returnValue(of(resData));

    authService.signup(resData.email, "va01mk").subscribe(() => {
      const userInfo = localStorage.getItem('userData');
      const parsedUserInfo = JSON.parse(userInfo);
      console.log("hi3", userInfo)
      expect(parsedUserInfo.id).toBe(resData.localId);
    });

  });

  it('should login the user', () => {

    // const loginData = {
    //   email: 'test@test.com',
    //   password: "va01mk"
    // }

    const mockResponse = {
      "kind": "identitytoolkit#VerifyPasswordResponse",
      "localId": "3cG2BgLf8rfMNM1KTB9LDU4xtxk2",
      "email": "test@test.com",
      "displayName": "",
      "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjcxMTQzNzFiMmU4NmY4MGM1YzYxNThmNDUzYzk0NTEyNmZlNzM5Y2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctY291cnNlLXJlY2lwZS1ib29rLTItYzAwNGYiLCJhdWQiOiJuZy1jb3Vyc2UtcmVjaXBlLWJvb2stMi1jMDA0ZiIsImF1dGhfdGltZSI6MTY0MDY2Mzc4MCwidXNlcl9pZCI6IjNjRzJCZ0xmOHJmTU5NMUtUQjlMRFU0eHR4azIiLCJzdWIiOiIzY0cyQmdMZjhyZk1OTTFLVEI5TERVNHh0eGsyIiwiaWF0IjoxNjQwNjYzNzgwLCJleHAiOjE2NDA2NjczODAsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.kJXPuvqB5zwDf6JT3RDPgzju9G-fwnYJ6EzfOp3lUzNbXUPS6vCVSr6dOJXkNDVJQTDdrZsj-FICWfZAxx4pDesanFLfaxgrD1-fbMWUnWi3WJnLlnOLiXVW0qdte3beOBSJyn48pfO_69gvc1uvuiHoMpKBAnjoFXxmEl-ZLtRMIUwHBnb7CNtMbvFrO7MS-6nGe_xw06BXemBtcsRQ34Pfp0loKOVofN9Fnjh-PjPFkKE8vrYVlaWZ0LUoT3k4aMHXcFPv461svO89jEN5PJyYCejymaLIjRcWu6qajTOxQ-KCOGpmVoKAKJm6FgRrlOq_Ay4ePyvnMe-J-AR5HQ",
      "registered": true,
      "refreshToken": "AFxQ4_psp7SquM1y4ibfDO4szhOM7BZHpaVEdKvFEttE5hcOjmQnHDw4bXo79PyJKR9mclMKOWzYerOTWW_v01gVmOcaberxZkMFmrgZd-4hwFA5hr4OsFj5megAtaSF_Os6TPUyK41HMD8k5STA7I6ttlMkS8WYmu6PTdQ_TgPoEexhTcc12Is11e-aJD-wqFDScTQpet3hHFf47etOTUOQDRvqnmT7M1YRy23Y4V6nnLspOC38vfw",
      "expiresIn": "3600"
    }

    spyOn(authService, 'logout').and.callFake(()=>{});
    httpSpy.post.and.returnValue(of(mockResponse));

    authService.login("test@test.com", "va01mk").subscribe((data) => {
      // console.log("hi", data);
      expect(data.email).toEqual(mockResponse.email);
      expect(data.registered).toBeTruthy();
    });
  });

  it('should handle error in login', () => {
    httpSpy.post.and.returnValue(of(new Error('EMAIL_EXISTS')));
    authService.login("asfsdf", "asdf").subscribe(result => {
      // Handle result
      console.log(result)
    },
    error => {
      // console.log("hi8", error);
      expect(error).toBe("EMAIL_EXISTS");
    });
    // expect(() => authService.login("test@test.com", "va01mk")).toThrow(new Error("EMAIL_EXISTS"));
  });

  it('should auto-login', () => {
    spyOn(authService.user, 'next');
    const mockUserData = {
      email: "test@test.com",
      id: "3cG2BgLf8rfMNM1KTB9LDU4xtxk2",
      _token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNhYTE0OGNkMDcyOGUzMDNkMzI2ZGU1NjBhMzVmYjFiYTMyYTUxNDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmctY291cnNlLXJlY2lwZS1ib29rLTItYzAwNGYiLCJhdWQiOiJuZy1jb3Vyc2UtcmVjaXBlLWJvb2stMi1jMDA0ZiIsImF1dGhfdGltZSI6MTY0MzA4MzEyNSwidXNlcl9pZCI6IjNjRzJCZ0xmOHJmTU5NMUtUQjlMRFU0eHR4azIiLCJzdWIiOiIzY0cyQmdMZjhyZk1OTTFLVEI5TERVNHh0eGsyIiwiaWF0IjoxNjQzMDgzMTI1LCJleHAiOjE2NDMwODY3MjUsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QHRlc3QuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.DNi-9cLCYtJMuDWr753yunYaELQ3iKelAL9e89TDVSc_yu-N_679pW4mKAEAXdP0GG30u8PoGPRwaZhPtiUMJ1kjmcUYf59l_uAGJ8ObdbO6Leomdpbr7R6R7Qdgt7PND2xVSluYDpGrKE1YtijXmib6n_F50h6c-2VH3QyvfLQjYLIlAk1l3KtOwvdUtqYpKBbwVSaA8T1AUy2pdi8r2SRhYy3094ZsCaPGBLTKdG3VvyKDN3k78vmHycW2007H68M_2pUgHBSJEOPWKsXRZc4SM8THDFhoY3sCu1Au7HYHtbriiLAzlUSroBmENERY2LCjU2Lx8eM4TxcYiUx4jw",
      _tokenExpirationDate: new Date(new Date().getTime()+1000)
    }
    localStorage.setItem('userData', JSON.stringify(mockUserData));
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    // console.log("hel", mockData);
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    authService.autoLogin();

    expect(authService.user.next).toHaveBeenCalledWith(loadedUser);
    // expect(true).toBe(true);
  });

  it('should return undefined if there is no userData', () => {
    localStorage.removeItem('userData');

    const autoLoginData = authService.autoLogin();

    expect(autoLoginData).toBeUndefined();
  });

  it('should logout', () => {
    spyOn(authService.user, 'next');
    spyOn(window, 'setTimeout').and.callThrough();
    spyOn(global, 'clearTimeout').and.callThrough();
    // spyOn(window, 'clearTimeout').and.callThrough();
    // authService.tokenExpirationTimer = 10;
    // spyOn(routerMock, 'navigate');
    authService.logout();

    expect(authService.user.next).toHaveBeenCalledWith(null);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/auth']);
    expect(localStorage.getItem('userData')).toBe(null);
    // tick(3601);
    // expect(clearTimeout).toHaveBeenCalled();
  });

  it('should auto-logout', fakeAsync(() => {
    spyOn(authService, 'logout');

    authService.autoLogout(1000);
    tick(2000);

    expect(authService.logout).toHaveBeenCalled();
  }));
})

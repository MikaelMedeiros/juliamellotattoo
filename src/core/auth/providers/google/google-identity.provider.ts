import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { GoogleUser } from "../../models/google-user";

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleIdentityProvider {

  login(): Promise<GoogleUser> {
console.log(environment.googleClientId);
    return new Promise((resolve, reject) => {

      google.accounts.id.initialize({
        client_id: environment.googleClientId,

        callback: (response: any) => {
console.log(response);
          try {

            const payload = JSON.parse(
              atob(response.credential.split('.')[1])
            );

            resolve({
              idToken: response.credential,
              email: payload.email,
              name: payload.name,
              picture: payload.picture
            });

          } catch (e) {
            reject(e);
          }

        }
      });

      google.accounts.id.prompt((notification: any) => {

        console.log(notification);

      });
    });
  }
}
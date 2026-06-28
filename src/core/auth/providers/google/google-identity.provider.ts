import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { GoogleUser } from "../../models/google-user";

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleIdentityProvider {

  login(): Promise<GoogleUser> {

    return new Promise((resolve, reject) => {

      const client = google.accounts.oauth2.initTokenClient({
        client_id: environment.googleClientId,
        scope: 'openid email profile',

        callback: async (response: any) => {

          if (response.error) {
            reject(response);
            return;
          }

          try {

            const user = await fetch(
              'https://www.googleapis.com/oauth2/v3/userinfo',
              {
                headers: {
                  Authorization: `Bearer ${response.access_token}`
                }
              }
            ).then(r => r.json());

            resolve({
              accessToken: response.access_token,
              email: user.email,
              name: user.name,
              picture: user.picture
            });

          } catch (error) {
            reject(error);
          }
        }
      });

      client.requestAccessToken();
    });
  }
}
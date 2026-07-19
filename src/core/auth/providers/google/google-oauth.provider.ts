import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

declare const google: any;

@Injectable({
  providedIn: "root",
})
export class GoogleOAuthProvider {

  login(): Promise<string> {

    return new Promise((resolve, reject) => {

      const client = google.accounts.oauth2.initCodeClient({

        client_id: environment.googleClientId,

        scope: [
          "openid",
          "email",
          "profile"
        ].join(" "),

        ux_mode: "popup",

        callback: (response: any) => {

          if (response.error) {
            reject(response);
            return;
          }

          resolve(response.code);

        }

      });

      client.requestCode();

    });

  }

}
export interface auth {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_callback_confirmed: "true";
    url: string;
}

export interface callback {
    oauth_token: string;
    oauth_token_secret: string;
    oauth_verifier: string;
}
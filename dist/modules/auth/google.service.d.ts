type GoogleResponse = {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    locale: string;
    name: string;
    picture: string;
    verified_email: boolean;
} | {
    error: {
        code: number;
        message: string;
        status: string;
    };
};
export declare class GoogleService {
    getUserData(token: string): Promise<GoogleResponse>;
}
export {};

export interface IUser {
    email: string;
    password: string;
    rePassword?: string;
    name: string;
    sex: string;
    birth: string;
    phoneNumber: string;
    provider: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface ILoggedinUser {
    id: number;
    email: string;
    password?: string;
    name: string;
    sex: string;
    birth: string;
    phoneNumber: string;
    provider: string;
}

export interface IAddProfile {
    id: number;
    sex: string;
    birth: string;
    phoneNumber: string;
}

export interface IUpdateProfile {
    phoneNumber?: string;
    birth?: string;
    password?: string;
}

export interface IChangePw {
    oldPassword?: string;
    password?: string;
    newPassword?: string;
}

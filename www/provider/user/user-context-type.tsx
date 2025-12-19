export enum UserRoleEnum {
    admin = "admin",
    user = "user",
}

export interface UserType {
    id: string;
    login: string;
    role: UserRoleEnum;
}

export interface UserContextType {
    isInProgressAutoLogin: boolean;
    setUser: (user: UserType) => void;
    user: UserType;
}

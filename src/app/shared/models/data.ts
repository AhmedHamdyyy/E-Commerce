export interface signUpData extends logInData {
    name: string;
    // email:string;
    // password:string;
    rePassword: string;
    phone: string;
}

export interface logInData extends forgetPasswordData {
    password: string;
}

export interface forgetPasswordData {
    email: string;
}

export interface resetCodeData {
    resetCode: string;
}

export interface resetNewPasswordData extends forgetPasswordData {
    newPassword: string;
}

// index signature Sample
export interface x {
    [key: string]: string | number | boolean
}

export interface ShippingAddressData {
    details: string;
    phone: string;
    city: string;
}
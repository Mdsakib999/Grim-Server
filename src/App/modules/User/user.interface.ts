


export type TUser = {
    userName: string,
    password: string
    role?: string
    ref?: string,
    dollar?: number
}

export const UserRole = {
    customer: 'customer',
    admin: 'admin',
    superAdmin: 'superAdmin'
} as const
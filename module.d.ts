declare namespace NodeJS {
    export interface ProcessEnv {
        DB_NAME: string
        DB_USER: string
        DB_PASS: string
        DB_HOST: string
        HASHING_ROUNDS: string
        JWT_SECRET: string
        API_AUDIENCE: string
        API_ISSUER: string
    }
}
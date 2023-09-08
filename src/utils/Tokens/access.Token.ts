import {sign} from 'jsonwebtoken'
import { UserEntity } from 'src/user/entities/user.entity'

export interface createPayload{
    id:string
    name:string
    roles:string[]
    gender:string


}
export interface returnTokens{
        accessToken:string
    }


export const createTokens=(user:UserEntity):returnTokens=>{

    const payload:createPayload={
        id:user.id,
        name:user.firstName+" "+user.lastName,
        roles:user.roles,
        gender:user.gender
    }
    const accessToken=sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIN})

    return {
        accessToken
    }
}
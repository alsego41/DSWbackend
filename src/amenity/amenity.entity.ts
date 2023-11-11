import {  getModelForClass, prop } from '@typegoose/typegoose'

export class amenityclass{
    @prop({ required: true})
    public nameAmerity?: string
}

export const ameritymodel = getModelForClass(amenityclass)
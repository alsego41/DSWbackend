import {  getModelForClass, prop } from '@typegoose/typegoose'

export class userTypeclass{
    @prop({ required: true })
	public nameType?: String
}

export const userTypeModel = getModelForClass(userTypeclass)
import { Ref, getModelForClass, index, prop } from '@typegoose/typegoose'

export class userTypeclass{
    @prop({ required: true })
	public nametype?: String
}

export const userTypeModel = getModelForClass(userTypeclass)
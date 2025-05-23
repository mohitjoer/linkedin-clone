import { IUser } from "../../types/user";
import { comment, IComment } from "./comment";
import mongoose , { Schema , Document , models , Model } from "mongoose";

export interface IPostBase {
    user: IUser ;
    text:string;
    imageUrl?:string;
    comments?: IComment[];
    likes?:string[];
}


export interface IPost extends IPostBase , Document{
    createdAt : Date ;
    updatedAt : Date ;
}

interface IPostMethods {
    likePost( userId:string):Promise <void>;
    unlikePost( userId:string):Promise <void>;
    commentOnPost( userId:string):Promise <void>;
    getAllComments():Promise<IComment[]>;
    removePost():Promise<void>;
}


interface IPostStatics {
    getAllPost():Promise<IPostDocument[]>;
}


export interface IPostDocument extends IPost , IPostMethods{}
interface IPostModel extends IPostStatics , Model<IPostDocument>{}


const PostSchema = new Schema<IPostDocument>({
    user:{
        userId: { type: String, required: true },
            userImage: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: {type:String},
    comments: {type:[Schema.Types.ObjectId],ref:"comment",default:[]},
    likes:{type:[String]},

})
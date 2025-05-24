import { IUser } from "../../types/user"
import mongoose , { Schema , Document , models , Model } from "mongoose";

export interface ICommentBase{
    user: IUser ;
    text: string ;
};

export interface IComment extends Document , ICommentBase{
    createdAt: Date ;
    updatedAt: Date ;
};

const commentSchema = new Schema<IComment>(
    {
        user:{
            userId: { type: String, required: true },
            userImage: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String },
        },
        text: { type: String, required: true },
    },
    {
        timestamps:true,
    }
);


const CommentModel = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);
export { CommentModel as Comment };




import { IUser } from "../../types/user";
import { Comment, IComment, ICommentBase } from "./comment";
import mongoose , { Schema , Document , models , Model, Types } from "mongoose";

export interface IPostBase {
    user: IUser ;
    text:string;
    imageUrl?:string;
    comments?: IComment[];
    likes?:string[];
};


export interface IPost extends IPostBase , Document{
    createdAt : Date ;
    updatedAt : Date ;
};

interface IPostMethods {
    likePost( userId:string):Promise <void>;
    unlikePost( userId:string):Promise <void>;
    commentOnPost( userId:string):Promise <void>;
    getAllComments():Promise<IComment[]>;
    removePost():Promise<void>;
};


interface IPostStatics {
    getAllPost():Promise<IPostDocument[]>;
};


export interface IPostDocument extends IPost , IPostMethods{}
interface IPostModel extends IPostStatics , Model<IPostDocument>{
    getAllPosts(): unknown;
}


const PostSchema = new Schema<IPostDocument>({
    user:{
        userId: { type: String, required: true },
            userImage: { type: String, required: true },
            firstName: { type: String, required: true },
            lastName: { type: String },
    },
    text: { type: String, required: true },
    imageUrl: {type:String},
    comments: {type:[Schema.Types.ObjectId], ref:"comment",default:[]},
    likes:{type:[String]},
},{
    timestamps:true ,
});

PostSchema.methods.likePost = async function (userId:string) {
    try{
        this.likes.updateOne({ $addToSet:{ likes:userId }});
    }catch(error){
         console.log(`Failed to like the post: ${error}`);
    } 
};

PostSchema.methods.unlikePost = async function (userId:string) {
    try{
        this.likes.updateOne({ $pull:{ likes:userId }});
    }catch(error){
        console.log(`Failed to unlike the post: ${error}`);
    }
};


PostSchema.methods.removePost = async function () {
    try{
        await this.model("post").deleteone({_id:this._id});
    }catch(error){
        console.log(`Failed to remove the post: ${error}`);
    } 
};

PostSchema.methods.commentOnPost = async function (commentToAdd : ICommentBase){
    try {
        const comment = await Comment.create(commentToAdd);
        this.comments.push(comment._id);
        await this.save();
    } catch (error) {
        console.log(`Failed to add comment: ${error}`);
    }
};


PostSchema.methods.getAllComments= async function () {
    try {
       await this.populate({
        path:"comments",
        options:{sort:{createdAt: -1}},
       });
       return this.comments;
    } catch (error) {
        console.log(`Failed to get all comments: ${error}`);
    }
};

PostSchema.statics.getAllPost=async function (){
    try {
        const posts = await this.find()
            .sort({createdAt:-1})
            .populate({
                path:"comments",

                options :{sort:{createdAt:-1}},
            }).lean();

            return posts.map((post : IPostDocument)=>({
                ...post,
                _id: (post._id as Types.ObjectId).toString(),
                comments : post.comments?.map ( (comment : IComment) =>({
                    ...comment,
                    _id: (comment._id as Types.ObjectId).toString(),
                })),
            }))
    } catch (error) {
        console.log(`error to get all comments: ${error}`);
    }
}


export const Post = models.Post as IPostModel || mongoose.model <IPostDocument ,IPostModel>("Post",PostSchema);

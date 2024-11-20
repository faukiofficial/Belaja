import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./userModel";

interface IComment extends Document {
    user: IUser;
    question: string;
    questionReplies?: IComment[];
}

interface IReview extends Document {
    user: IUser;
    rating: number;
    comment: string;
    commentReplies?: IComment[];
}

interface ILink extends Document {
    title: string;
    url: string;
}

interface ICourseData extends Document {
    title: string;
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    videoSection: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestion: string;
    questions: IComment[];
}

interface ICourse extends ICourseData {
    name: string;
    description: string;
    price: number;
    estimatedPrice?: number;
    category: string;
    thumbnail: object;
    tags: string;
    level: string;
    demoUrl: string;
    benefits: {title: string}[];
    prerequisites: {title: string}[];
    reviews: IReview[];
    courseData: ICourseData[];
    totalVideos?: number;
    ratings?: number;
    purchased?: number;
}

const reviewSchema: Schema<IReview> = new Schema({
    user: Object,
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
    commentReplies: [Object]
})

const linkSchema: Schema<ILink> = new Schema({
    title: String,
    url: String
})

const commentSchema: Schema<IComment> = new Schema({
    user: Object,
    question: String,
    questionReplies: [Object]
})

const courseDataSchema: Schema<ICourseData> = new Schema({
    title: String,
    description: String,
    videoUrl: String,
    videoSection: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema]
})

const courseSchema: Schema<ICourse> = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    estimatedPrice: {
        type: Number,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    thumbnail: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    tags: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    demoUrl: {
        type: String,
        required: true
    },
    benefits: [{title: String}],
    prerequisites: [{title: String}],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    totalVideos: {
        type: Number,
    },
    ratings: {
        type: Number,
        default: 0
    },
    purchased: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const CourseModel: Model<ICourse> = mongoose.model<ICourse>("Course", courseSchema);
export default CourseModel
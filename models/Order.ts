import mongoose, {Schema, model, models} from "mongoose";

export const IMAGE_VARIANTS = {
    SQUARE: {
        type:"SQUARE",
        dimesions:{ width: 1200, height: 1200},
        label:"Sqaure (1:1)",
        aspectRatio: "1:1",
    },
    WIDE: {
        type:"WIDE",
        dimesions:{ width: 1920, height: 1080},
        label:"Wide (16:9)",
        aspectRatio: "16:9",
    },
    PORTRAIT: {
        type:"PORTRAIT",
        dimensions:{ width: 1080, height: 1440},
        label: "Portrait (3:4)",
        aspectRation: "3:4",
    }
} as const;

const orderSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: "User", required:true},
    productId: {type: Schema.Types.ObjectId, ref: "Product", required:true},
    variant:{
        type:{
            type: String,
            required: true,
            enum: ["SQUARE", "WIDE", "PORTRAIT"]
        },
        price: {type: Number, required: true},
        license: {
            type: Number, 
            required: true,
            enum: ["personal","commercial"]
        },
    },
    razorpayOrderId: {
        type:String,
        required: true
    },
    razorpayPaymentId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "completed", "failed"], default: "pending"
    },
    downloadUrl: {
        type: String
    },
    previewUrl: {
        type: String
    }
},{timestamps: true});

const Order = models?.Order || model("Order", orderSchema)

export default Order;
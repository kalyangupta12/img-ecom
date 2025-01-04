import mongoose, {Schema, model, models} from "mongoose";

const imageVariantSchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"]
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    licnese: {
        type: String,
        required: true,
        enum: ["personal","commercial"]
    }
})

const productSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    variants: [imageVariantSchema]
},{timestamps: true})

const Product = models?.Product || model("Product", productSchema)

export default productSchema;

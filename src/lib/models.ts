
import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
    {
        id: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        body: { type: String, required: true },
        size : { type: String, required: true },
        wrapper: { type: String, required: true },
        brand: { type: String, required: true },
        priceForSingle: { type: Number, required: true },
        priceForBox: { type: Number, required: true },
        singleInStock: { type: Number, required: true },
        boxInStock: { type: Number, required: true },
        img: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const userSchema = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true, max: 50 },
    password: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
})

export const Product = mongoose.models?.Product || mongoose.model('Product', productsSchema);
export const User = mongoose.models?.User || mongoose.model('User', userSchema);
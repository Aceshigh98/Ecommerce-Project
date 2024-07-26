
import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        imageUrl: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const userSchema = new mongoose.Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
}, {
    timestamps: true
})

export const Product = mongoose.models?.Product || mongoose.model('Product', productsSchema);
export const User = mongoose.models?.User || mongoose.model('User', userSchema);
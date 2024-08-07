
import { connectDb } from "@/src/lib/database";
import { User, Product} from "@/src/lib/models"
import { unstable_noStore } from "next/cache";
import {convertId} from "@/src/utils/utils"


// static data
export const cigarBrands = {
        category: "Brand",
        type:["Buffalo Trace", "Cohiba", "Oliva", "La Gloria Cubana"]
};
export const cigarSize = {
    category: "Size",
    type:["Robusto", "Churchill", "Toro"]
};
export const cigarWrapper = {
    category: "Wrapper",
    type:["Conneticut", "Equadorian Sumatra", "Maduro", "USA Conneticut"]
};


// server actions
export const getSignatureProducts = async () => {
    try {
        await connectDb();
        const signatureProducts = await Product.find({signature: true});
        return signatureProducts;
    } catch (error) {
        throw new Error("Failed to fetch signature products!");
    }
}

export const getAllProducts = async () => {
    try {
        await connectDb();
        const products = await Product.find().lean();
        return  convertId(products);
    } catch (error) {
        throw new Error("Failed to fetch all products!");
    }
}

export const getProduct = async (id: string) => {
    unstable_noStore();
    try{
        await connectDb();
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        throw new Error("Failed to fetch product!");
    }
}

export const getAllUsers = async () => {
    unstable_noStore();
    try{
        await connectDb();
        const users = await User.find().lean();
        return convertId(users);
    } catch (error) {
        throw new Error("Failed to fetch all users!");
    }
}

export const getUser = async (id: number) => {
    unstable_noStore();
    try{
        await connectDb();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error("Failed to fetch user!");
    }
}









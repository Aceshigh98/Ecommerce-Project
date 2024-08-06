
import { connectDb } from "@/src/lib/database";
import { User, Product} from "@/src/lib/models"
import { unstable_noStore } from "next/cache";



//  const signatureProducts = [
//     {
//         id: 1,
//         title: "Cohiba Cigars",
//         body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
//         priceForSingle: 9.99,
//         priceForBox: 99.99, 
//         img: "/sigasset4.png"
//     },
//     {
//         id: 2,
//         title: "Buffalo Trace Cigars",
//         body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
//         priceForSingle: 9.99,
//         priceForBox: 99.99, 
//         img: "/sigasset3.png"
//     },
//     {
//         id: 3,
//         title: "LaGloria Series R Cigars",
//         body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//         priceForSingle: 9.99,
//         priceForBox: 99.99, 
//         img: "/sigasset2.png"
//     },
//     {
//         id: 4,
//         title: "Oliva Cigars",
//         body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//         priceForSingle: 9.99,
//         priceForBox: 99.99, 
//         img: "/sigasset1.png"
//     },
//     ];

//      const productsStore = [
//         {
//             id: 1,
//             title: "Cohiba Cigars",
//             size: "Torpedo",
//             wrapper: "Maduro",
//             brand: "Cohiba",
//             body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset4.png"
//         },
//         {
//             id: 2,
//             title: "Buffalo Trace Cigars",
//             size: "Corona",
//             wrapper: "Maduro",
//             brand: "Buffalo Trace",
//             body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset3.png"
//         },
//         {
//             id: 3,
//             title: "LaGloria Series R Cigars",
//             size: "Toro",
//             wrapper: "Conneticut",
//             brand: "La Gloria Cubana",
//             body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset2.png"
//         },
//         {
//             id: 4,
//             title: "Oliva Cigars",
//             size: "Robusto",
//             wrapper: "USA Conneticut",
//             brand: "Oliva",
//             body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset1.png"
//         },
//         {
//             id: 5,
//             title: "Cohiba Cigars",
//             size: "Gordo",
//             wrapper: "USA Conneticut",
//             brand: "Cohiba",
//             body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset4.png"
//         },
//         {
//             id: 6,
//             title: "Buffalo Trace Cigars",
//             size: "Robusto",
//             wrapper: "USA Conneticut",
//             brand: "Buffalo Trace",
//             body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset3.png"
//         },
//         {
//             id: 7,
//             title: "LaGloria Series R Cigars",
//             size: "Robusto",
//             wrapper: "USA Conneticut",
//             brand: "La Gloria Cubana",
//             body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 6.99,
//             priceForBox: 99.99, 
//             img: "/sigasset2.png"
//         },
//         {
//             id: 8,
//             title: "Oliva Cigars",
//             size: "Churchill",
//             wrapper: "Conneticut",
//             brand: "Oliva",
//             body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset1.png"
//         },
//         {
//             id: 9,
//             title: "Cohiba Cigars",
//             size: "Churchill",
//             wrapper: "Conneticut",
//             brand: "Cohiba",
//             body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
//             priceForSingle: 15.00,
//             priceForBox: 99.99, 
//             img: "/sigasset4.png"
//         },
//         {
//             id: 10,
//             title: "Buffalo Trace Cigars",
//             size: "Churchill",
//             wrapper: "Ecuadorian Sumatra",
//             brand: "Buffalo Trace",
//             body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
//             priceForSingle: 17.00,
//             priceForBox: 99.99, 
//             img: "/sigasset3.png"
//         },
//         {
//             id: 11,
//             title: "LaGloria Series R Cigars",
//             size: "Robusto",
//             wrapper: "Ecuadorian Sumatra",
//             brand: "La Gloria Cubana",
//             body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset2.png"
//         },
//         {
//             id: 12,
//             title: "Oliva Cigars",
//             size: "Toro",
//             wrapper: "Ecuadorian Sumatra",
//             brand: "Oliva",
//             body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
//             priceForSingle: 9.99,
//             priceForBox: 99.99, 
//             img: "/sigasset1.png"
//         },
//         ];
    
        export const cigarBrands = {
        category: "Brand",
        type:["Buffalo Trace", "Cohiba", "Oliva", "La Gloria Cubana"]};
    
        export const cigarSize = {
        category: "Size",
        type:["Robusto", "Churchill", "Toro"]}

        export const cigarWrapper = {
        category: "Wrapper",
        type:["Conneticut", "Equadorian Sumatra", "Maduro", "USA Conneticut"]}


// export const getSignatureProducts = () => {
//     return signatureProducts;
// }

// export const getStoreProducts = () => {
//     return productsStore;
// }

export const getSignatureProducts = async () => {
    try {
        connectDb();
        const signatureProducts = await Product.find({signature: true});
        return signatureProducts;
    } catch (error) {
        throw new Error("Failed to fetch signature products!");
    }
}

export const getAllProducts = async () => {
    try {
        connectDb();
        const products = await Product.find();
        return products;
    } catch (error) {
        throw new Error("Failed to fetch all products!");
    }
}

export const getProduct = async (id: number) => {
    try{
        connectDb();
        const product = await Product.findById(id);
        return product;
    } catch (error) {
        throw new Error("Failed to fetch product!");
    }
}

export const getAllUsers = async () => {
    unstable_noStore();
    try{
        connectDb();
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("Failed to fetch all users!");
    }
}

export const getUser = async (id: number) => {
    unstable_noStore();
    try{
        connectDb();
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new Error("Failed to fetch user!");
    }
}








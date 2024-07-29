
const user = [
    {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com"
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane@gmail.com"
    },
]

export const products = [
    {
        id: 1,
        title: "Cohiba Cigars",
        body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
        priceForSingle: 9.99,
        priceForBox: 99.99, 
        img: "/sigasset4.png"
    },
    {
        id: 2,
        title: "Buffalo Trace Cigars",
        body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
        priceForSingle: 9.99,
        priceForBox: 99.99, 
        img: "/sigasset3.png"
    },
    {
        id: 3,
        title: "LaGloria Series R Cigars",
        body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
        priceForSingle: 9.99,
        priceForBox: 99.99, 
        img: "/sigasset2.png"
    },
    {
        id: 4,
        title: "Oliva Cigars",
        body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
        priceForSingle: 9.99,
        priceForBox: 99.99, 
        img: "/sigasset1.png"
    },
    ];

    export const productsStore = [
        {
            id: 1,
            title: "Cohiba Cigars",
            body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset4.png"
        },
        {
            id: 2,
            title: "Buffalo Trace Cigars",
            body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset3.png"
        },
        {
            id: 3,
            title: "LaGloria Series R Cigars",
            body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset2.png"
        },
        {
            id: 4,
            title: "Oliva Cigars",
            body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset1.png"
        },
        {
            id: 1,
            title: "Cohiba Cigars",
            body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset4.png"
        },
        {
            id: 2,
            title: "Buffalo Trace Cigars",
            body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset3.png"
        },
        {
            id: 3,
            title: "LaGloria Series R Cigars",
            body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset2.png"
        },
        {
            id: 4,
            title: "Oliva Cigars",
            body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset1.png"
        },
        {
            id: 1,
            title: "Cohiba Cigars",
            body : "Cohiba cigars are a premium brand of cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of premium tobaccos from around the world.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset4.png"
        },
        {
            id: 2,
            title: "Buffalo Trace Cigars",
            body: "Buffalo Trace Cigars are a great choice for those who enjoy a smooth, flavorful smoke.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset3.png"
        },
        {
            id: 3,
            title: "LaGloria Series R Cigars",
            body: "La Gloria Cubana Serie R cigars are full-bodied cigars that are handcrafted in the Dominican Republic. These cigars are made with a blend of Nicaraguan and Dominican tobaccos. that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset2.png"
        },
        {
            id: 4,
            title: "Oliva Cigars",
            body: "Oliva cigars are a premium brand of cigars that are handcrafted in Nicaragua. These cigars are made with a blend of tobaccos that are wrapped in a rich Ecuadorian Sumatra wrapper.",
            priceForSingle: 9.99,
            priceForBox: 99.99, 
            img: "/sigasset1.png"
        },
        ];

export const getPosts = () => {
    return products;
}

export const getPost = (id: number) => {
    return products.find(post => post.id === id);
}

export const getUser = (id: number) => {
    return user.find(user => user.id === id);
}




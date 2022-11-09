interface ProductsResponse {
    products: Array<Product>
}

interface Product { 
    id: number;
    sku: string;
    title: string;
    description: string;
    availableSizes: Size;
    style: string;
    price: number;
    installments: number;
    currencyId: string;
    currencyFormat: string;
    isFreeShipping: boolean;
    image: string;
}

interface Size {
    S: number;
    G: number;
    GG: number;
    GGG: number;
}
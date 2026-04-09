import { getProductList } from "../API/product/productListApi";
import { layout } from "../productCard/layout.js";

async function sunglasses(){
    const getApi = await getProductList("sunglasses");
    layout(getApi);
}

sunglasses();
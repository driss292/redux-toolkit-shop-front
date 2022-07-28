import React from "react";
import { useGetAllProductsQuery } from "../slices/productsApi";
import Product from "./Product";
// import { useSelector } from "react-redux";

const Home = () => {
    // Fetch data with createAsyncThunk
    // const { items, status } = useSelector((state) => state.products);
    // const auth = useSelector((state) => state.auth);
    // console.log(auth);

    // Fetch data with RTK Query
    const { data, error, isLoading } = useGetAllProductsQuery();

    return (
        <div className="home-container">
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>An error occured...</p>
            ) : (
                <>
                    <h2>New arrivals</h2>
                    <div className="products">
                        {data?.map((product) => (
                            <Product product={product} key={product.id} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;

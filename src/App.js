import { useEffect, useState } from "react";
import { getReviews } from "./api";
import ReviewList from "./components/ReviewList";
// import mockItems from "./mock.json";

function App() {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");

    const handleBestClick = () => setOrder("rating");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (orderQuery) => {
        const { reviews } = await getReviews(orderQuery);
        setItems(reviews);
    };

    useEffect(() => {
        handleLoad(order);
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>별점순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
        </div>
    );
}

export default App;

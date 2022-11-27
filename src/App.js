import { useState } from "react";
import ReviewList from "./components/ReviewList";
import items from "./mock.json";

function App() {
    const [order, setOrder] = useState("createdAt");
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");

    const handleBestClick = () => setOrder("rating");

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>별점순</button>
            </div>
            <ReviewList items={sortedItems} />
        </div>
    );
}

export default App;

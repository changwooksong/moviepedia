import { useEffect, useState } from "react";
import { getReviews } from "./api";
import ReviewList from "./components/ReviewList";
// import mockItems from "./mock.json";
const LIMIT = 6;

function App() {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffSet] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");

    const handleBestClick = () => setOrder("rating");

    const handleDelete = (id) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
    };

    const handleLoad = async (options) => {
        const { reviews, paging } = await getReviews(options);

        if (options.offset === 0) {
            setItems(reviews);
        } else {
            setItems([...items, ...reviews]);
        }

        setOffSet(options.offset + reviews.length);
        setHasNext(paging.hasNext);
    };

    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order]);

    return (
        <div>
            <div>
                <button onClick={handleNewestClick}>최신순</button>
                <button onClick={handleBestClick}>별점순</button>
            </div>
            <ReviewList items={sortedItems} onDelete={handleDelete} />
            {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
        </div>
    );
}

export default App;

import { useCallback, useEffect, useState } from "react";
import { createReview, deleteReview, getReviews, updateReview } from "./api";
import LocaleSelect from "./components/LocaleSelect";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import { LocaleProvider } from "./contexts/LocaleContext";
import useAsynce from "./hooks/useAsync";
// import mockItems from "./mock.json";

const LIMIT = 6;

function App() {
    const [items, setItems] = useState([]);
    const [order, setOrder] = useState("createdAt");
    const [offset, setOffSet] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [isLoading, loadingError, getReviewAsync] = useAsynce(getReviews);
    // const [loadingError, setLoadingError] = useState(null);
    const sortedItems = items.sort((a, b) => b[order] - a[order]);

    const handleNewestClick = () => setOrder("createdAt");

    const handleBestClick = () => setOrder("rating");

    const handleDelete = async (id) => {
        const result = await deleteReview(id);
        if (!result) return;

        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const handleLoad = useCallback(
        async (options) => {
            let result = await getReviewAsync(options);
            if (!result) return;

            // try {
            //     setIsLoading(true);
            //     setLoadingError(null);
            //     result = await getReviews(options);
            // } catch (error) {
            //     setLoadingError(error);
            //     return;
            // } finally {
            //     setIsLoading(false);
            // }

            const { reviews, paging } = result;

            if (options.offset === 0) {
                setItems(reviews);
            } else {
                setItems((prevItems) => [...prevItems, ...reviews]);
            }

            setOffSet(options.offset + reviews.length);
            setHasNext(paging.hasNext);
        },
        [getReviewAsync]
    );

    const handleLoadMore = () => {
        handleLoad({ order, offset, limit: LIMIT });
    };

    const handleCreateSubmitSuccess = (review) => {
        setItems((prevItems) => [review, ...prevItems]);
    };

    const handleUpdateSuccess = (review) => {
        setItems((prevItems) => {
            const splitIdx = prevItems.findIndex(
                (item) => item.id === review.id
            );
            return [
                ...prevItems.slice(0, splitIdx),
                review,
                ...prevItems.slice(splitIdx + 1),
            ];
        });
    };

    useEffect(() => {
        handleLoad({ order, offset: 0, limit: LIMIT });
    }, [order, handleLoad]);

    return (
        <LocaleProvider defaultValue="ko">
            <div>
                <LocaleSelect />
                <div>
                    <button onClick={handleNewestClick}>최신순</button>
                    <button onClick={handleBestClick}>별점순</button>
                </div>
                <ReviewForm
                    onSubmit={createReview}
                    onSubmitSuccess={handleCreateSubmitSuccess}
                />
                <ReviewList
                    items={sortedItems}
                    onDelete={handleDelete}
                    onUpdate={updateReview}
                    onUpdateSuccess={handleUpdateSuccess}
                />
                {hasNext && (
                    <button disabled={isLoading} onClick={handleLoadMore}>
                        더 보기
                    </button>
                )}
                {loadingError?.message && <span>{loadingError.message}</span>}
            </div>
        </LocaleProvider>
    );
}

export default App;

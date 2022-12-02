import { useState } from "react";
import useTranslate from "../hooks/useTranslate";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import "./ReviewList.css";

const formatDate = (value) => {
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
};

const ReviewListItem = ({ item, onDelete, onEdit }) => {
    const t = useTranslate();
    const handleDeleteClick = () => onDelete(item.id);

    const handleEditClick = () => {
        onEdit(item.id);
    };

    return (
        <div className="ReviewListItem">
            <img
                src={item.imgUrl}
                alt={item.title}
                className="ReviewListItem-img"
            />
            <div>
                <h1>{item.title}</h1>
                <Rating value={item.rating} />
                <p>{formatDate(item.createdAt)}</p>
                <p>{item.content}</p>

                <button onClick={handleEditClick}>{t("edit button")}</button>
                <button onClick={handleDeleteClick}>
                    {t("delete button")}
                </button>
            </div>
        </div>
    );
};

const ReviewList = ({ items, onDelete, onUpdate, onUpdateSuccess }) => {
    const [editingId, setEditingId] = useState(null);

    const handleCancle = () => setEditingId(null);

    return (
        <ul>
            {items.map((item) => {
                if (item.id === editingId) {
                    const { id, imgUrl, title, rating, content } = item;
                    const initialValues = { title, rating, content };

                    const handleSubmit = (formData) => onUpdate(id, formData);

                    const handleSubmitSuccess = (review) => {
                        onUpdateSuccess(review);
                        setEditingId(null);
                    };

                    return (
                        <li key={item.id}>
                            <ReviewForm
                                initialValues={initialValues}
                                initialPreview={imgUrl}
                                onCancle={handleCancle}
                                onSubmit={handleSubmit}
                                onSubmitSuccess={handleSubmitSuccess}
                            />
                        </li>
                    );
                }

                return (
                    <li key={item.id}>
                        <ReviewListItem
                            item={item}
                            onDelete={onDelete}
                            onEdit={setEditingId}
                        />
                    </li>
                );
            })}
        </ul>
    );
};

export default ReviewList;

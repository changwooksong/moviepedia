import { useState } from "react";
import useAsynce from "../hooks/useAsync";
import useTranslate from "../hooks/useTranslate";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import "./ReviewForm.css";

const INITIAL_VALUES = {
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
};

function ReviewForm({
    initialValues = INITIAL_VALUES,
    initialPreview,
    onSubmitSuccess,
    onSubmit,
    onCancle,
}) {
    const t = useTranslate();
    const [values, setValues] = useState(initialValues);
    const [isSubmitting, submittingError, onSubmitAsync] = useAsynce(onSubmit);
    // const [isSubmitting, setIsSubmitting] = useState(false);
    // const [submittingError, setSubmittingError] = useState(null);

    const handleChange = (name, value) => {
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        handleChange(name, value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("rating", values.rating);
        formData.append("content", values.content);
        formData.append("imgFile", values.imgFile);

        let result = await onSubmitAsync(formData);
        if (!result) return;

        // try {
        //     setSubmittingError(null);
        //     setIsSubmitting(true);
        //     result = await onSubmit(formData);
        // } catch (error) {
        //     setSubmittingError(error);
        //     return;
        // } finally {
        //     setIsSubmitting(false);
        // }
        const { review } = result;
        onSubmitSuccess(review);
        setValues(INITIAL_VALUES);
    };

    return (
        <form className="ReviewForm" onSubmit={handleSubmit}>
            <FileInput
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            />
            <input
                name="title"
                value={values.title}
                onChange={handleInputChange}
            />
            <RatingInput
                name="rating"
                value={values.rating}
                onChange={handleChange}
            />
            <textarea
                name="content"
                value={values.content}
                onChange={handleInputChange}
            />
            <button type="submit" disabled={isSubmitting}>
                {t("confirm button")}
            </button>
            {onCancle && (
                <button onClick={onCancle}>{t("cancle button")}</button>
            )}
            {submittingError?.message && <div>{submittingError.messge}</div>}
        </form>
    );
}

export default ReviewForm;

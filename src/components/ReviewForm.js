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
    className = "",

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
        <form className={`ReviewForm ${className}`} onSubmit={handleSubmit}>
            <FileInput
                className="ReviewForm-preview"
                name="imgFile"
                value={values.imgFile}
                initialPreview={initialPreview}
                onChange={handleChange}
            />
            <div className="ReviewForm-rows">
                <div className="ReviewForm-title-rating">
                    <input
                        className="ReviewForm-title"
                        name="title"
                        value={values.title}
                        placeholder={t("title placeholder")}
                        onChange={handleInputChange}
                    />
                    <RatingInput
                        className="ReviewForm-rating"
                        name="rating"
                        value={values.rating}
                        onChange={handleChange}
                    />
                </div>
                <textarea
                    className="ReviewForm-content"
                    name="content"
                    value={values.content}
                    placeholder={t("content placeholder")}
                    onChange={handleInputChange}
                />
                <div className="ReviewForm-error-buttons">
                    <div className="ReviewForm-error">
                        {submittingError && (
                            <div>{submittingError.message}</div>
                        )}
                    </div>
                    <div className="ReviewForm-buttons">
                        {onCancle && (
                            <button
                                className="ReviewForm-cancel-button"
                                onClick={onCancle}
                            >
                                {t("cancel button")}
                            </button>
                        )}
                        <button
                            className="ReviewForm-submit-button"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {t("confirm button")}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default ReviewForm;

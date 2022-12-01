import { useEffect, useRef, useState } from "react";

const FileInput = ({ name, value, onChange, initialPreview }) => {
    const [preview, setPreview] = useState(initialPreview);
    const inputRef = useRef();
    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue);
    };

    const handleClearClick = () => {
        const inputNode = inputRef.current;
        if (!inputNode) return;

        inputNode.value = "";
        onChange(name, null);
    };

    useEffect(() => {
        if (!value) return;
        const nextPreivew = URL.createObjectURL(value);
        setPreview(nextPreivew);

        return () => {
            setPreview(initialPreview);
            URL.revokeObjectURL(nextPreivew);
        };
    }, [value, initialPreview]);

    return (
        <div>
            <img src={preview} alt="이미지 미리보기" />
            <input
                accept="image/png, image/jpeg"
                onChange={handleChange}
                ref={inputRef}
                type="file"
            />
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
};

export default FileInput;

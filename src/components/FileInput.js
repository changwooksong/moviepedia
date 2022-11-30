import { useRef } from "react";

const FileInput = ({ name, value, onChange }) => {
    const inputRef = useRef();
    const handleChange = (e) => {
        const nextValue = e.target.files[0];
        onChange(name, nextValue);
    };

    return <input onChange={handleChange} ref={inputRef} type="file" />;
};

export default FileInput;

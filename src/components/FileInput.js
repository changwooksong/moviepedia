import { useRef } from "react";

const FileInput = ({ name, value, onChange }) => {
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

    return (
        <div>
            <input onChange={handleChange} ref={inputRef} type="file" />
            {value && <button onClick={handleClearClick}>X</button>}
        </div>
    );
};

export default FileInput;

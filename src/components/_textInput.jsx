function TextInput({ label, value, onChange, placeholder, className }) {
    return (
        <div>
            {label && <label className="block mb-2 font-Amatic text-xl text-white">{label}</label>}
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`py-2 px-4 rounded-md border-4 ${className}`}
            />
        </div>
    );
}

export default TextInput;

interface InputProps {
    placeholder: string
    type: string
    value: string
    change?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputComponent = ({ placeholder, type, value, change }: InputProps) => {
    return (
        <>
            <input
                className="block w-full rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-primary-a6 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark focus:outline-none sm:text-sm sm:leading-6"
                placeholder={placeholder}
                type={type}
                defaultValue={value}
                onChange={change}
            />
        </>
    )
}

export default InputComponent

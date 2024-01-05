interface IOption {
    name: string
    value: number
}

interface SelectProps {
    optionList: Array<IOption>
    change?: (event: React.ChangeEvent<HTMLElement>) => void
}

const SelectComponent = ({ optionList, change }: SelectProps) => {
    return (
        <>
            <div>
                <select onChange={change} id="sex" name="sex">
                    {optionList.map((option: IOption, index: number) => (
                        <option key={index} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default SelectComponent

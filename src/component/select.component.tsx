interface IOption {
    name: string
    value: number
}

interface SelectProps {
    optionList: Array<IOption>
    selectedValue?: number
    change?: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectComponent = ({ optionList, selectedValue, change }: SelectProps) => {
    return (
        <>
            <div>
                <select onChange={change} id="sex" name="sex" value={selectedValue}>
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

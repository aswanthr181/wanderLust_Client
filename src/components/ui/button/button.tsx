interface buttonType {
    classN: string
    title: string
    action: () => void
}

const ButtonCmp = ({ title, classN, action }: buttonType) => {
    return (
        <button onClick={() => action()} className={classN}>
            <span>{title}</span>
        </button>
    )
}

export default ButtonCmp
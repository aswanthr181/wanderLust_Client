

const Table = (props: any) => {

    const { strut, data } = props

    return <table className="table">

        <tr>

            {strut.map((node: any) => {

                return <th className="p-4 border  capitalize">

                    {node.displayName ?? node.fieldName}

                </th>

            })}

        </tr>

        {data.map((node: any) => {

            return <tr>

                {strut.map((str: any) => {

                    return <td title={node[str.fieldName]} className="p-4 border">

                        {node[str.fieldName]}

                    </td>

                })}

            </tr>

        })}

    </table>

}

export default function Form() {

    const data = [
        { firstName: "Rahul", lastName: "S", age: 34 },
        { firstName: "Suresh", lastName: "John", age: 24 },
        { firstName: "Santhosh", lastName: "George", age: 30 }
    ]
    const tableStrData = [
        { fieldName: 'firstName', displayName: 'FIRST Name' },
        { fieldName: 'lastName', displayName: 'Last Name' },
        { fieldName: 'age' }
    ]


    
    const otherData = [
        { name: 'arun', gender: 'Male', physics: 88, maths: 87, english: 78 },
        { name: 'rajesh', gender: 'Male', physics: 96, maths: 100, english: 95 },
        { name: 'moorthy', gender: 'Male', physics: 89, maths: 90, english: 70 }
    ]
    const tableStrOtherData = [
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'name' },
        { fieldName: 'gender' },
        { fieldName: 'physics' },
        { fieldName: 'maths' },
        { fieldName: 'english' }
    ]

    return (

        <div>

            <div className="p-4">

                <Table strut={tableStrData} data={data} />

            </div>

            <div className="p-4">

                <Table strut={tableStrOtherData} data={otherData} />

            </div>

        </div>

    )

}
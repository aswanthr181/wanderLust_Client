interface memberType {
    email: string,
    _id: string
    member: {
        email: string,
        picture: string
        name: string
        _id: string
    }
}

const Member = ({ members }:any) => {
    console.log(members, 'aa');

    return (
        <>



            <div className="p-4  bg-white rounded-lg border shadow-md sm:p-8 ">
                <div className="flex justify-between items-center mb-4">
                    <input type="text" className="bg-red-50" />
                    {/* <h3 className="text-xl font-bold leading-none text-gray-900 ">Latest Customers</h3> */}
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 ">
                        {members.length > 0 ? members.map((member:memberType) => {
                            return (
                                <li className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <img className="w-8 h-8 rounded-full" src={`${member.member.picture?member.member.picture:'https://flowbite.com/docs/images/people/profile-picture-1.jpg'} `} alt="Neil image" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate ">
                                                {member.member.name}
                                            </p>
                                            <p className="text-sm text-gray-500 truncate ">
                                                {member.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex items-center text-base font-semibold text-gray-900 ">
                                            view
                                        </div>
                                    </div>
                                </li>
                            )
                        })

                            : <div>No members </div>}
                    </ul>
                </div>
            </div>


        </>
    )

}
export default Member
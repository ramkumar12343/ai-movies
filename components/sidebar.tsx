"use client";


const Sidebar: React.FC = () => {
    

    return (
        <aside className='fixed left-0 top-0 bg-gray-950 lg:w-[16%] h-screen hidden md:block'>
            <div>
                <h3>sEARCH</h3>
            </div>
            <ul className="ul">
                <li>ChatHistory</li>
                <li>ChatHistory</li>
                <li>ChatHistory</li>
                <li>ChatHistory</li>
                <li>ChatHistory</li>
            </ul>
        </aside>
    )

}

export default Sidebar;
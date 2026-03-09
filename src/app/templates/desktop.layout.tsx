import { LuLogOut } from "react-icons/lu"
import { NavLink, Outlet } from "react-router-dom"
import { useAuthContext } from "../shared/contexts/auth.context"
import { FaUser } from "react-icons/fa"

type MenuItem = {
    path: string
    icon: React.ReactNode
}

type Props = {
    menus: MenuItem[]
}

export const DesktopLayout = ({ menus }: Props) => {
    const { user } = useAuthContext();

    return (
        <div className="flex min-h-screen bg-white text-blue-950">
            <aside className="w-40 bg-gradient-to-t from-blue-700 to-blue-950 text-white flex flex-col items-center justify-between shadow-lg py-4">
                <div className="py-6 gap-6 flex flex-col">
                    {menus.map((menu) => (
                        <NavLink
                            key={menu.path}
                            to={menu.path}
                            className={({ isActive }) =>
                                `p-4 rounded-xl transition-all duration-200
                                ${isActive
                                    ? "bg-white text-gray-950"
                                    : "hover:bg-blue-700"}`
                            }
                        >
                            <span className="text-3xl">{menu.icon}</span>
                        </NavLink>
                    ))}
                </div>
                <NavLink to={"/login"} className={`p-4 rounded-xl transition-all duration-200 hover:bg-blue-700`}>
                    <span className="text-3xl"><LuLogOut /></span>
                </NavLink>
            </aside>

            <div className="flex-1 flex flex-col text-xl p-4">
                <header className="h-16 flex justify-between items-center px-6">
                    <h1 className="font-semibold">
                        ICare Pet Software
                    </h1>
                    <div className="flex gap-2 items-center">
                        <FaUser />
                        <p>{user?.nome}</p>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6">
                    <Outlet />
                </main>

            </div>
        </div>
    )
}
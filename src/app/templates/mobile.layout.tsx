import { NavLink, Outlet } from "react-router-dom"

type MenuItem = {
  path: string
  icon: React.ReactNode
}

type Props = {
  menus: MenuItem[]
}

export const MobileLayout = ({ menus }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-blue-950">
      <header className="h-16 bg-blue-950 text-white flex items-center justify-center shadow-md">
        <h1 className="font-semibold text-lg">
          ICare
        </h1>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </main>

      <nav className="h-16 bg-white shadow-inner border-t flex justify-around items-center z-10">
        {menus.slice(0, 5).map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `text-xl p-2 rounded-lg transition
              ${isActive
                ? "text-blue-950"
                : "text-gray-400"}`
            }
          >
            {menu.icon}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
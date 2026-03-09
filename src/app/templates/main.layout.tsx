import { useMediaQuery } from "react-responsive"
import { BsFileEarmarkBarGraphFill, BsPeopleFill } from "react-icons/bs"
import { FaHome } from "react-icons/fa"
import { IoStatsChart } from "react-icons/io5"
import { MdMedicalServices, MdOutlinePets, MdOutlineVaccines } from "react-icons/md"
import { DesktopLayout } from "./desktop.layout"
import { MobileLayout } from "./mobile.layout"

export const MainLayout = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" })

  const menus = [
    { path: "/", icon: <FaHome /> },
    { path: "/dashboard", icon: <IoStatsChart /> },
    { path: "/clientes", icon: <BsPeopleFill /> },
    { path: "/pets", icon: <MdOutlinePets /> },
    { path: "/consultas", icon: <MdMedicalServices /> },
    { path: "/vacinas", icon: <MdOutlineVaccines /> },
    { path: "/historico-medico", icon: <BsFileEarmarkBarGraphFill /> },
  ]

  return isDesktop
    ? <DesktopLayout menus={menus} />
    : <MobileLayout menus={menus} />
}
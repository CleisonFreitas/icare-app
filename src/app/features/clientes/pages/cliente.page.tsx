import { ClientePesquisaPage } from "./parts/cliente-pesquisa.page";
import { ClienteFormPage } from "./parts/cliente-form.page"
import { ClientePageProvider, useClientePage } from "../contexts/cliente-page.context";

const Inner = () => {
  const { showForm } = useClientePage();
  return showForm ? <ClienteFormPage /> : <ClientePesquisaPage />
}

const ClientePage = () => {
  return (
    <ClientePageProvider>
      <section className="flex flex-col items-center gap-[20px]">
        <span className="flex w-full border-b-2 border-gray-400 p-2">
          <h1 
            className="text-gray-500 text-[30px] text-start w-full">
              Clientes
            </h1>
        </span>
        <Inner />
      </section>
    </ClientePageProvider>
  )
}

export default ClientePage;
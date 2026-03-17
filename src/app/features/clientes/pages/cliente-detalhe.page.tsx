import { useParams } from "react-router-dom";
import { DetalhesCliente } from "../components/detalhes-cliente"
import { useCliente } from "../hooks/cliente.hook";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { LoadingOverlay } from "@/app/shared/components/screen.loading";

const ClienteDetalhePage = () => {
    const params = useParams();
    const { getById } = useCliente();

    const { data: cliente, isLoading } = getById(params.id);

    const tabsContent = [
        { value: "detalhes", label: "Detalhes", content: <DetalhesCliente cliente={cliente} /> },
        { value: "pets", label: "Pets", content: <p>Em breve</p> },
        { value: "historico", label: "Histórico", content: <p>Em breve</p> },
        { value: "vacinas", label: "Vacinas", content: <p>Em breve</p> },
        { value: "servicos", label: "Serviços", content: <p>Em breve</p> },
    ];

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <span className="flex w-full border-b-2 border-orange-500 py-2 justify-start">
                <h1
                    className="text-orange-500 md:text-[30px] text-sm text-nowrap text-start w-full font-bold">
                    {`#${cliente?.id} - ${cliente?.nome}`}
                </h1>
            </span>
            <Tabs defaultValue="detalhes" className="w-full">
                <TabsList className="bg-transparent border-gray-300 justify-start gap-4 mb-[20px]">
                    <TabsTrigger value="detalhes">Detalhes</TabsTrigger>
                    <TabsTrigger value="pets">Pets</TabsTrigger>
                    <TabsTrigger value="historico">Histórico</TabsTrigger>
                    <TabsTrigger value="vacinas">Vacinas</TabsTrigger>
                    <TabsTrigger value="Serviços">Serviços</TabsTrigger>
                </TabsList>
                {tabsContent.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {isLoading ? <LoadingOverlay /> : tab.content}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default ClienteDetalhePage;